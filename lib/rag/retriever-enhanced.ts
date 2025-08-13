import prisma from '@/lib/prisma';
import { getEmbeddings } from './ollama-client';

export type RetrieveParams = {
  query: string;
  topK?: number;
  filter?: {
    source?: string | string[];
    profile?: string;
    os?: string;
    priceMax?: number;
    priceMin?: number;
    minPerformance?: number;
  };
  useHybrid?: boolean; // Combine vector and full-text search
  rerank?: boolean; // Apply reranking based on metadata
};

export type RetrievedChunk = {
  chunkId: string;
  documentId: string;
  source: string;
  sourceId: string;
  title: string | null;
  content: string;
  score: number;
  metadata?: any;
};

// Enhanced retrieval with hybrid search
export async function retrieveChunks({
  query,
  topK = 10,
  filter,
  useHybrid = true,
  rerank = true,
}: RetrieveParams): Promise<RetrievedChunk[]> {
  // Generate embedding for the query
  const [queryEmbedding] = await getEmbeddings([query]);
  const embeddingArray = `[${queryEmbedding.join(',')}]`;

  // Build filter conditions
  const filterConditions: string[] = [];
  const filterParams: any[] = [];
  let paramIndex = 1;

  if (filter?.source) {
    if (Array.isArray(filter.source)) {
      filterConditions.push(`d.source = ANY($${paramIndex}::text[])`);
      filterParams.push(filter.source);
    } else {
      filterConditions.push(`d.source = $${paramIndex}`);
      filterParams.push(filter.source);
    }
    paramIndex++;
  }

  if (filter?.profile) {
    filterConditions.push(`d.metadata->>'profiles' ILIKE $${paramIndex}`);
    filterParams.push(`%${filter.profile}%`);
    paramIndex++;
  }

  if (filter?.os) {
    filterConditions.push(`d.metadata->>'os' ILIKE $${paramIndex}`);
    filterParams.push(`%${filter.os}%`);
    paramIndex++;
  }

  if (filter?.priceMax !== undefined) {
    filterConditions.push(`(d.metadata->>'price')::numeric <= $${paramIndex}`);
    filterParams.push(filter.priceMax);
    paramIndex++;
  }

  if (filter?.priceMin !== undefined) {
    filterConditions.push(`(d.metadata->>'price')::numeric >= $${paramIndex}`);
    filterParams.push(filter.priceMin);
    paramIndex++;
  }

  if (filter?.minPerformance !== undefined) {
    filterConditions.push(`(d.metadata->>'performanceScore')::numeric >= $${paramIndex}`);
    filterParams.push(filter.minPerformance);
    paramIndex++;
  }

  const whereClause = filterConditions.length > 0 
    ? `WHERE ${filterConditions.join(' AND ')}` 
    : '';

  let results: any[] = [];

  if (useHybrid) {
    // Hybrid search: combine vector similarity and full-text search
    const hybridQuery = `
      WITH vector_search AS (
        SELECT 
          c.id AS chunk_id,
          c.document_id,
          d.source,
          d.source_id,
          d.title,
          d.metadata,
          c.content,
          1 - (e.embedding <=> $${paramIndex}::vector) AS vector_score
        FROM rag_embeddings e
        JOIN rag_chunks c ON c.id = e.chunk_id
        JOIN rag_documents d ON d.id = c.document_id
        ${whereClause}
        ORDER BY e.embedding <=> $${paramIndex}::vector
        LIMIT ${topK * 2}
      ),
      text_search AS (
        SELECT 
          c.id AS chunk_id,
          c.document_id,
          d.source,
          d.source_id,
          d.title,
          d.metadata,
          c.content,
          ts_rank(c.content_tsv, plainto_tsquery('english', $${paramIndex + 1})) AS text_score
        FROM rag_chunks c
        JOIN rag_documents d ON d.id = c.document_id
        ${whereClause}
        WHERE c.content_tsv @@ plainto_tsquery('english', $${paramIndex + 1})
        ORDER BY text_score DESC
        LIMIT ${topK * 2}
      ),
      combined AS (
        SELECT DISTINCT ON (chunk_id)
          chunk_id,
          document_id,
          source,
          source_id,
          title,
          metadata,
          content,
          COALESCE(vector_score, 0) * 0.7 + COALESCE(text_score, 0) * 0.3 AS combined_score
        FROM (
          SELECT * FROM vector_search
          UNION ALL
          SELECT * FROM text_search
        ) AS all_results
      )
      SELECT *
      FROM combined
      ORDER BY combined_score DESC
      LIMIT ${topK}
    `;

    results = await prisma.$queryRawUnsafe(
      hybridQuery,
      ...filterParams,
      embeddingArray,
      query
    );
  } else {
    // Vector-only search
    const vectorQuery = `
      SELECT 
        c.id AS chunk_id,
        c.document_id,
        d.source,
        d.source_id,
        d.title,
        d.metadata,
        c.content,
        1 - (e.embedding <=> $${paramIndex}::vector) AS score
      FROM rag_embeddings e
      JOIN rag_chunks c ON c.id = e.chunk_id
      JOIN rag_documents d ON d.id = c.document_id
      ${whereClause}
      ORDER BY e.embedding <=> $${paramIndex}::vector
      LIMIT ${topK}
    `;

    results = await prisma.$queryRawUnsafe(
      vectorQuery,
      ...filterParams,
      embeddingArray
    );
  }

  // Map results
  let chunks: RetrievedChunk[] = results.map((r) => ({
    chunkId: r.chunk_id,
    documentId: r.document_id,
    source: r.source,
    sourceId: r.source_id,
    title: r.title,
    content: r.content,
    score: Number(r.combined_score || r.score || r.vector_score || 0),
    metadata: r.metadata,
  }));

  // Apply reranking if requested
  if (rerank) {
    chunks = rerankResults(chunks, query, filter);
  }

  return chunks;
}

// Rerank results based on additional criteria
function rerankResults(
  chunks: RetrievedChunk[],
  query: string,
  filter?: RetrieveParams['filter']
): RetrievedChunk[] {
  const queryLower = query.toLowerCase();
  
  return chunks
    .map((chunk) => {
      let boost = 1.0;

      // Boost if title matches query
      if (chunk.title && chunk.title.toLowerCase().includes(queryLower)) {
        boost *= 1.3;
      }

      // Boost based on source relevance
      if (query.includes('laptop') && chunk.source === 'laptop') {
        boost *= 1.2;
      } else if (query.includes('package') && chunk.source === 'package_template') {
        boost *= 1.2;
      } else if (query.includes('tool') && (chunk.source === 'tool' || chunk.source === 'toolkit')) {
        boost *= 1.2;
      }

      // Boost if content has exact match
      if (chunk.content.toLowerCase().includes(queryLower)) {
        boost *= 1.1;
      }

      // Apply metadata-based boosts
      if (chunk.metadata) {
        // Boost popular tools
        if (chunk.metadata.popularity && chunk.metadata.popularity > 7) {
          boost *= 1.1;
        }

        // Boost high-performance laptops for developer queries
        if (query.includes('developer') && chunk.metadata.performanceScore > 8) {
          boost *= 1.15;
        }

        // Boost long battery life for consultant queries
        if (query.includes('consultant') && chunk.metadata.batteryLife > 10) {
          boost *= 1.15;
        }
      }

      return {
        ...chunk,
        score: chunk.score * boost,
      };
    })
    .sort((a, b) => b.score - a.score);
}

// Specialized retrieval for different use cases
export async function retrieveForRecommendation(
  userProfile: 'developer' | 'consultant',
  budget?: number,
  os?: string
): Promise<RetrievedChunk[]> {
  const query = `${userProfile} laptop recommendation ${os || ''} ${
    budget ? `under ${budget} euros` : ''
  }`.trim();

  return retrieveChunks({
    query,
    topK: 15,
    filter: {
      source: ['laptop', 'package_template'],
      profile: userProfile,
      os,
      priceMax: budget,
    },
    useHybrid: true,
    rerank: true,
  });
}

export async function retrieveAccessoriesForLaptop(
  laptopId: string
): Promise<RetrievedChunk[]> {
  // First get the laptop details
  const laptop = await prisma.laptop.findUnique({
    where: { id: laptopId },
    include: { supportedProfiles: true },
  });

  if (!laptop) return [];

  const profile = laptop.supportedProfiles[0]?.profile || 'general';
  const query = `accessories for ${profile} ${laptop.brand} ${laptop.model}`;

  return retrieveChunks({
    query,
    topK: 10,
    filter: {
      source: ['accessory', 'package_template'],
    },
    useHybrid: true,
    rerank: true,
  });
}

export async function retrieveToolsForProfile(
  profile: string,
  os: string
): Promise<RetrievedChunk[]> {
  const query = `software tools toolkit for ${profile} on ${os}`;

  return retrieveChunks({
    query,
    topK: 20,
    filter: {
      source: ['tool', 'toolkit'],
      os,
    },
    useHybrid: true,
    rerank: true,
  });
}

// Get similar items based on an existing item
export async function retrieveSimilar(
  sourceType: string,
  sourceId: string,
  topK = 5
): Promise<RetrievedChunk[]> {
  // Get the original document's content
  const original = await prisma.$queryRawUnsafe<any[]>(`
    SELECT c.content
    FROM rag_chunks c
    JOIN rag_documents d ON d.id = c.document_id
    WHERE d.source = $1 AND d.source_id = $2
    LIMIT 1
  `, sourceType, sourceId);

  if (!original || original.length === 0) return [];

  return retrieveChunks({
    query: original[0].content,
    topK,
    filter: {
      source: sourceType,
    },
    useHybrid: false, // Use vector-only for similarity
    rerank: false,
  });
}

import prisma from '@/lib/prisma';

export type RetrieveParams = {
  queryEmbedding: number[];
  topK?: number;
  filter?: { source?: string; profile?: string; os?: string };
};

export type RetrievedChunk = {
  chunkId: string;
  documentId: string;
  source: string;
  sourceId: string;
  title: string | null;
  content: string;
  score: number;
};

export async function retrieveChunks({ queryEmbedding, topK = 8, filter }: RetrieveParams): Promise<RetrievedChunk[]> {
  const embeddingArray = `[${queryEmbedding.join(',')}]`;
  // Basic vector similarity search with optional source filter
  const rows = await prisma.$queryRawUnsafe<any[]>(
    `
      SELECT c.id AS chunk_id,
             c.document_id,
             d.source,
             d.source_id,
             d.title,
             c.content,
             1 - (e.embedding <=> $2::vector) AS score
        FROM rag_embeddings e
        JOIN rag_chunks c ON c.id = e.chunk_id
        JOIN rag_documents d ON d.id = c.document_id
       WHERE ($1::text IS NULL OR d.source = $1)
       ORDER BY e.embedding <=> $2::vector
       LIMIT ${topK}
    `,
    filter?.source ?? null,
    embeddingArray
  );

  return rows.map((r) => ({
    chunkId: r.chunk_id,
    documentId: r.document_id,
    source: r.source,
    sourceId: r.source_id,
    title: r.title,
    content: r.content,
    score: Number(r.score),
  }));
}





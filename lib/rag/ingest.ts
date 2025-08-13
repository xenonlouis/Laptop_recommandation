import prisma from '@/lib/prisma';
import { ensurePgvectorAndRagSchemaSQL } from './sql';
import { RagDocument, RagChunk, RagSource, splitIntoChunks } from './chunk';
import { embedTexts } from './embeddings';
import { randomUUID } from 'crypto';

async function ensureSchema() {
  // Split the SQL into individual statements and execute them one by one
  const sqlStatements = [
    `CREATE EXTENSION IF NOT EXISTS vector;`,
    
    `CREATE TABLE IF NOT EXISTS rag_documents (
      id text PRIMARY KEY,
      source text NOT NULL,
      source_id text NOT NULL,
      title text,
      metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
      updated_at timestamptz NOT NULL DEFAULT now()
    );`,
    
    `CREATE TABLE IF NOT EXISTS rag_chunks (
      id text PRIMARY KEY,
      document_id text NOT NULL REFERENCES rag_documents(id) ON DELETE CASCADE,
      chunk_index int NOT NULL,
      content text NOT NULL,
      token_count int NOT NULL,
      content_tsv tsvector GENERATED ALWAYS AS (to_tsvector('english', coalesce(content, ''))) STORED
    );`,
    
    `CREATE INDEX IF NOT EXISTS rag_chunks_tsv_idx ON rag_chunks USING gin (content_tsv);`,
    
    `CREATE TABLE IF NOT EXISTS rag_embeddings (
      chunk_id text PRIMARY KEY REFERENCES rag_chunks(id) ON DELETE CASCADE,
      embedding vector(768) NOT NULL
    );`
  ];
  
  // Execute each statement individually
  for (const sql of sqlStatements) {
    try {
      await prisma.$executeRawUnsafe(sql);
    } catch (error) {
      // Log but continue - some errors like "extension already exists" are expected
      console.log(`Info: ${error instanceof Error ? error.message : error}`);
    }
  }
  
  // Create vector index separately (more complex syntax)
  try {
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_indexes
          WHERE schemaname = 'public' AND indexname = 'rag_embeddings_embedding_ivfflat_idx'
        ) THEN
          CREATE INDEX rag_embeddings_embedding_ivfflat_idx ON rag_embeddings USING ivfflat (embedding vector_cosine_ops);
        END IF;
      END $$;
    `);
  } catch (error) {
    console.log(`Info: Vector index creation: ${error instanceof Error ? error.message : error}`);
  }
}

function toDocId(source: RagSource, sourceId: string) {
  return `${source}:${sourceId}`;
}

export async function ingestLaptops() {
  await ensureSchema();
  const laptops = await prisma.laptop.findMany({
    include: { supportedProfiles: true, supportedOS: true },
  });

  for (const l of laptops) {
    const title = `${l.brand} ${l.model}`;
    const content = [
      `Brand: ${l.brand}`,
      `Model: ${l.model}`,
      `CPU: ${l.processor}`,
      `RAM: ${l.ram}`,
      `Storage: ${l.storage}`,
      `Battery life: ${l.batteryLife}`,
      `Performance score: ${l.performanceScore}`,
      l.notes ? `Notes: ${l.notes}` : '',
      `Profiles: ${l.supportedProfiles.map((p) => p.profile).join(', ')}`,
      `OS: ${l.supportedOS.map((o) => o.os).join(', ')}`,
    ]
      .filter(Boolean)
      .join('. ');

    const doc: RagDocument = {
      id: toDocId('laptop', l.id),
      source: 'laptop',
      sourceId: l.id,
      title,
      metadata: {
        priceType: l.priceType,
        profiles: l.supportedProfiles.map((p) => p.profile),
        os: l.supportedOS.map((o) => o.os),
      },
      updatedAt: l.updatedAt,
    };

    const chunks = splitIntoChunks(content, 300);
    const embeddings = await embedTexts(chunks);

    await prisma.$transaction(async (tx) => {
      // Upsert document
      await tx.$executeRawUnsafe(
        `INSERT INTO rag_documents (id, source, source_id, title, metadata, updated_at)
         VALUES ($1, $2, $3, $4, $5::jsonb, $6)
         ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, metadata = EXCLUDED.metadata, updated_at = EXCLUDED.updated_at`,
        doc.id,
        doc.source,
        doc.sourceId,
        doc.title ?? null,
        JSON.stringify(doc.metadata),
        doc.updatedAt ?? new Date()
      );

      // Delete old chunks/embeddings
      await tx.$executeRawUnsafe(`DELETE FROM rag_embeddings WHERE chunk_id IN (SELECT id FROM rag_chunks WHERE document_id = $1)`, doc.id);
      await tx.$executeRawUnsafe(`DELETE FROM rag_chunks WHERE document_id = $1`, doc.id);

      // Insert new chunks + embeddings
      for (let i = 0; i < chunks.length; i++) {
        const chunkId = randomUUID();
        const content = chunks[i];
        const tokenCount = Math.ceil(content.length / 4);
        const embedding = embeddings[i];

        await tx.$executeRawUnsafe(
          `INSERT INTO rag_chunks (id, document_id, chunk_index, content, token_count)
           VALUES ($1, $2, $3, $4, $5)`,
          chunkId,
          doc.id,
          i,
          content,
          tokenCount
        );

        // pgvector expects array literal; Prisma $queryRaw can pass Float8Array, but we use explicit cast JSON to vector
        const embeddingArray = `[` + embedding.join(',') + `]`;
        await tx.$executeRawUnsafe(
          `INSERT INTO rag_embeddings (chunk_id, embedding) VALUES ($1, $2)`,
          chunkId,
          embeddingArray as unknown as any
        );
      }
    });
  }
}

export async function ingestAll() {
  await ingestLaptops();
  // TODO: add packages, accessories, toolkits, tools, notion
}





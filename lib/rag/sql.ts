export const ensurePgvectorAndRagSchemaSQL = `
-- Enable required extensions (idempotent)
CREATE EXTENSION IF NOT EXISTS vector;

-- Documents table
CREATE TABLE IF NOT EXISTS rag_documents (
  id text PRIMARY KEY,
  source text NOT NULL,        -- 'laptop' | 'package_template' | 'accessory' | 'tool' | 'toolkit' | 'notion'
  source_id text NOT NULL,
  title text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Chunks table with generated tsvector for hybrid search
CREATE TABLE IF NOT EXISTS rag_chunks (
  id text PRIMARY KEY,
  document_id text NOT NULL REFERENCES rag_documents(id) ON DELETE CASCADE,
  chunk_index int NOT NULL,
  content text NOT NULL,
  token_count int NOT NULL,
  content_tsv tsvector GENERATED ALWAYS AS (to_tsvector('english', coalesce(content, ''))) STORED
);

CREATE INDEX IF NOT EXISTS rag_chunks_tsv_idx ON rag_chunks USING gin (content_tsv);

-- Embeddings table; using 768-dim vectors (compatible with nomic-embed-text)
CREATE TABLE IF NOT EXISTS rag_embeddings (
  chunk_id text PRIMARY KEY REFERENCES rag_chunks(id) ON DELETE CASCADE,
  embedding vector(768) NOT NULL
);

-- Vector index (requires ANALYZE for good performance, but optional here)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_indexes
    WHERE schemaname = 'public' AND indexname = 'rag_embeddings_embedding_ivfflat_idx'
  ) THEN
    EXECUTE 'CREATE INDEX rag_embeddings_embedding_ivfflat_idx ON rag_embeddings USING ivfflat (embedding vector_cosine_ops)';
  END IF;
END $$;
`;





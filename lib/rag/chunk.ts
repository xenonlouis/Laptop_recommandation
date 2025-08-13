export type RagSource =
  | 'laptop'
  | 'package_template'
  | 'accessory'
  | 'tool'
  | 'toolkit'
  | 'notion';

export type RagDocument = {
  id: string;
  source: RagSource;
  sourceId: string;
  title?: string;
  metadata: Record<string, unknown>;
  updatedAt?: Date;
};

export type RagChunk = {
  id: string;
  documentId: string;
  chunkIndex: number;
  content: string;
  tokenCount: number;
};

export function splitIntoChunks(text: string, targetTokens = 350): string[] {
  const sentences = text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);

  const chunks: string[] = [];
  let buffer: string[] = [];
  let tokenEstimate = 0;

  const estimateTokens = (s: string) => Math.ceil(s.length / 4);

  for (const sentence of sentences) {
    const sentTokens = estimateTokens(sentence);
    if (tokenEstimate + sentTokens > targetTokens && buffer.length > 0) {
      chunks.push(buffer.join(' '));
      buffer = [sentence];
      tokenEstimate = sentTokens;
    } else {
      buffer.push(sentence);
      tokenEstimate += sentTokens;
    }
  }
  if (buffer.length > 0) chunks.push(buffer.join(' '));
  return chunks;
}





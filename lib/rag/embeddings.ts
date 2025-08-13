import { Ollama } from 'ollama';

const ollama = new Ollama({ host: process.env.OLLAMA_BASE_URL || 'http://localhost:11434' });

export async function embedTexts(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  
  const embeddings: number[][] = [];
  const model = process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text';
  
  for (const text of texts) {
    try {
      const response = await ollama.embeddings({
        model,
        prompt: text,
      });
      embeddings.push(response.embedding);
    } catch (error) {
      console.error('Embedding failed for text:', text.substring(0, 100), error);
      // Return a zero vector as fallback
      embeddings.push(new Array(768).fill(0));
    }
  }
  
  return embeddings;
}





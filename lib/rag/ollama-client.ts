// Dedicated Ollama client with fallback support
import { Ollama } from 'ollama';

// Configuration for Ollama
const OLLAMA_CONFIG = {
  baseURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  embedModel: process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text',
  chatModel: process.env.OLLAMA_CHAT_MODEL || 'llama3.2',
};

// Direct Ollama API client for embeddings (fallback option)
export class OllamaDirectClient {
  private baseURL: string;

  constructor(baseURL: string = OLLAMA_CONFIG.baseURL) {
    this.baseURL = baseURL;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await fetch(`${this.baseURL}/api/embeddings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: OLLAMA_CONFIG.embedModel,
          prompt: text,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.embedding;
    } catch (error) {
      console.error('Direct Ollama embedding failed:', error);
      throw error;
    }
  }

  async generateEmbeddings(texts: string[]): Promise<number[][]> {
    // Process in batches to avoid overwhelming the server
    const batchSize = 10;
    const embeddings: number[][] = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      const batchEmbeddings = await Promise.all(
        batch.map(text => this.generateEmbedding(text))
      );
      embeddings.push(...batchEmbeddings);
    }

    return embeddings;
  }

  async chat(prompt: string, system?: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseURL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: OLLAMA_CONFIG.chatModel,
          prompt: system ? `${system}\n\n${prompt}` : prompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Direct Ollama chat failed:', error);
      throw error;
    }
  }
}

// Official Ollama client
const ollama = new Ollama({ host: OLLAMA_CONFIG.baseURL });

// Unified embedding function using official Ollama client
export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];

  try {
    // Use official ollama client
    const embeddings: number[][] = [];
    
    for (const text of texts) {
      try {
        const response = await ollama.embeddings({
          model: OLLAMA_CONFIG.embedModel,
          prompt: text,
        });
        embeddings.push(response.embedding);
      } catch (error) {
        console.error('Embedding failed for text:', text.substring(0, 100), error);
        // Fallback to direct API client
        const directClient = new OllamaDirectClient();
        const fallbackEmbedding = await directClient.generateEmbedding(text);
        embeddings.push(fallbackEmbedding);
      }
    }
    
    return embeddings;
  } catch (error) {
    console.warn('Official Ollama client failed, falling back to direct API:', error);
    // Fallback to direct API
    const directClient = new OllamaDirectClient();
    return await directClient.generateEmbeddings(texts);
  }
}

// Health check function
export async function checkOllamaConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${OLLAMA_CONFIG.baseURL}/api/tags`);
    return response.ok;
  } catch (error) {
    console.error('Ollama connection check failed:', error);
    return false;
  }
}

// Export configuration for other modules
export { OLLAMA_CONFIG };

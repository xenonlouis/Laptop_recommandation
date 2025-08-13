import { NextRequest, NextResponse } from 'next/server';
import { ingestAll } from '@/lib/rag/ingest-enhanced';
import { checkOllamaConnection } from '@/lib/rag/ollama-client';

export const runtime = 'nodejs';

export async function POST(_req: NextRequest) {
  try {
    // Check Ollama connection first
    const isConnected = await checkOllamaConnection();
    if (!isConnected) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'ollama_not_running',
          message: 'Ollama is not running. Please start Ollama first.',
          hint: 'Run: ollama serve' 
        },
        { status: 503 }
      );
    }

    // Run the enhanced ingestion
    await ingestAll();
    
    return NextResponse.json({ 
      ok: true,
      message: 'RAG data reindexed successfully with all entities' 
    });
  } catch (err) {
    console.error('[RAG_REINDEX_ERROR]', err);
    return NextResponse.json(
      { 
        ok: false, 
        error: 'reindex_failed',
        message: err instanceof Error ? err.message : 'Failed to reindex RAG data'
      }, 
      { status: 500 }
    );
  }
}

export async function GET(_req: NextRequest) {
  try {
    // Check Ollama status
    const isConnected = await checkOllamaConnection();
    
    return NextResponse.json({ 
      ok: true,
      ollama: {
        connected: isConnected,
        baseURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
        models: {
          embedding: process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text',
          chat: process.env.OLLAMA_CHAT_MODEL || 'llama3.2:3b-instruct'
        }
      },
      message: isConnected 
        ? 'Ollama is running and ready' 
        : 'Ollama is not running. Please start Ollama first.'
    });
  } catch (err) {
    console.error('[RAG_STATUS_ERROR]', err);
    return NextResponse.json(
      { 
        ok: false, 
        error: 'status_check_failed',
        message: 'Failed to check Ollama status'
      },
      { status: 500 }
    );
  }
}





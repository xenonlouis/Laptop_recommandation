#!/usr/bin/env tsx

import { config } from 'dotenv';
import { checkOllamaConnection } from '../lib/rag/ollama-client';
import { 
  ingestAll, 
  ingestLaptops, 
  ingestAccessories,
  ingestPackageTemplates,
  ingestTools,
  ingestToolkits,
  ingestSurveyResponses,
  ensureSchema
} from '../lib/rag/ingest-enhanced';
import prisma from '../lib/prisma';

// Load environment variables
config();

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'all';

  console.log('🔧 RAG Ingestion Tool');
  console.log('====================\n');

  // Check Ollama connection
  console.log('Checking Ollama connection...');
  const isConnected = await checkOllamaConnection();
  
  if (!isConnected) {
    console.error('❌ Ollama is not running!');
    console.log('\nPlease start Ollama with:');
    console.log('  ollama serve');
    console.log('\nThen ensure you have the required models:');
    console.log('  ollama pull nomic-embed-text');
    console.log('  ollama pull llama3.2:3b-instruct');
    process.exit(1);
  }
  
  console.log('✅ Ollama is connected\n');

  // Check database connection
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database is connected\n');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }

  try {
    switch (command) {
      case 'all':
        console.log('Running complete ingestion...\n');
        await ingestAll();
        break;
        
      case 'laptops':
        console.log('Ingesting laptops only...\n');
        await ensureSchema();
        await ingestLaptops();
        break;
        
      case 'accessories':
        console.log('Ingesting accessories only...\n');
        await ensureSchema();
        await ingestAccessories();
        break;
        
      case 'packages':
        console.log('Ingesting package templates only...\n');
        await ensureSchema();
        await ingestPackageTemplates();
        break;
        
      case 'tools':
        console.log('Ingesting tools only...\n');
        await ensureSchema();
        await ingestTools();
        break;
        
      case 'toolkits':
        console.log('Ingesting toolkits only...\n');
        await ensureSchema();
        await ingestToolkits();
        break;
        
      case 'surveys':
        console.log('Ingesting survey responses only...\n');
        await ensureSchema();
        await ingestSurveyResponses();
        break;
        
      case 'stats':
        console.log('Getting RAG statistics...\n');
        await getStats();
        break;
        
      case 'clean':
        console.log('Cleaning all RAG data...\n');
        await cleanRagData();
        break;
        
      default:
        console.log('Unknown command:', command);
        showHelp();
        process.exit(1);
    }
    
    console.log('\n✅ Operation completed successfully!');
  } catch (error) {
    console.error('\n❌ Operation failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function getStats() {
  const stats = await prisma.$queryRawUnsafe<any[]>(`
    SELECT 
      source,
      COUNT(DISTINCT d.id) as doc_count,
      COUNT(c.id) as chunk_count,
      AVG(c.token_count) as avg_tokens,
      SUM(c.token_count) as total_tokens
    FROM rag_documents d
    LEFT JOIN rag_chunks c ON c.document_id = d.id
    GROUP BY source
    ORDER BY source
  `);

  console.log('📊 RAG Database Statistics:');
  console.log('---------------------------');
  
  let totalDocs = 0;
  let totalChunks = 0;
  let totalTokens = 0;
  
  stats.forEach(stat => {
    console.log(`\n${stat.source}:`);
    console.log(`  Documents: ${stat.doc_count}`);
    console.log(`  Chunks: ${stat.chunk_count}`);
    console.log(`  Avg Tokens/Chunk: ${Math.round(Number(stat.avg_tokens) || 0)}`);
    console.log(`  Total Tokens: ${Math.round(Number(stat.total_tokens) || 0)}`);
    
    totalDocs += Number(stat.doc_count);
    totalChunks += Number(stat.chunk_count);
    totalTokens += Number(stat.total_tokens || 0);
  });
  
  console.log('\n---------------------------');
  console.log('Totals:');
  console.log(`  Documents: ${totalDocs}`);
  console.log(`  Chunks: ${totalChunks}`);
  console.log(`  Tokens: ${totalTokens}`);
  console.log(`  Estimated Storage: ${(totalTokens * 768 * 4 / 1024 / 1024).toFixed(2)} MB`);
}

async function cleanRagData() {
  const confirm = process.argv.includes('--confirm');
  
  if (!confirm) {
    console.log('⚠️  Warning: This will delete all RAG data!');
    console.log('Add --confirm to proceed');
    process.exit(1);
  }
  
  await prisma.$executeRawUnsafe('TRUNCATE TABLE rag_embeddings CASCADE');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE rag_chunks CASCADE');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE rag_documents CASCADE');
  
  console.log('✅ All RAG data has been deleted');
}

function showHelp() {
  console.log(`
Usage: tsx scripts/ingest-rag.ts [command]

Commands:
  all         - Ingest all data (default)
  laptops     - Ingest only laptops
  accessories - Ingest only accessories
  packages    - Ingest only package templates
  tools       - Ingest only tools
  toolkits    - Ingest only toolkits
  surveys     - Ingest only survey responses
  stats       - Show RAG database statistics
  clean       - Delete all RAG data (requires --confirm)

Examples:
  tsx scripts/ingest-rag.ts all
  tsx scripts/ingest-rag.ts stats
  tsx scripts/ingest-rag.ts clean --confirm
`);
}

// Run the script
main().catch(console.error);

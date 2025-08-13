#!/usr/bin/env tsx

import { config } from 'dotenv';
import prisma from '../lib/prisma';

// Load environment variables
config();

async function checkDatabase() {
  console.log('🗄️  Checking database connection...');
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database: Connected');
    
    // Check if RAG tables exist
    const ragTables = await prisma.$queryRawUnsafe<any[]>(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'rag_%'
    `);
    
    if (ragTables.length >= 3) {
      console.log('✅ RAG Tables: Present');
      
      // Check if data exists
      const docCount = await prisma.$queryRawUnsafe<any[]>(`
        SELECT COUNT(*) as count FROM rag_documents
      `);
      
      const count = Number(docCount[0]?.count || 0);
      if (count > 0) {
        console.log(`✅ RAG Data: ${count} documents found`);
      } else {
        console.log('⚠️  RAG Data: No documents found (run ingestion script)');
      }
    } else {
      console.log('⚠️  RAG Tables: Missing (will be created on first ingestion)');
    }
    
  } catch (error) {
    console.log('❌ Database: Connection failed');
    console.log('   Error:', error instanceof Error ? error.message : error);
    return false;
  }
  return true;
}

async function checkOllama() {
  console.log('\n🤖 Checking Ollama service...');
  try {
    const baseURL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const response = await fetch(`${baseURL}/api/tags`);
    
    if (response.ok) {
      console.log('✅ Ollama: Service running');
      
      const data = await response.json();
      const models = data.models || [];
      
      const embedModel = process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text';
      const chatModel = process.env.OLLAMA_CHAT_MODEL || 'llama3.2:3b-instruct';
      
      const hasEmbedModel = models.some((m: any) => m.name?.includes(embedModel));
      const hasChatModel = models.some((m: any) => m.name?.includes(chatModel.split(':')[0]));
      
      if (hasEmbedModel) {
        console.log(`✅ Embed Model: ${embedModel} installed`);
      } else {
        console.log(`❌ Embed Model: ${embedModel} not found`);
        console.log(`   Run: ollama pull ${embedModel}`);
      }
      
      if (hasChatModel) {
        console.log(`✅ Chat Model: ${chatModel} installed`);
      } else {
        console.log(`❌ Chat Model: ${chatModel} not found`);
        console.log(`   Run: ollama pull ${chatModel}`);
      }
      
      return hasEmbedModel && hasChatModel;
    } else {
      console.log('❌ Ollama: Service not responding');
      return false;
    }
  } catch (error) {
    console.log('❌ Ollama: Connection failed');
    console.log('   Make sure Ollama is running: ollama serve');
    return false;
  }
}

async function checkEnvironment() {
  console.log('\n🔧 Checking environment variables...');
  
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    console.log('✅ DATABASE_URL: Set');
  } else {
    console.log('❌ DATABASE_URL: Missing');
    console.log('   Add to .env.local file');
    return false;
  }
  
  const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
  console.log(`✅ OLLAMA_BASE_URL: ${ollamaUrl}`);
  
  return true;
}

async function checkGPU() {
  console.log('\n🎮 Checking GPU availability...');
  try {
    const baseURL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const response = await fetch(`${baseURL}/api/ps`);
    
    if (response.ok) {
      const data = await response.json();
      const runningModels = data.models || [];
      
      if (runningModels.length > 0) {
        console.log('✅ GPU: Models running (likely using GPU)');
        runningModels.forEach((model: any) => {
          console.log(`   - ${model.name}: ${(model.size_vram / 1024 / 1024 / 1024).toFixed(2)}GB VRAM`);
        });
      } else {
        console.log('ℹ️  GPU: No models currently loaded');
      }
    }
  } catch (error) {
    console.log('⚠️  GPU: Unable to check status');
  }
}

async function checkAssistantAPI() {
  console.log('\n🤖 Testing Assistant API...');
  try {
    const response = await fetch('http://localhost:3000/api/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: 'Hello, can you recommend a laptop for a developer?' }
        ]
      })
    });

    if (response.ok) {
      console.log('✅ Assistant API: Responding');
      
      // Check if we get streaming data
      const reader = response.body?.getReader();
      if (reader) {
        let receivedData = false;
        let chunks = 0;
        const timeout = setTimeout(() => {
          console.log('⚠️  Assistant API: Response timeout after 10s');
        }, 10000);

        try {
          for (let i = 0; i < 5; i++) { // Read first few chunks
            const { done, value } = await reader.read();
            if (done) break;
            receivedData = true;
            chunks++;
          }
          clearTimeout(timeout);
          
          if (receivedData) {
            console.log(`✅ Assistant API: Streaming works (${chunks} chunks received)`);
        
          } else {
            console.log('❌ Assistant API: No streaming data received');
          }
        } catch (error) {
          clearTimeout(timeout);
          console.log('❌ Assistant API: Streaming error:', error);
        } finally {
          reader.releaseLock();
        }
      }
      return true;
    } else {
      console.log(`❌ Assistant API: HTTP ${response.status} - ${response.statusText}`);
      const text = await response.text();
      console.log(`   Response: ${text.substring(0, 200)}...`);
      return false;
    }
  } catch (error) {
    console.log('❌ Assistant API: Connection failed');
    if (error instanceof Error) {
      console.log(`   Error: ${error.message}`);
      if (error.message.includes('ECONNREFUSED')) {
        console.log('   Hint: Make sure development server is running (pnpm dev)');
      }
    }
    return false;
  }
}

async function main() {
  console.log('🔍 Laptop Recommendation System - Health Check');
  console.log('==============================================\n');
  
  const checks = await Promise.all([
    checkEnvironment(),
    checkDatabase(),
    checkOllama()
  ]);
  
  await checkGPU();
  
  // Test Assistant API if basic checks pass
  let apiCheck = false;
  if (checks.every(Boolean)) {
    apiCheck = await checkAssistantAPI();
  }
  
  const allPassed = checks.every(Boolean) && apiCheck;
  
  console.log('\n' + '='.repeat(50));
  if (allPassed) {
    console.log('🎉 All checks passed! System is ready to go!');
    console.log('\nNext steps:');
    console.log('1. Visit: http://localhost:3000');
    console.log('2. Click "Ask AI" button');
    console.log('3. Test with: "Recommend a laptop for developers"');
  } else {
    console.log('⚠️  Some checks failed. Please fix the issues above.');
    if (!apiCheck && checks.every(Boolean)) {
      console.log('\nTo test API manually:');
      console.log('1. Start dev server: pnpm dev');
      console.log('2. Re-run health check: pnpm exec tsx scripts/health-check.ts');
    }
  }
  
  await prisma.$disconnect();
}

main().catch(console.error);

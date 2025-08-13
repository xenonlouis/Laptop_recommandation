#!/usr/bin/env tsx

import { spawn } from 'child_process';
import { config } from 'dotenv';

// Load environment variables
config();

function runCommand(command: string, args: string[] = []): Promise<boolean> {
  return new Promise((resolve) => {
    console.log(`\n🚀 Running: ${command} ${args.join(' ')}`);
    const process = spawn(command, args, { 
      stdio: 'inherit',
      shell: true 
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${command} completed successfully`);
        resolve(true);
      } else {
        console.log(`❌ ${command} failed with code ${code}`);
        resolve(false);
      }
    });
    
    process.on('error', (error) => {
      console.log(`❌ ${command} error:`, error.message);
      resolve(false);
    });
  });
}

async function checkPrerequisites() {
  console.log('🔍 Checking prerequisites...');
  
  // Check if .env.local exists
  try {
    const fs = await import('fs');
    if (!fs.existsSync('.env.local')) {
      console.log('❌ .env.local file not found');
      console.log('Please create .env.local with your DATABASE_URL');
      console.log('Example:');
      console.log('DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"');
      return false;
    }
    console.log('✅ .env.local found');
  } catch (error) {
    console.log('⚠️  Could not check .env.local file');
  }
  
  return true;
}

async function main() {
  console.log('🏗️  Laptop Recommendation System Setup');
  console.log('=====================================\n');
  
  const hasPrereqs = await checkPrerequisites();
  if (!hasPrereqs) {
    console.log('\n❌ Prerequisites not met. Please fix and try again.');
    process.exit(1);
  }
  
  const steps = [
    { name: 'Install dependencies', command: 'pnpm', args: ['install'] },
    { name: 'Generate Prisma client', command: 'pnpm', args: ['exec', 'prisma', 'generate'] },
    { name: 'Deploy database migrations', command: 'pnpm', args: ['exec', 'prisma', 'migrate', 'deploy'] },
    { name: 'Run health check', command: 'pnpm', args: ['exec', 'tsx', 'scripts/health-check.ts'] },
  ];
  
  for (const step of steps) {
    console.log(`\n📦 ${step.name}...`);
    const success = await runCommand(step.command, step.args);
    
    if (!success) {
      console.log(`\n❌ Setup failed at: ${step.name}`);
      process.exit(1);
    }
  }
  
  console.log('\n🎉 Setup completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Make sure Ollama is running: ollama serve');
  console.log('2. Install models: ollama pull nomic-embed-text && ollama pull llama3.2:3b-instruct');
  console.log('3. Ingest data: pnpm exec tsx scripts/ingest-rag.ts all');
  console.log('4. Start development: pnpm dev');
}

main().catch(console.error);

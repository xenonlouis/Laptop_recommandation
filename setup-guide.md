# 🚀 Laptop Recommendation System Setup Guide

## 🎮 RTX 3060 Optimization

### Recommended Ollama Models for 6GB VRAM:
```bash
ollama pull nomic-embed-text        # ~500MB VRAM
ollama pull llama3.2:3b-instruct    # ~2GB VRAM
# Total: ~2.5GB, leaving 3.5GB buffer for system
```

## 📋 Setup Steps

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Environment Variables
Create `.env.local` file with:
```env
# Required: Your Neon PostgreSQL database URL
DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"

# Optional: Ollama configuration (defaults work fine)
OLLAMA_BASE_URL="http://localhost:11434"
OLLAMA_EMBED_MODEL="nomic-embed-text"
OLLAMA_CHAT_MODEL="llama3.2:3b-instruct"
```

### 3. Database Setup
```bash
# Generate Prisma client
pnpm exec prisma generate

# Run database migrations
pnpm exec prisma migrate deploy

# (Optional) Seed with sample data if available
pnpm exec prisma db seed
```

### 4. Install & Start Ollama
```bash
# Download from https://ollama.ai/download/windows
# Or use winget:
winget install ollama

# Start Ollama
ollama serve

# In another terminal, pull models:
ollama pull nomic-embed-text
ollama pull llama3.2:3b-instruct
```

### 5. RAG Data Ingestion
```bash
# Run the ingestion script to populate vector database
pnpm exec tsx scripts/ingest-rag.ts all

# Check statistics
pnpm exec tsx scripts/ingest-rag.ts stats
```

### 6. Start Development Server
```bash
pnpm dev
```

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm exec tsx scripts/ingest-rag.ts all` - Ingest all data
- `pnpm exec tsx scripts/ingest-rag.ts stats` - Show RAG statistics
- `pnpm exec tsx scripts/ingest-rag.ts clean --confirm` - Clean RAG data

## ✅ Health Checks

1. **Database**: `pnpm exec prisma studio` - Opens database browser
2. **Ollama**: Visit `http://localhost:11434` - Should show "Ollama is running"
3. **Models**: `ollama list` - Shows installed models
4. **App**: Visit `http://localhost:3000` - Your application

## 🐛 Troubleshooting

- **Out of VRAM**: Use `llama3.2:1b` instead of `3b` model
- **Ollama not found**: Restart terminal after installation
- **Database errors**: Check DATABASE_URL format
- **Port conflicts**: Change port with `pnpm dev -p 3001`

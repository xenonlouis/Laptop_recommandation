import prisma from '@/lib/prisma';
import { ensurePgvectorAndRagSchemaSQL } from './sql';
import { RagDocument, RagChunk, RagSource, splitIntoChunks } from './chunk';
import { getEmbeddings } from './ollama-client';
import { randomUUID } from 'crypto';

// Ensure database schema exists
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

// Helper to create document ID
function toDocId(source: RagSource, sourceId: string) {
  return `${source}:${sourceId}`;
}

// Generic ingestion function
async function ingestDocuments(documents: RagDocument[], chunkSize = 300) {
  for (const doc of documents) {
    try {
      // Generate content for chunking
      const content = typeof doc.metadata.content === 'string' 
        ? doc.metadata.content 
        : JSON.stringify(doc.metadata.content);
      
      const chunks = splitIntoChunks(content, chunkSize);
      const embeddings = await getEmbeddings(chunks);

      await prisma.$transaction(async (tx) => {
        // Upsert document
        await tx.$executeRawUnsafe(
          `INSERT INTO rag_documents (id, source, source_id, title, metadata, updated_at)
           VALUES ($1, $2, $3, $4, $5::jsonb, $6)
           ON CONFLICT (id) DO UPDATE SET 
             title = EXCLUDED.title, 
             metadata = EXCLUDED.metadata, 
             updated_at = EXCLUDED.updated_at`,
          doc.id,
          doc.source,
          doc.sourceId,
          doc.title ?? null,
          JSON.stringify(doc.metadata),
          doc.updatedAt ?? new Date()
        );

        // Delete old chunks/embeddings
        await tx.$executeRawUnsafe(
          `DELETE FROM rag_embeddings WHERE chunk_id IN (SELECT id FROM rag_chunks WHERE document_id = $1)`,
          doc.id
        );
        await tx.$executeRawUnsafe(
          `DELETE FROM rag_chunks WHERE document_id = $1`,
          doc.id
        );

        // Insert new chunks + embeddings
        for (let i = 0; i < chunks.length; i++) {
          const chunkId = randomUUID();
          const chunkContent = chunks[i];
          const tokenCount = Math.ceil(chunkContent.length / 4);
          const embedding = embeddings[i];

          await tx.$executeRawUnsafe(
            `INSERT INTO rag_chunks (id, document_id, chunk_index, content, token_count)
             VALUES ($1, $2, $3, $4, $5)`,
            chunkId,
            doc.id,
            i,
            chunkContent,
            tokenCount
          );

          const embeddingArray = `[${embedding.join(',')}]`;
          await tx.$executeRawUnsafe(
            `INSERT INTO rag_embeddings (chunk_id, embedding) VALUES ($1, $2::vector)`,
            chunkId,
            embeddingArray
          );
        }
      });

      console.log(`✓ Ingested ${doc.source}: ${doc.title}`);
    } catch (error) {
      console.error(`✗ Failed to ingest ${doc.source}: ${doc.title}`, error);
    }
  }
}

// Ingest Laptops with enhanced metadata
export async function ingestLaptops() {
  await ensureSchema();
  const laptops = await prisma.laptop.findMany({
    include: { supportedProfiles: true, supportedOS: true },
  });

  const documents: RagDocument[] = laptops.map((laptop) => {
    const content = [
      `Laptop: ${laptop.brand} ${laptop.model}`,
      `Brand: ${laptop.brand}`,
      `Model: ${laptop.model}`,
      `Price: €${laptop.price} ${laptop.priceType}`,
      `Processor/CPU: ${laptop.processor}`,
      `RAM Memory: ${laptop.ram}GB`,
      `Storage: ${laptop.storage}GB SSD`,
      `Battery Life: ${laptop.batteryLife} hours`,
      `Performance Score: ${laptop.performanceScore}/10`,
      laptop.notes ? `Additional Notes: ${laptop.notes}` : '',
      `Supported User Profiles: ${laptop.supportedProfiles.map((p) => p.profile).join(', ')}`,
      `Compatible Operating Systems: ${laptop.supportedOS.map((o) => o.os).join(', ')}`,
      `Ideal for: ${laptop.supportedProfiles.includes({ profile: 'developer' } as any) ? 'software development, coding, programming' : 'consulting, analysis, presentations'}`,
    ]
      .filter(Boolean)
      .join('. ');

    return {
      id: toDocId('laptop', laptop.id),
      source: 'laptop' as RagSource,
      sourceId: laptop.id,
      title: `${laptop.brand} ${laptop.model}`,
      metadata: {
        content,
        brand: laptop.brand,
        model: laptop.model,
        price: Number(laptop.price),
        priceType: laptop.priceType,
        processor: laptop.processor,
        ram: laptop.ram,
        storage: laptop.storage,
        batteryLife: Number(laptop.batteryLife),
        performanceScore: Number(laptop.performanceScore),
        profiles: laptop.supportedProfiles.map((p) => p.profile),
        os: laptop.supportedOS.map((o) => o.os),
      },
      updatedAt: laptop.updatedAt,
    };
  });

  await ingestDocuments(documents, 300);
}

// Ingest Accessories
export async function ingestAccessories() {
  await ensureSchema();
  const accessories = await prisma.accessory.findMany();

  const documents: RagDocument[] = accessories.map((acc) => {
    const content = [
      `Accessory: ${acc.name}`,
      `Type: ${acc.type}`,
      `Brand: ${acc.brand}`,
      `Price: €${acc.price} ${acc.priceType}`,
      acc.notes ? `Notes: ${acc.notes}` : '',
      `Category: ${acc.type === 'mouse' ? 'Pointing device, ergonomic' : 
                   acc.type === 'keyboard' ? 'Input device, typing' :
                   acc.type === 'headphone' ? 'Audio device, communication' :
                   acc.type === 'dock' ? 'Connectivity, docking station' : 'Other peripheral'}`,
    ]
      .filter(Boolean)
      .join('. ');

    return {
      id: toDocId('accessory', acc.id),
      source: 'accessory' as RagSource,
      sourceId: acc.id,
      title: acc.name,
      metadata: {
        content,
        name: acc.name,
        type: acc.type,
        brand: acc.brand,
        price: Number(acc.price),
        priceType: acc.priceType,
      },
      updatedAt: acc.updatedAt,
    };
  });

  await ingestDocuments(documents, 150);
}

// Ingest Package Templates
export async function ingestPackageTemplates() {
  await ensureSchema();
  const templates = await prisma.packageTemplate.findMany({
    where: { isActive: true },
    include: {
      laptop: {
        include: {
          supportedProfiles: true,
          supportedOS: true,
        },
      },
      accessories: {
        include: {
          accessory: true,
        },
      },
    },
  });

  const documents: RagDocument[] = templates.map((template) => {
    const totalPrice = Number(template.laptop.price) + 
      template.accessories.reduce((sum, ta) => sum + Number(ta.accessory.price), 0);

    const content = [
      `Package Template: ${template.name}`,
      template.description ? `Description: ${template.description}` : '',
      `Profile Type: ${template.profileType}`,
      `Laptop: ${template.laptop.brand} ${template.laptop.model}`,
      `Laptop Specs: ${template.laptop.processor}, ${template.laptop.ram}GB RAM, ${template.laptop.storage}GB SSD`,
      `Included Accessories: ${template.accessories.map(ta => ta.accessory.name).join(', ') || 'None'}`,
      `Total Package Price: €${totalPrice.toFixed(2)} ${template.priceType}`,
      `Laptop Performance Score: ${template.laptop.performanceScore}/10`,
      `Battery Life: ${template.laptop.batteryLife} hours`,
      template.notes ? `Package Notes: ${template.notes}` : '',
    ]
      .filter(Boolean)
      .join('. ');

    return {
      id: toDocId('package_template', template.id),
      source: 'package_template' as RagSource,
      sourceId: template.id,
      title: template.name,
      metadata: {
        content,
        name: template.name,
        description: template.description,
        profileType: template.profileType,
        laptopId: template.laptopId,
        laptopModel: `${template.laptop.brand} ${template.laptop.model}`,
        totalPrice,
        priceType: template.priceType,
        accessoryCount: template.accessories.length,
      },
      updatedAt: template.updatedAt,
    };
  });

  await ingestDocuments(documents, 250);
}

// Ingest Tools
export async function ingestTools() {
  await ensureSchema();
  const tools = await prisma.tool.findMany({
    include: {
      alternatives: true,
    },
  });

  const documents: RagDocument[] = tools.map((tool) => {
    const content = [
      `Software Tool: ${tool.name}`,
      tool.description ? `Description: ${tool.description}` : '',
      `Category: ${tool.category}`,
      tool.isRequired ? 'Required: Yes' : 'Required: No',
      tool.alternatives.length > 0 
        ? `Alternative tools: ${tool.alternatives.map(a => a.alternative).join(', ')}` 
        : '',
      tool.installationNotes ? `Installation: ${tool.installationNotes}` : '',
      `Popularity Score: ${tool.popularity || 0}/10`,
      `Usage Count: ${tool.usageCount} users`,
    ]
      .filter(Boolean)
      .join('. ');

    return {
      id: toDocId('tool', tool.id),
      source: 'tool' as RagSource,
      sourceId: tool.id,
      title: tool.name,
      metadata: {
        content,
        name: tool.name,
        category: tool.category,
        isRequired: tool.isRequired,
        popularity: tool.popularity || 0,
        usageCount: tool.usageCount,
      },
      updatedAt: tool.updatedAt,
    };
  });

  await ingestDocuments(documents, 200);
}

// Ingest Toolkits
export async function ingestToolkits() {
  await ensureSchema();
  const toolkits = await prisma.toolkit.findMany({
    include: {
      tools: {
        include: {
          tool: true,
        },
      },
    },
  });

  const documents: RagDocument[] = toolkits.map((toolkit) => {
    const toolNames = toolkit.tools.map(tt => tt.tool.name);
    const categories = [...new Set(toolkit.tools.map(tt => tt.tool.category))];

    const content = [
      `Toolkit: ${toolkit.profileName}`,
      toolkit.description ? `Description: ${toolkit.description}` : '',
      `Operating System: ${toolkit.operatingSystem}`,
      `Number of Tools: ${toolkit.tools.length}`,
      `Tool Categories: ${categories.join(', ')}`,
      `Included Tools: ${toolNames.join(', ')}`,
      `Profile Type: ${toolkit.profileName.toLowerCase().includes('developer') ? 'Developer' : 'Consultant'}`,
    ]
      .filter(Boolean)
      .join('. ');

    return {
      id: toDocId('toolkit', toolkit.id),
      source: 'toolkit' as RagSource,
      sourceId: toolkit.id,
      title: toolkit.profileName,
      metadata: {
        content,
        profileName: toolkit.profileName,
        operatingSystem: toolkit.operatingSystem,
        toolCount: toolkit.tools.length,
        toolNames,
        categories,
      },
      updatedAt: toolkit.updatedAt,
    };
  });

  await ingestDocuments(documents, 250);
}

// Ingest Survey Responses for learning patterns
export async function ingestSurveyResponses() {
  await ensureSchema();
  const responses = await prisma.surveyResponse.findMany({
    include: {
      matchedToolkit: true,
    },
    take: 100, // Limit to recent responses
    orderBy: { submittedAt: 'desc' },
  });

  const documents: RagDocument[] = responses
    .filter(r => r.matchedToolkitId) // Only include matched responses
    .map((response) => {
      const content = [
        `Survey Response from ${response.position}`,
        `Role: ${response.primaryRole}`,
        `Development Percentage: ${response.developmentPercentage}%`,
        `Preferred OS: ${response.preferredOS}`,
        `Primary OS Experience: ${response.primaryOS}`,
        response.programmingLanguages.length > 0 
          ? `Programming Languages: ${response.programmingLanguages.join(', ')}`
          : '',
        response.developmentType.length > 0
          ? `Development Types: ${response.developmentType.join(', ')}`
          : '',
        response.selectedTools.length > 0
          ? `Selected Tools: ${response.selectedTools.join(', ')}`
          : '',
        `Matched Toolkit: ${response.matchedToolkit?.profileName}`,
        `Match Score: ${response.matchScore}`,
        response.batteryLifeImportance 
          ? `Battery Life Importance: ${response.batteryLifeImportance}/10`
          : '',
        response.multipleWorkspaces ? 'Uses Multiple Workspaces' : '',
        response.resourceIntensiveApps ? 'Runs Resource Intensive Apps' : '',
      ]
        .filter(Boolean)
        .join('. ');

      return {
        id: toDocId('notion', response.id), // Using 'notion' as source for survey data
        source: 'notion' as RagSource,
        sourceId: response.id,
        title: `${response.position} - ${response.primaryRole}`,
        metadata: {
          content,
          role: response.primaryRole,
          developmentPercentage: response.developmentPercentage,
          preferredOS: response.preferredOS,
          matchedToolkit: response.matchedToolkit?.profileName,
          matchScore: response.matchScore,
        },
        updatedAt: response.submittedAt,
      };
    });

  await ingestDocuments(documents, 200);
}

// Main ingestion function
export async function ingestAll() {
  console.log('🚀 Starting complete RAG data ingestion...');
  
  try {
    await ensureSchema();
    console.log('✓ Database schema ready');

    console.log('\n📦 Ingesting laptops...');
    await ingestLaptops();
    
    console.log('\n🖱️ Ingesting accessories...');
    await ingestAccessories();
    
    console.log('\n📋 Ingesting package templates...');
    await ingestPackageTemplates();
    
    console.log('\n🛠️ Ingesting tools...');
    await ingestTools();
    
    console.log('\n🧰 Ingesting toolkits...');
    await ingestToolkits();
    
    console.log('\n📊 Ingesting survey responses...');
    await ingestSurveyResponses();
    
    console.log('\n✅ RAG data ingestion complete!');
    
    // Get statistics
    const stats = await prisma.$queryRawUnsafe<any[]>(`
      SELECT source, COUNT(*) as doc_count 
      FROM rag_documents 
      GROUP BY source
    `);
    
    console.log('\n📈 Ingestion Statistics:');
    stats.forEach(stat => {
      console.log(`  - ${stat.source}: ${stat.doc_count} documents`);
    });
    
  } catch (error) {
    console.error('❌ Ingestion failed:', error);
    throw error;
  }
}

// Export individual functions for selective ingestion
export {
  ensureSchema,
  ingestDocuments,
};

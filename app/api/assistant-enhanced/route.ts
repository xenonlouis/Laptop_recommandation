import { NextRequest } from 'next/server';
import { streamText, Tool } from 'ai';
import { createOllama } from 'ollama-ai-provider';
import prisma from '@/lib/prisma';
import { retrieveChunks, retrieveForRecommendation, retrieveAccessoriesForLaptop, retrieveToolsForProfile } from '@/lib/rag/retriever-enhanced';
import { OLLAMA_CONFIG } from '@/lib/rag/ollama-client';

export const runtime = 'nodejs';

const ollama = createOllama({ baseURL: OLLAMA_CONFIG.baseURL });

const tools: Record<string, Tool> = {
  searchLaptops: {
    description: 'Search for laptops with advanced filters',
    parameters: {
      type: 'object',
      properties: {
        budgetEUR: { type: 'number', description: 'Maximum budget in euros' },
        os: { type: 'string', description: 'Operating system (windows/macos/linux)' },
        profile: { type: 'string', description: 'User profile (developer/consultant)' },
        minPerfScore: { type: 'number', description: 'Minimum performance score (0-10)' },
        minBatteryLife: { type: 'number', description: 'Minimum battery life in hours' },
      },
    },
    execute: async ({ budgetEUR, os, profile, minPerfScore, minBatteryLife }) => {
      const where: any = {};
      if (minPerfScore) where.performanceScore = { gte: minPerfScore };
      if (minBatteryLife) where.batteryLife = { gte: minBatteryLife };

      const laptops = await prisma.laptop.findMany({
        include: { supportedProfiles: true, supportedOS: true },
        orderBy: { performanceScore: 'desc' },
        take: 50,
      });

      const filtered = laptops.filter((l) => {
        const price = Number(l.price);
        const okBudget = budgetEUR ? price <= budgetEUR : true;
        const okOS = os ? l.supportedOS.some((o) => o.os.toLowerCase().includes(String(os).toLowerCase())) : true;
        const okProfile = profile ? l.supportedProfiles.some((p) => p.profile.toLowerCase().includes(String(profile).toLowerCase())) : true;
        const okPerf = minPerfScore ? Number(l.performanceScore) >= Number(minPerfScore) : true;
        const okBattery = minBatteryLife ? Number(l.batteryLife) >= Number(minBatteryLife) : true;
        return okBudget && okOS && okProfile && okPerf && okBattery;
      });

      return filtered.slice(0, 15).map((l) => ({
        id: l.id,
        title: `${l.brand} ${l.model}`,
        price: Number(l.price),
        priceType: l.priceType,
        cpu: l.processor,
        ram: l.ram,
        storage: l.storage,
        batteryLife: Number(l.batteryLife),
        perf: Number(l.performanceScore),
        profiles: l.supportedProfiles.map((p) => p.profile),
        os: l.supportedOS.map((o) => o.os),
      }));
    },
  },

  getLaptopDetails: {
    description: 'Get detailed information about a specific laptop',
    parameters: { 
      type: 'object', 
      properties: { 
        id: { type: 'string', description: 'Laptop ID' } 
      }, 
      required: ['id'] 
    },
    execute: async ({ id }) => {
      const laptop = await prisma.laptop.findUnique({ 
        where: { id }, 
        include: { supportedProfiles: true, supportedOS: true } 
      });
      if (!laptop) return null;

      // Get similar laptops
      const similar = await prisma.laptop.findMany({
        where: {
          id: { not: laptop.id },
          supportedProfiles: {
            some: {
              profile: { in: laptop.supportedProfiles.map(p => p.profile) }
            }
          }
        },
        take: 3,
        orderBy: { performanceScore: 'desc' }
      });

      return {
        id: laptop.id,
        title: `${laptop.brand} ${laptop.model}`,
        price: Number(laptop.price),
        priceType: laptop.priceType,
        cpu: laptop.processor,
        ram: laptop.ram,
        storage: laptop.storage,
        batteryLife: Number(laptop.batteryLife),
        perf: Number(laptop.performanceScore),
        profiles: laptop.supportedProfiles.map((p) => p.profile),
        os: laptop.supportedOS.map((o) => o.os),
        notes: laptop.notes,
        images: laptop.images,
        similar: similar.map(s => ({
          id: s.id,
          title: `${s.brand} ${s.model}`,
          price: Number(s.price)
        }))
      };
    },
  },

  searchAccessories: {
    description: 'Search for accessories by type or compatibility',
    parameters: {
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Type: mouse/keyboard/headphone/dock' },
        maxPrice: { type: 'number', description: 'Maximum price in euros' },
        laptopId: { type: 'string', description: 'Laptop ID for compatibility check' }
      }
    },
    execute: async ({ type, maxPrice, laptopId }) => {
      const where: any = {};
      if (type) where.type = type;
      if (maxPrice) where.price = { lte: maxPrice };

      const accessories = await prisma.accessory.findMany({
        where,
        orderBy: { price: 'asc' },
        take: 10
      });

      return accessories.map(a => ({
        id: a.id,
        name: a.name,
        type: a.type,
        brand: a.brand,
        price: Number(a.price),
        priceType: a.priceType,
        notes: a.notes
      }));
    }
  },

  getPackageTemplates: {
    description: 'Get pre-configured package templates for different profiles',
    parameters: {
      type: 'object',
      properties: {
        profileType: { type: 'string', description: 'Profile type: developer/consultant' },
        maxBudget: { type: 'number', description: 'Maximum budget for the package' }
      }
    },
    execute: async ({ profileType, maxBudget }) => {
      const templates = await prisma.packageTemplate.findMany({
        where: {
          isActive: true,
          ...(profileType && { profileType })
        },
        include: {
          laptop: true,
          accessories: {
            include: { accessory: true }
          }
        },
        take: 10
      });

      return templates.map(t => {
        const totalPrice = Number(t.laptop.price) + 
          t.accessories.reduce((sum, ta) => sum + Number(ta.accessory.price), 0);
        
        if (maxBudget && totalPrice > maxBudget) return null;

        return {
          id: t.id,
          name: t.name,
          description: t.description,
          profileType: t.profileType,
          laptop: `${t.laptop.brand} ${t.laptop.model}`,
          laptopPrice: Number(t.laptop.price),
          accessories: t.accessories.map(ta => ta.accessory.name),
          totalPrice,
          priceType: t.priceType
        };
      }).filter(Boolean);
    }
  },

  buildCustomPackage: {
    description: 'Build a custom package with laptop and accessories',
    parameters: {
      type: 'object',
      properties: {
        laptopId: { type: 'string', description: 'Laptop ID' },
        accessoryIds: { 
          type: 'array', 
          items: { type: 'string' },
          description: 'Array of accessory IDs'
        }
      },
      required: ['laptopId']
    },
    execute: async ({ laptopId, accessoryIds = [] }) => {
      const laptop = await prisma.laptop.findUnique({ where: { id: laptopId } });
      if (!laptop) return { error: 'Laptop not found' };

      const accessories = accessoryIds.length > 0 
        ? await prisma.accessory.findMany({
            where: { id: { in: accessoryIds } }
          })
        : [];

      const totalPrice = Number(laptop.price) + 
        accessories.reduce((sum, a) => sum + Number(a.price), 0);

      return {
        laptop: {
          id: laptop.id,
          model: `${laptop.brand} ${laptop.model}`,
          price: Number(laptop.price)
        },
        accessories: accessories.map(a => ({
          id: a.id,
          name: a.name,
          price: Number(a.price)
        })),
        totalPrice,
        summary: `Package with ${laptop.brand} ${laptop.model} and ${accessories.length} accessories`
      };
    }
  },

  compareLaptops: {
    description: 'Compare multiple laptops side by side',
    parameters: {
      type: 'object',
      properties: {
        laptopIds: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of laptop IDs to compare (2-4 laptops)'
        }
      },
      required: ['laptopIds']
    },
    execute: async ({ laptopIds }) => {
      if (!laptopIds || laptopIds.length < 2) {
        return { error: 'Please provide at least 2 laptop IDs to compare' };
      }

      const laptops = await prisma.laptop.findMany({
        where: { id: { in: laptopIds.slice(0, 4) } },
        include: { supportedProfiles: true, supportedOS: true }
      });

      return {
        comparison: laptops.map(l => ({
          id: l.id,
          model: `${l.brand} ${l.model}`,
          price: Number(l.price),
          priceType: l.priceType,
          specs: {
            cpu: l.processor,
            ram: `${l.ram}GB`,
            storage: `${l.storage}GB`,
            battery: `${l.batteryLife}h`,
            performance: Number(l.performanceScore)
          },
          profiles: l.supportedProfiles.map(p => p.profile),
          os: l.supportedOS.map(o => o.os)
        })),
        recommendation: laptops.reduce((best, current) => 
          Number(current.performanceScore) > Number(best.performanceScore) ? current : best
        ).id
      };
    }
  },

  getToolkits: {
    description: 'Get software toolkits for specific profiles and OS',
    parameters: {
      type: 'object',
      properties: {
        profileName: { type: 'string', description: 'Profile name' },
        os: { type: 'string', description: 'Operating system' }
      }
    },
    execute: async ({ profileName, os }) => {
      const where: any = {};
      if (profileName) where.profileName = { contains: profileName, mode: 'insensitive' };
      if (os) where.operatingSystem = os;

      const toolkits = await prisma.toolkit.findMany({
        where,
        include: {
          tools: {
            include: { tool: true }
          }
        },
        take: 5
      });

      return toolkits.map(tk => ({
        id: tk.id,
        name: tk.profileName,
        description: tk.description,
        os: tk.operatingSystem,
        toolCount: tk.tools.length,
        tools: tk.tools.slice(0, 10).map(tt => ({
          name: tt.tool.name,
          category: tt.tool.category,
          required: tt.tool.isRequired
        }))
      }));
    }
  }
};

const systemPrompt = `You are an intelligent laptop recommendation assistant with access to a comprehensive database.

CAPABILITIES:
- Search and recommend laptops based on user requirements
- Suggest accessories and complete packages
- Compare multiple laptops
- Provide toolkit recommendations for different roles
- Build custom packages within budget

CONTEXT USAGE:
- Use the provided CONTEXT chunks for detailed explanations and background
- Always use tools for current prices, specifications, and availability
- Combine context knowledge with tool results for comprehensive answers

RESPONSE GUIDELINES:
- Be specific and mention actual models with prices
- Provide comparisons when relevant
- Consider the user's role (developer/consultant) in recommendations
- Mention battery life for mobile users
- Suggest complete packages when appropriate
- Be concise but thorough`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user')?.content || '';

    // Enhanced context retrieval
    const contexts = await retrieveChunks({
      query: String(lastUserMessage),
      topK: 8,
      useHybrid: true,
      rerank: true
    });

    const contextText = contexts.map((c, i) => 
      `[${i + 1}] ${c.title || c.source}: ${c.content}`
    ).join('\n\n');

    // Add context summary
    const contextSummary = `Found ${contexts.length} relevant documents from: ${
      [...new Set(contexts.map(c => c.source))].join(', ')
    }`;

    const result = await streamText({
      model: ollama.languageModel(OLLAMA_CONFIG.chatModel),
      system: systemPrompt,
      messages: [
        { 
          role: 'system', 
          content: `CONTEXT SUMMARY: ${contextSummary}\n\nDETAILED CONTEXT:\n${contextText}` 
        },
        ...messages,
      ],
      tools,
      toolChoice: 'auto',
      maxSteps: 5,
      temperature: 0.7,
      maxTokens: 2000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Assistant error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Assistant service error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500 }
    );
  }
}

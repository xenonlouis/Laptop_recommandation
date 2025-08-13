import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { embedTexts } from '@/lib/rag/embeddings';
import { retrieveChunks } from '@/lib/rag/retriever';

export const runtime = 'nodejs';

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

const systemPrompt = `You are a comprehensive laptop recommendation assistant with access to:
- Complete laptop database with specifications, prices, and performance scores
- People and their current laptop assignments 
- Package templates and accessories
- Assignment status and delivery information

You can help with:
- Laptop recommendations based on budget, OS, performance needs
- Finding what laptop someone is assigned
- Comparing different laptop models
- Package template information
- Assignment status and delivery tracking
- General laptop advice and specifications

CRITICAL: u may only use info og people and assignments from the database , laptops should be recommended based on the context and your knowledge constrained by the data in the database always and ALWAYS REFER TO THE DATABASE VERY IMPORTANT.
when you are asked about people and assignments you must use the database information provided in "PEOPLE & ASSIGNMENTS FOUND (CURRENT DATABASE)" section as authoritative.
when you are asked about laptops you must use the database information provided in "LAPTOPS FOUND (CURRENT DATABASE)" section as authoritative.
whenver you are asked about info on laptops in general always just use the laptops that are in the database and never make up any info about laptops that are not in the database.
when you are asked about people and assignments you must use the database information provided in "PEOPLE & ASSIGNMENTS FOUND (CURRENT DATABASE)" section as authoritative.
when you are asked about laptops you must use the database information provided in "LAPTOPS FOUND (CURRENT DATABASE)" section as authoritative.
whenver you are asked about info on laptops in general always just use the laptops that are in the database and never make up any info about laptops that are not in the database.


if u are ever asked about a laptop for a genre like consultant or develepor and u could not find a laptop in the database that matches the genre then just say that u could not find a laptop that matches the genre and that u are constrained by the database.



For people/assignment queries: Use the database information provided in "PEOPLE & ASSIGNMENTS FOUND (CURRENT DATABASE)" section as authoritative.
For laptop recommendations: Use the context and your knowledge to provide helpful suggestions.
Be helpful, professional, and comprehensive in your responses.`;

// Helper function to search for people with assignments (NEW SYSTEM ONLY)
async function searchPeople(query: string) {
  try {
    const people = await prisma.person.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { pcReference: { contains: query, mode: 'insensitive' } },
        ]
      },
      include: {
        // ONLY NEW assignment system - ignore legacy
        personAssignments: {
          include: {
            template: {
              include: {
                laptop: {
                  include: {
                    supportedProfiles: true,
                    supportedOS: true
                  }
                },
                accessories: {
                  include: {
                    accessory: true
                  }
                }
              }
            }
          }
        }
      }
    });
    return people;
  } catch (error) {
    console.error('Error searching people:', error);
    return [];
  }
}

// Helper function to search assignments by various criteria
async function searchAssignments(query: string) {
  try {
    // Search in new assignment system
    const personAssignments = await prisma.personAssignment.findMany({
      where: {
        OR: [
          { pcReference: { contains: query, mode: 'insensitive' } },
          { status: { contains: query, mode: 'insensitive' } },
          { person: { name: { contains: query, mode: 'insensitive' } } },
          { template: { name: { contains: query, mode: 'insensitive' } } },
        ]
      },
      include: {
        person: true,
        template: {
          include: {
            laptop: {
              include: {
                supportedProfiles: true,
                supportedOS: true
              }
            },
            accessories: {
              include: {
                accessory: true
              }
            }
          }
        }
      }
    });

    return personAssignments;
  } catch (error) {
    console.error('Error searching assignments:', error);
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
  const { messages } = await req.json();
  const lastUser = [...messages].reverse().find((m: any) => m.role === 'user')?.content || '';

    // Check if this is a people/assignment query or contains person names
    let peopleContext = '';
    const peopleKeywords = ['who has', 'what laptop', 'which computer', 'pc reference', 'assigned to', 'assignment', 'delivered', 'status'];
    const hasPersonName = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/.test(lastUser);
    const isPersonQuery = peopleKeywords.some(keyword => lastUser.toLowerCase().includes(keyword)) || hasPersonName;
    
    if (isPersonQuery) {
      // Extract potential person name from query
      const nameMatches = lastUser.match(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g);
      if (nameMatches) {
        for (const name of nameMatches) {
          const people = await searchPeople(name);
          if (people.length > 0) {
            peopleContext += `\nPEOPLE & ASSIGNMENTS FOUND (CURRENT DATABASE):\n`;
            people.forEach(person => {
              peopleContext += `\n=== ${person.name} ===\n`;
              peopleContext += `Email: ${person.email}\n`;
              peopleContext += `Department: ${person.department}\n`;
              peopleContext += `Position: ${person.position}\n`;
              peopleContext += `PC Reference: ${person.pcReference}\n`;
              
              // ONLY NEW assignment system
              if (person.personAssignments && person.personAssignments.length > 0) {
                peopleContext += `\nCURRENT ASSIGNMENTS:\n`;
                person.personAssignments.forEach((assignment, i) => {
                  peopleContext += `Assignment ${i + 1}:\n`;
                  peopleContext += `  Template: ${assignment.template.name}\n`;
                  peopleContext += `  Status: ${assignment.status}\n`;
                  peopleContext += `  PC Ref: ${assignment.pcReference || 'Not set'}\n`;
                  peopleContext += `  Assigned: ${assignment.assignedAt.toLocaleDateString()}\n`;
                  if (assignment.deliveredAt) {
                    peopleContext += `  Delivered: ${assignment.deliveredAt.toLocaleDateString()}\n`;
                  }
                  
                  // Laptop details
                  const laptop = assignment.template.laptop;
                  peopleContext += `  LAPTOP: ${laptop.brand} ${laptop.model}\n`;
                  peopleContext += `    - CPU: ${laptop.processor}\n`;
                  peopleContext += `    - RAM: ${laptop.ram}\n`;
                  peopleContext += `    - Storage: ${laptop.storage}\n`;
                  peopleContext += `    - Battery: ${laptop.batteryLife}h\n`;
                  peopleContext += `    - Performance: ${laptop.performanceScore}/10\n`;
                  peopleContext += `    - Price: €${laptop.price} ${laptop.priceType}\n`;
                  
                  // Accessories
                  if (assignment.template.accessories.length > 0) {
                    peopleContext += `  ACCESSORIES:\n`;
                    assignment.template.accessories.forEach(ta => {
                      peopleContext += `    - ${ta.accessory.name} (${ta.accessory.type}) - €${ta.accessory.price}\n`;
                    });
                  }
                  
                  if (assignment.notes) {
                    peopleContext += `  Notes: ${assignment.notes}\n`;
                  }
                });
              } else {
                peopleContext += `\nNo current assignments found in the new system.\n`;
              }
            });
          }
        }
      }
      
      // Also search assignments directly if query contains specific keywords
      const assignmentKeywords = ['assignment', 'status', 'delivered', 'assigned', 'pc reference'];
      if (assignmentKeywords.some(keyword => lastUser.toLowerCase().includes(keyword))) {
        const assignments = await searchAssignments(lastUser);
        if (assignments.length > 0) {
          peopleContext += `\nASSIGNMENT SEARCH RESULTS:\n`;
          assignments.forEach((assignment, i) => {
            peopleContext += `\nAssignment ${i + 1}:\n`;
            peopleContext += `Person: ${assignment.person.name} (${assignment.person.email})\n`;
            peopleContext += `Template: ${assignment.template.name}\n`;
            peopleContext += `Status: ${assignment.status}\n`;
            peopleContext += `PC Reference: ${assignment.pcReference || 'Not set'}\n`;
            peopleContext += `Assigned: ${assignment.assignedAt.toLocaleDateString()}\n`;
            if (assignment.deliveredAt) {
              peopleContext += `Delivered: ${assignment.deliveredAt.toLocaleDateString()}\n`;
            }
          });
        }
      }
    }

    // Get RAG context for general laptop queries (but prioritize database for people)
    let contextText = '';
    try {
      const [queryEmbedding] = await embedTexts([String(lastUser || '')]);
      const retrieved = await retrieveChunks({ queryEmbedding, topK: 6 });
      contextText = retrieved.map((c, i) => `#${i + 1} [${c.title ?? c.source}:${c.sourceId}]\n${c.content}`).join('\n\n');
    } catch (error) {
      console.error('RAG error:', error);
      contextText = 'RAG context unavailable';
    }

    // Build conversation prompt
    const conversationText = messages.map((m: any) => `${m.role}: ${m.content}`).join('\n');
    const fullPrompt = `${systemPrompt}\n\nCONTEXT:\n${contextText}${peopleContext}\n\nConversation:\n${conversationText}\nassistant:`;

    // Call Ollama directly
    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2:latest',
        prompt: fullPrompt,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    // Create a simple streaming response
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) return;

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.trim()) {
                try {
                  const data = JSON.parse(line);
                  if (data.response) {
                    // Send simple text chunks
                    controller.enqueue(encoder.encode(data.response));
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        } catch (error) {
          console.error('Streaming error:', error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: 'AI service temporarily unavailable' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
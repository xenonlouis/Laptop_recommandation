import { notionClient, databaseIds } from './client';
import { Person } from '@/types';
import { createCheckpoint } from './checkpoint';
import fs from 'fs';
import path from 'path';

// Path to the people JSON file
const peopleDataFilePath = path.join(process.cwd(), 'data', 'people.json');

// Read people from the JSON file
const getPeople = async (): Promise<Person[]> => {
  try {
    if (!fs.existsSync(peopleDataFilePath)) {
      return [];
    }
    const data = await fs.promises.readFile(peopleDataFilePath, 'utf8');
    return JSON.parse(data) as Person[];
  } catch (error) {
    console.error('Error reading people data:', error);
    return [];
  }
};

// Convert Person to Notion properties
function personToNotionProperties(person: Person) {
  return {
    'ID': { rich_text: [{ text: { content: person.id } }] },
    'Name': { title: [{ text: { content: person.name } }] },
    'Email': { email: person.email || null },
    'Department': { rich_text: [{ text: { content: person.department || '' } }] },
    'Position': { rich_text: [{ text: { content: person.position || '' } }] },
    'PC Reference': { rich_text: [{ text: { content: person.pcReference || '' } }] },
    'Created At': person.createdAt ? { date: { start: person.createdAt } } : null,
    'Updated At': person.updatedAt ? { date: { start: person.updatedAt } } : null,
  };
}

// Convert Notion page to Person object
function notionPageToPerson(page: any): Person {
  const properties = page.properties;
  
  return {
    id: getTextProperty(properties['ID']),
    name: getTitleProperty(properties['Name']),
    email: properties['Email']?.email || null,
    department: getTextProperty(properties['Department']) || null,
    position: getTextProperty(properties['Position']) || null,
    pcReference: getTextProperty(properties['PC Reference']) || undefined,
    createdAt: getDateProperty(properties['Created At']) || new Date().toISOString(),
    updatedAt: getDateProperty(properties['Updated At']) || new Date().toISOString(),
  };
}

// Helper functions to extract data from Notion properties
function getTextProperty(property: any): string {
  if (!property || !property.rich_text || property.rich_text.length === 0) {
    return '';
  }
  return property.rich_text.map((rt: any) => rt.text.content).join('');
}

function getTitleProperty(property: any): string {
  if (!property || !property.title || property.title.length === 0) {
    return '';
  }
  return property.title.map((t: any) => t.text.content).join('');
}

function getDateProperty(property: any): string | null {
  if (!property || !property.date || !property.date.start) {
    return null;
  }
  return property.date.start;
}

// Sync all people to Notion
export async function syncPeopleToNotion() {
  try {
    // Create a checkpoint before syncing
    await createCheckpoint();
    
    // Get all people from our system
    const people = await getPeople();
    console.log(`Syncing ${people.length} people to Notion...`);
    
    // Track results
    let created = 0;
    let updated = 0;
    let errors = 0;
    
    // Process each person
    for (const person of people) {
      try {
        // Check if person already exists in Notion by querying for their ID
        const existingPages = await notionClient.databases.query({
          database_id: databaseIds.people as string,
          filter: {
            property: 'ID',
            rich_text: {
              equals: person.id
            }
          }
        });
        
        if (existingPages.results.length > 0) {
          // Update existing page
          const pageId = existingPages.results[0].id;
          await notionClient.pages.update({
            page_id: pageId,
            properties: personToNotionProperties(person)
          });
          updated++;
        } else {
          // Create new page
          await notionClient.pages.create({
            parent: {
              database_id: databaseIds.people as string
            },
            properties: personToNotionProperties(person)
          });
          created++;
        }
      } catch (err) {
        console.error(`Error syncing person ${person.id}:`, err);
        errors++;
      }
      
      // Add a small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 350));
    }
    
    console.log(`People sync complete: ${created} created, ${updated} updated, ${errors} errors`);
    return { created, updated, errors };
  } catch (err) {
    console.error('Error syncing people to Notion:', err);
    throw err;
  }
}

// Get all people from Notion
export async function getPeopleFromNotion(): Promise<Person[]> {
  try {
    const response = await notionClient.databases.query({
      database_id: databaseIds.people as string,
      sorts: [{ property: 'Name', direction: 'ascending' }]
    });
    
    return response.results.map(page => notionPageToPerson(page));
  } catch (err) {
    console.error('Error getting people from Notion:', err);
    throw err;
  }
} 
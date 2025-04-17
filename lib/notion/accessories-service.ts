import { notionClient, databaseIds } from './client';
import { Accessory } from '@/types';
import { createCheckpoint } from './checkpoint';
import fs from 'fs';
import path from 'path';

// Path to the accessories JSON file
const accessoriesDataFilePath = path.join(process.cwd(), 'data', 'accessories.json');

// Read accessories from the JSON file
const getAccessories = async (): Promise<Accessory[]> => {
  try {
    if (!fs.existsSync(accessoriesDataFilePath)) {
      return [];
    }
    const data = await fs.promises.readFile(accessoriesDataFilePath, 'utf8');
    return JSON.parse(data) as Accessory[];
  } catch (error) {
    console.error('Error reading accessories data:', error);
    return [];
  }
};

// Convert Accessory to Notion properties
function accessoryToNotionProperties(accessory: Accessory) {
  return {
    'ID': { rich_text: [{ text: { content: accessory.id } }] },
    'Name': { title: [{ text: { content: accessory.name } }] },
    'Type': { select: { name: accessory.type } },
    'Brand': { rich_text: [{ text: { content: accessory.brand } }] },
    'Price': { number: accessory.price },
    'Price Type': { select: { name: accessory.priceType } },
    'Image': { url: accessory.image || null },
    'Notes': { rich_text: [{ text: { content: accessory.notes || '' } }] },
  };
}

// Convert Notion page to Accessory object
function notionPageToAccessory(page: any): Accessory {
  const properties = page.properties;
  
  return {
    id: getTextProperty(properties['ID']),
    name: getTitleProperty(properties['Name']),
    type: getSelectProperty(properties['Type']) as 'mouse' | 'keyboard' | 'headphone' | 'dock' | 'other',
    brand: getTextProperty(properties['Brand']),
    price: getNumberProperty(properties['Price']),
    priceType: getSelectProperty(properties['Price Type']) as 'HT' | 'TTC',
    image: properties['Image']?.url || undefined,
    notes: getTextProperty(properties['Notes']),
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

function getNumberProperty(property: any): number {
  if (!property || property.number === null || property.number === undefined) {
    return 0;
  }
  return property.number;
}

function getSelectProperty(property: any): string {
  if (!property || !property.select) {
    return '';
  }
  return property.select.name;
}

// Sync all accessories to Notion
export async function syncAccessoriesToNotion() {
  try {
    // Create a checkpoint before syncing
    await createCheckpoint();
    
    // Get all accessories from our system
    const accessories = await getAccessories();
    console.log(`Syncing ${accessories.length} accessories to Notion...`);
    
    // Track results
    let created = 0;
    let updated = 0;
    let errors = 0;
    
    // Process each accessory
    for (const accessory of accessories) {
      try {
        // Check if accessory already exists in Notion by querying for its ID
        const existingPages = await notionClient.databases.query({
          database_id: databaseIds.accessories as string,
          filter: {
            property: 'ID',
            rich_text: {
              equals: accessory.id
            }
          }
        });
        
        if (existingPages.results.length > 0) {
          // Update existing page
          const pageId = existingPages.results[0].id;
          await notionClient.pages.update({
            page_id: pageId,
            properties: accessoryToNotionProperties(accessory)
          });
          updated++;
        } else {
          // Create new page
          await notionClient.pages.create({
            parent: {
              database_id: databaseIds.accessories as string
            },
            properties: accessoryToNotionProperties(accessory)
          });
          created++;
        }
      } catch (err) {
        console.error(`Error syncing accessory ${accessory.id}:`, err);
        errors++;
      }
      
      // Add a small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 350));
    }
    
    console.log(`Accessory sync complete: ${created} created, ${updated} updated, ${errors} errors`);
    return { created, updated, errors };
  } catch (err) {
    console.error('Error syncing accessories to Notion:', err);
    throw err;
  }
}

// Get all accessories from Notion
export async function getAccessoriesFromNotion(): Promise<Accessory[]> {
  try {
    const response = await notionClient.databases.query({
      database_id: databaseIds.accessories as string,
      sorts: [{ property: 'Name', direction: 'ascending' }]
    });
    
    return response.results.map(page => notionPageToAccessory(page));
  } catch (err) {
    console.error('Error getting accessories from Notion:', err);
    throw err;
  }
} 
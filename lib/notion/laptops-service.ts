import { notionClient, databaseIds } from './client';
import { laptopToNotionProperties, notionPageToLaptop } from './mappers';
import { getLaptops } from '@/lib/data-service';
import { createCheckpoint } from './checkpoint';
import { Laptop } from '@/types';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// Sync all laptops to Notion
export async function syncLaptopsToNotion() {
  try {
    // Create a checkpoint before syncing
    await createCheckpoint();
    
    // Get all laptops from our system
    const laptops = await getLaptops();
    console.log(`Syncing ${laptops.length} laptops to Notion...`);
    
    // Track results
    let created = 0;
    let updated = 0;
    let errors = 0;

    // Batch size for processing
    const BATCH_SIZE = 5; // Adjust based on API rate limits
    
    // First, get all existing laptop IDs in one query to reduce API calls
    const existingLaptopIds = await getExistingLaptopIds();
    console.log(`Found ${existingLaptopIds.size} existing laptops in Notion`);
    
    // Process laptops in batches to avoid rate limits but speed up processing
    for (let i = 0; i < laptops.length; i += BATCH_SIZE) {
      const batch = laptops.slice(i, i + BATCH_SIZE);
      
      // Process each batch concurrently
      const batchPromises = batch.map(async (laptop) => {
        try {
          if (existingLaptopIds.has(laptop.id)) {
            // Update existing page
            const pageId = existingLaptopIds.get(laptop.id);
            await notionClient.pages.update({
              page_id: pageId!,
              properties: laptopToNotionProperties(laptop)
            });
            return { status: 'updated' };
          } else {
            // Create new page
            await notionClient.pages.create({
              parent: {
                database_id: databaseIds.laptops as string
              },
              properties: laptopToNotionProperties(laptop)
            });
            return { status: 'created' };
          }
        } catch (err) {
          console.error(`Error syncing laptop ${laptop.id}:`, err);
          return { status: 'error', id: laptop.id, error: err };
        }
      });
      
      // Wait for all operations in this batch to complete
      const results = await Promise.allSettled(batchPromises);
      
      // Count results
      results.forEach(result => {
        if (result.status === 'fulfilled') {
          if (result.value.status === 'created') created++;
          else if (result.value.status === 'updated') updated++;
          else errors++;
        } else {
          errors++;
        }
      });
      
      // Add a small delay between batches to avoid rate limits
      if (i + BATCH_SIZE < laptops.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log(`Laptop sync complete: ${created} created, ${updated} updated, ${errors} errors`);
    return { created, updated, errors };
  } catch (err) {
    console.error('Error syncing laptops to Notion:', err);
    throw err;
  }
}

// Helper function to get all existing laptops in one query
async function getExistingLaptopIds(): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  let startCursor: string | undefined = undefined;
  let hasMore = true;
  
  while (hasMore) {
    const response = await notionClient.databases.query({
      database_id: databaseIds.laptops as string,
      start_cursor: startCursor,
      page_size: 100 // Max allowed by Notion API
    });
    
    response.results.forEach((page: any) => {
      try {
        const id = page.properties.ID.rich_text[0]?.text.content;
        if (id) {
          map.set(id, page.id);
        }
      } catch (error) {
        // Skip pages with missing ID
      }
    });
    
    hasMore = response.has_more;
    startCursor = response.next_cursor || undefined;
  }
  
  return map;
}

// Get all laptops from Notion
export async function getLaptopsFromNotion(): Promise<Laptop[]> {
  try {
    const response = await notionClient.databases.query({
      database_id: databaseIds.laptops as string,
      sorts: [{ property: 'Brand', direction: 'ascending' }]
    });
    
    // Type assertion to avoid type issues
    return response.results.map(page => notionPageToLaptop(page as PageObjectResponse));
  } catch (err) {
    console.error('Error getting laptops from Notion:', err);
    throw err;
  }
}

// Update a specific laptop in Notion
export async function updateLaptopInNotion(laptop: Laptop) {
  try {
    // Find the page ID for this laptop
    const existingPages = await notionClient.databases.query({
      database_id: databaseIds.laptops as string,
      filter: {
        property: 'ID',
        rich_text: {
          equals: laptop.id
        }
      }
    });
    
    if (existingPages.results.length === 0) {
      throw new Error(`Laptop not found in Notion: ${laptop.id}`);
    }
    
    const pageId = existingPages.results[0].id;
    
    // Update the page
    await notionClient.pages.update({
      page_id: pageId,
      properties: laptopToNotionProperties(laptop)
    });
    
    console.log(`Updated laptop in Notion: ${laptop.id}`);
    return true;
  } catch (err) {
    console.error(`Error updating laptop in Notion: ${laptop.id}`, err);
    throw err;
  }
} 
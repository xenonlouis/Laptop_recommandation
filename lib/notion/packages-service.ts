import { notionClient, databaseIds } from './client';
import { Package, PackageStatus } from '@/types';
import { createCheckpoint } from './checkpoint';
import { getPackages } from '@/lib/data-service';

// Convert Package to Notion properties
function packageToNotionProperties(pkg: Package) {
  return {
    'ID': { rich_text: [{ text: { content: pkg.id } }] },
    'Name': { title: [{ text: { content: pkg.name } }] },
    'Status': { select: { name: pkg.status } },
    'Assigned To': { rich_text: [{ text: { content: pkg.assignedTo || '' } }] },
    'Notes': { rich_text: [{ text: { content: pkg.notes || '' } }] },
    'Created At': pkg.createdAt ? { date: { start: pkg.createdAt } } : null,
    'Updated At': pkg.updatedAt ? { date: { start: pkg.updatedAt } } : null,
    'Laptop': { rich_text: [{ text: { content: JSON.stringify({
      id: pkg.laptop.id,
      brand: pkg.laptop.brand,
      model: pkg.laptop.model,
      price: pkg.laptop.price,
      priceType: pkg.laptop.priceType
    }) } }] },
    'Accessories': { rich_text: [{ text: { content: JSON.stringify(
      pkg.accessories.map(acc => ({
        id: acc.id,
        name: acc.name,
        type: acc.type,
        brand: acc.brand,
        price: acc.price,
        priceType: acc.priceType
      }))
    ) } }] },
    'Total Price': { number: calculateTotalPrice(pkg) },
    'Description': { rich_text: [{ text: { content: generatePackageDescription(pkg) } }] },
  };
}

// Convert Notion page to Package object
function notionPageToPackage(page: any): Package {
  const properties = page.properties;
  
  let laptop;
  try {
    laptop = JSON.parse(getTextProperty(properties['Laptop']));
  } catch (e) {
    laptop = { id: '', brand: '', model: '', price: 0, priceType: 'HT' };
  }
  
  let accessories = [];
  try {
    accessories = JSON.parse(getTextProperty(properties['Accessories'])) || [];
  } catch (e) {
    accessories = [];
  }
  
  return {
    id: getTextProperty(properties['ID']),
    name: getTitleProperty(properties['Name']),
    status: getSelectProperty(properties['Status']) as PackageStatus,
    assignedTo: getTextProperty(properties['Assigned To']) || undefined,
    notes: getTextProperty(properties['Notes']) || undefined,
    createdAt: getDateProperty(properties['Created At']) || new Date().toISOString(),
    updatedAt: getDateProperty(properties['Updated At']) || new Date().toISOString(),
    laptop: laptop,
    accessories: accessories,
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

function getSelectProperty(property: any): string {
  if (!property || !property.select) {
    return 'proposed';
  }
  return property.select.name;
}

function getDateProperty(property: any): string | null {
  if (!property || !property.date || !property.date.start) {
    return null;
  }
  return property.date.start;
}

// Calculate the total price of a package
function calculateTotalPrice(pkg: Package): number {
  const laptopPrice = pkg.laptop.price || 0;
  const accessoriesPrice = pkg.accessories.reduce((sum, acc) => sum + (acc.price || 0), 0);
  return laptopPrice + accessoriesPrice;
}

// Generate a description for the package
function generatePackageDescription(pkg: Package): string {
  const laptop = `${pkg.laptop.brand} ${pkg.laptop.model}`;
  const accessories = pkg.accessories.map(acc => acc.name).join(', ');
  
  return `Laptop: ${laptop}\nAccessories: ${accessories || 'None'}\nStatus: ${pkg.status}`;
}

// Sync all packages to Notion
export async function syncPackagesToNotion() {
  try {
    // Create a checkpoint before syncing
    await createCheckpoint();
    
    // Get all packages from our system
    const packages = await getPackages();
    console.log(`Syncing ${packages.length} packages to Notion...`);
    
    // Track results
    let created = 0;
    let updated = 0;
    let errors = 0;
    
    // Process each package
    for (const pkg of packages) {
      try {
        // Check if package already exists in Notion by querying for its ID
        const existingPages = await notionClient.databases.query({
          database_id: databaseIds.packages as string,
          filter: {
            property: 'ID',
            rich_text: {
              equals: pkg.id
            }
          }
        });
        
        if (existingPages.results.length > 0) {
          // Update existing page
          const pageId = existingPages.results[0].id;
          await notionClient.pages.update({
            page_id: pageId,
            properties: packageToNotionProperties(pkg)
          });
          updated++;
        } else {
          // Create new page
          await notionClient.pages.create({
            parent: {
              database_id: databaseIds.packages as string
            },
            properties: packageToNotionProperties(pkg)
          });
          created++;
        }
      } catch (err) {
        console.error(`Error syncing package ${pkg.id}:`, err);
        errors++;
      }
      
      // Add a small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 350));
    }
    
    console.log(`Package sync complete: ${created} created, ${updated} updated, ${errors} errors`);
    return { created, updated, errors };
  } catch (err) {
    console.error('Error syncing packages to Notion:', err);
    throw err;
  }
}

// Get all packages from Notion
export async function getPackagesFromNotion(): Promise<Package[]> {
  try {
    const response = await notionClient.databases.query({
      database_id: databaseIds.packages as string,
      sorts: [{ property: 'Name', direction: 'ascending' }]
    });
    
    return response.results.map(page => notionPageToPackage(page));
  } catch (err) {
    console.error('Error getting packages from Notion:', err);
    throw err;
  }
} 
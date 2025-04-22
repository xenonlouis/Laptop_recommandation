import { getLaptops } from '@/lib/data-service';
import { getAccessories } from '@/lib/data-service';
import { getPackages } from '@/lib/data-service';
import { getPeople } from '@/lib/data-service';
import { getTools } from '@/lib/data-service';
import { getToolkits } from '@/lib/data-service';
import { getLaptopsFromNotion } from './laptops-service';
import { getAccessoriesFromNotion } from './accessories-service';
import { getPackagesFromNotion } from './packages-service';
import { getPeopleFromNotion } from './people-service';
import { Laptop, Accessory, Package, Person, Tool, Toolkit } from '@/types';
import { ToolDetails } from '@/lib/api-client-tools';

// Diff result interface
export interface DiffResult<T> {
  ahead: T[];       // Items in local but not in Notion
  behind: T[];      // Items in Notion but not in local
  modified: {       // Items that exist in both but have differences
    local: T;
    notion: T;
    changes: string[]; // List of changed field names
  }[];
  unchanged: T[];   // Items that are identical
  lastSyncTime?: string; // Last time the sync was performed
}

// Combined diff results for all entity types
export interface SystemDiffResults {
  laptops: DiffResult<Laptop>;
  accessories: DiffResult<Accessory>;
  packages: DiffResult<Package>;
  people: DiffResult<Person>;
  tools?: DiffResult<ToolDetails>;
  toolkits?: DiffResult<Toolkit>;
  lastChecked: string;
}

// Generic diff function that works for any entity type
export async function diffEntities<T extends { id: string }>(
  localEntities: T[],
  notionEntities: T[],
  compareFields: (local: T, notion: T) => string[]
): Promise<DiffResult<T>> {
  // Create maps for faster lookups
  const localMap = new Map<string, T>();
  const notionMap = new Map<string, T>();
  
  localEntities.forEach(item => localMap.set(item.id, item));
  notionEntities.forEach(item => notionMap.set(item.id, item));
  
  // Find items ahead (in local but not in Notion)
  const ahead: T[] = [];
  // Find items behind (in Notion but not in local)
  const behind: T[] = [];
  // Find modified items (existing in both but with differences)
  const modified: { local: T; notion: T; changes: string[] }[] = [];
  // Find unchanged items
  const unchanged: T[] = [];
  
  // Check local entities against Notion
  for (const localItem of localEntities) {
    const notionItem = notionMap.get(localItem.id);
    
    if (!notionItem) {
      // Item exists locally but not in Notion
      ahead.push(localItem);
    } else {
      // Item exists in both, check if they're different
      const changedFields = compareFields(localItem, notionItem);
      
      if (changedFields.length > 0) {
        // There are differences
        modified.push({
          local: localItem,
          notion: notionItem,
          changes: changedFields
        });
      } else {
        // No differences
        unchanged.push(localItem);
      }
    }
  }
  
  // Find items in Notion that don't exist locally
  for (const notionItem of notionEntities) {
    if (!localMap.has(notionItem.id)) {
      behind.push(notionItem);
    }
  }
  
  return {
    ahead,
    behind,
    modified,
    unchanged,
    lastSyncTime: new Date().toISOString()
  };
}

// Function to compare laptops
function compareLaptops(local: Laptop, notion: Laptop): string[] {
  const changedFields: string[] = [];
  
  if (local.brand !== notion.brand) changedFields.push('brand');
  if (local.model !== notion.model) changedFields.push('model');
  if (local.price !== notion.price) changedFields.push('price');
  if (local.processor !== notion.processor) changedFields.push('processor');
  if (local.ram !== notion.ram) changedFields.push('ram');
  if (local.storage !== notion.storage) changedFields.push('storage');
  if (local.batteryLife !== notion.batteryLife) changedFields.push('batteryLife');
  if (local.performanceScore !== notion.performanceScore) changedFields.push('performanceScore');
  if (local.notes !== notion.notes) changedFields.push('notes');
  
  // Compare arrays by converting to strings
  if (JSON.stringify(local.supportedProfiles) !== JSON.stringify(notion.supportedProfiles)) {
    changedFields.push('supportedProfiles');
  }
  
  if (JSON.stringify(local.supportedOS) !== JSON.stringify(notion.supportedOS)) {
    changedFields.push('supportedOS');
  }
  
  if (JSON.stringify(local.images) !== JSON.stringify(notion.images)) {
    changedFields.push('images');
  }
  
  return changedFields;
}

// Function to compare accessories
function compareAccessories(local: Accessory, notion: Accessory): string[] {
  const changedFields: string[] = [];
  
  if (local.name !== notion.name) changedFields.push('name');
  if (local.type !== notion.type) changedFields.push('type');
  if (local.brand !== notion.brand) changedFields.push('brand');
  if (local.price !== notion.price) changedFields.push('price');
  if (local.priceType !== notion.priceType) changedFields.push('priceType');
  if (local.image !== notion.image) changedFields.push('image');
  if (local.notes !== notion.notes) changedFields.push('notes');
  
  return changedFields;
}

// Function to compare packages
function comparePackages(local: Package, notion: Package): string[] {
  const changedFields: string[] = [];
  
  if (local.name !== notion.name) changedFields.push('name');
  if (local.status !== notion.status) changedFields.push('status');
  if (local.priceType !== notion.priceType) changedFields.push('priceType');
  if (local.assignedTo !== notion.assignedTo) changedFields.push('assignedTo');
  if (local.notes !== notion.notes) changedFields.push('notes');
  
  // Comparing nested objects by their IDs
  if (local.laptop?.id !== notion.laptop?.id) changedFields.push('laptop');
  
  // Compare accessories arrays by IDs
  const localAccessoryIds = new Set(local.accessories?.map(a => a.id) || []);
  const notionAccessoryIds = new Set(notion.accessories?.map(a => a.id) || []);
  
  if (localAccessoryIds.size !== notionAccessoryIds.size || 
      ![...localAccessoryIds].every(id => notionAccessoryIds.has(id))) {
    changedFields.push('accessories');
  }
  
  return changedFields;
}

// Function to compare people
function comparePeople(local: Person, notion: Person): string[] {
  const changedFields: string[] = [];
  
  if (local.name !== notion.name) changedFields.push('name');
  if (local.email !== notion.email) changedFields.push('email');
  if (local.department !== notion.department) changedFields.push('department');
  if (local.position !== notion.position) changedFields.push('position');
  if (local.pcReference !== notion.pcReference) changedFields.push('pcReference');
  
  return changedFields;
}

// Function to compare tools
function compareTools(local: ToolDetails, notion: ToolDetails): string[] {
  const changedFields: string[] = [];
  
  if (local.name !== notion.name) changedFields.push('name');
  if (local.description !== notion.description) changedFields.push('description');
  if (local.category !== notion.category) changedFields.push('category');
  if (local.downloadUrl !== notion.downloadUrl) changedFields.push('downloadUrl');
  if (local.installationNotes !== notion.installationNotes) changedFields.push('installationNotes');
  if (local.isRequired !== notion.isRequired) changedFields.push('isRequired');
  if (local.icon !== notion.icon) changedFields.push('icon');
  
  // Compare alternatives arrays
  if (JSON.stringify(local.alternatives) !== JSON.stringify(notion.alternatives)) {
    changedFields.push('alternatives');
  }
  
  return changedFields;
}

// Function to compare toolkits
function compareToolkits(local: Toolkit, notion: Toolkit): string[] {
  const changedFields: string[] = [];
  
  if (local.profileName !== notion.profileName) changedFields.push('profileName');
  if (local.description !== notion.description) changedFields.push('description');
  if (local.operatingSystem !== notion.operatingSystem) changedFields.push('operatingSystem');
  if (local.icon !== notion.icon) changedFields.push('icon');
  
  // Compare tool IDs arrays
  if (JSON.stringify(local.toolIds) !== JSON.stringify(notion.toolIds)) {
    changedFields.push('toolIds');
  }
  
  return changedFields;
}

// Get diff for laptops
export async function diffLaptops(): Promise<DiffResult<Laptop>> {
  const localLaptops = await getLaptops();
  const notionLaptops = await getLaptopsFromNotion();
  return diffEntities(localLaptops, notionLaptops, compareLaptops);
}

// Get diff for accessories
export async function diffAccessories(): Promise<DiffResult<Accessory>> {
  const localAccessories = await getAccessories();
  const notionAccessories = await getAccessoriesFromNotion();
  return diffEntities(localAccessories, notionAccessories, compareAccessories);
}

// Get diff for packages
export async function diffPackages(): Promise<DiffResult<Package>> {
  const localPackages = await getPackages();
  const notionPackages = await getPackagesFromNotion();
  return diffEntities(localPackages, notionPackages, comparePackages);
}

// Get diff for people
export async function diffPeople(): Promise<DiffResult<Person>> {
  const localPeople = await getPeople();
  const notionPeople = await getPeopleFromNotion();
  return diffEntities(localPeople, notionPeople, comparePeople);
}

// Get diffs for all entity types
export async function getDiffStatus(): Promise<SystemDiffResults> {
  // Run all diffs in parallel for better performance
  const [laptopsDiff, accessoriesDiff, packagesDiff, peopleDiff] = await Promise.all([
    diffLaptops(),
    diffAccessories(),
    diffPackages(),
    diffPeople(),
  ]);
  
  // Optional: if tools and toolkits are implemented in Notion
  let toolsDiff = undefined;
  let toolkitsDiff = undefined;

  return {
    laptops: laptopsDiff,
    accessories: accessoriesDiff,
    packages: packagesDiff,
    people: peopleDiff,
    tools: toolsDiff,
    toolkits: toolkitsDiff,
    lastChecked: new Date().toISOString()
  };
} 
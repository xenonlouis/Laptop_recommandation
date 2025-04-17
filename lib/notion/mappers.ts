import { Laptop, Accessory, Package, Person, UserProfile, OperatingSystem, PackageStatus } from '@/types';

// Define a minimal type for Notion page properties
interface NotionPageProperties {
  properties: Record<string, any>;
  id: string;
}

// Laptop mapper
export function laptopToNotionProperties(laptop: Laptop) {
  return {
    'ID': { rich_text: [{ text: { content: laptop.id } }] },
    'Brand': { rich_text: [{ text: { content: laptop.brand } }] },
    'Model': { title: [{ text: { content: laptop.model } }] },
    'Price': { number: laptop.price },
    'Price Type': { select: { name: laptop.priceType } },
    'Processor': { rich_text: [{ text: { content: laptop.processor } }] },
    'RAM (GB)': { rich_text: [{ text: { content: laptop.ram } }] },
    'Storage (GB)': { rich_text: [{ text: { content: laptop.storage } }] },
    'Battery Life (hours)': { number: laptop.batteryLife },
    'Performance Score': { number: laptop.performanceScore },
    'Notes': { rich_text: [{ text: { content: laptop.notes || '' } }] },
    'Supported Profiles': { multi_select: laptop.supportedProfiles.map(profile => ({ name: profile })) },
    'Supported OS': { multi_select: laptop.supportedOS.map(os => ({ name: os })) },
    'Images': { rich_text: [{ text: { content: laptop.images ? JSON.stringify(laptop.images) : '[]' } }] },
  };
}

// Transform Notion page to Laptop object
export function notionPageToLaptop(page: NotionPageProperties): Laptop {
  const properties = page.properties;
  
  return {
    id: getTextProperty(properties['ID']),
    brand: getTextProperty(properties['Brand']),
    model: getTitleProperty(properties['Model']),
    price: getNumberProperty(properties['Price']),
    priceType: getSelectProperty(properties['Price Type']) as 'HT' | 'TTC',
    processor: getTextProperty(properties['Processor']),
    ram: getTextProperty(properties['RAM (GB)']),
    storage: getTextProperty(properties['Storage (GB)']),
    batteryLife: getNumberProperty(properties['Battery Life (hours)']),
    performanceScore: getNumberProperty(properties['Performance Score']),
    notes: getTextProperty(properties['Notes']),
    supportedProfiles: getMultiSelectProperty(properties['Supported Profiles']) as UserProfile[],
    supportedOS: getMultiSelectProperty(properties['Supported OS']) as OperatingSystem[],
    images: JSON.parse(getTextProperty(properties['Images']) || '[]'),
  };
}

// Package mapper
export function packageToNotionProperties(pkg: Package) {
  return {
    'ID': { rich_text: [{ text: { content: pkg.id } }] },
    'Name': { title: [{ text: { content: pkg.name } }] },
    'Status': { select: { name: pkg.status } },
    'Assigned To': { rich_text: [{ text: { content: pkg.assignedTo || '' } }] },
    'Notes': { rich_text: [{ text: { content: pkg.notes || '' } }] },
    'Created At': { date: { start: pkg.createdAt } },
    'Updated At': { date: { start: pkg.updatedAt } },
    'Laptop': { rich_text: [{ text: { content: JSON.stringify(pkg.laptop) } }] },
    'Accessories': { rich_text: [{ text: { content: JSON.stringify(pkg.accessories) } }] },
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

function getMultiSelectProperty(property: any): string[] {
  if (!property || !property.multi_select) {
    return [];
  }
  return property.multi_select.map((option: any) => option.name);
}

function getDateProperty(property: any): string {
  if (!property || !property.date || !property.date.start) {
    return '';
  }
  return property.date.start;
} 
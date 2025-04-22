import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import * as path from 'path';
import { Laptop, Package, Toolkit, Tool, Accessory, Person } from "../types";

// Define data file paths
const LAPTOP_DATA_PATH = path.resolve('data/laptops.json');
const ACCESSORIES_DATA_PATH = path.resolve('data/accessories.json');
const PACKAGES_DATA_PATH = path.resolve('data/packages.json');
const PEOPLE_DATA_PATH = path.resolve('data/people.json');
const TOOLS_DATA_PATH = path.resolve('data/tools.json');
const TOOLKITS_DATA_PATH = path.resolve('data/toolkits.json');

/**
 * Read and parse a JSON file
 */
function readJsonFile<T>(filePath: string): T[] {
  try {
    if (!existsSync(filePath)) {
      console.warn(`File does not exist: ${filePath}`);
      return [];
    }
    
    const data = readFileSync(filePath, 'utf8');
    return JSON.parse(data) as T[];
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

/**
 * Get all laptops from local data file
 */
export function getLaptops(): Laptop[] {
  return readJsonFile<Laptop>(LAPTOP_DATA_PATH);
}

/**
 * Get all accessories from local data file
 */
export function getAccessories(): Accessory[] {
  return readJsonFile<Accessory>(ACCESSORIES_DATA_PATH);
}

/**
 * Get all packages from local data file
 */
export function getPackages(): Package[] {
  return readJsonFile<Package>(PACKAGES_DATA_PATH);
}

/**
 * Get all people from local data file
 */
export function getPeople(): Person[] {
  return readJsonFile<Person>(PEOPLE_DATA_PATH);
}

/**
 * Get all tools from local data file
 */
export function getTools(): Tool[] {
  return readJsonFile<Tool>(TOOLS_DATA_PATH);
}

/**
 * Get all toolkits from local data file
 */
export function getToolkits(): Toolkit[] {
  return readJsonFile<Toolkit>(TOOLKITS_DATA_PATH);
}

/**
 * Get entity by ID from the appropriate data file
 */
export function getEntityById<T extends { id: string }>(entityType: string, id: string): T | null {
  let entities: T[] = [];
  
  switch (entityType.toLowerCase()) {
    case 'laptop':
    case 'laptops':
      entities = readJsonFile<T>(LAPTOP_DATA_PATH);
      break;
    case 'accessory':
    case 'accessories':
      entities = readJsonFile<T>(ACCESSORIES_DATA_PATH);
      break;
    case 'package':
    case 'packages':
      entities = readJsonFile<T>(PACKAGES_DATA_PATH);
      break;
    case 'person':
    case 'people':
      entities = readJsonFile<T>(PEOPLE_DATA_PATH);
      break;
    case 'tool':
    case 'tools':
      entities = readJsonFile<T>(TOOLS_DATA_PATH);
      break;
    case 'toolkit':
    case 'toolkits':
      entities = readJsonFile<T>(TOOLKITS_DATA_PATH);
      break;
    default:
      console.warn(`Unknown entity type: ${entityType}`);
      return null;
  }
  
  const entity = entities.find(e => e.id === id);
  return entity || null;
}

/**
 * Get multiple entities by their IDs
 */
export function getEntitiesByIds<T extends { id: string }>(entityType: string, ids: string[]): T[] {
  let entities: T[] = [];
  
  switch (entityType.toLowerCase()) {
    case 'laptop':
    case 'laptops':
      entities = readJsonFile<T>(LAPTOP_DATA_PATH);
      break;
    case 'accessory':
    case 'accessories':
      entities = readJsonFile<T>(ACCESSORIES_DATA_PATH);
      break;
    case 'package':
    case 'packages':
      entities = readJsonFile<T>(PACKAGES_DATA_PATH);
      break;
    case 'person':
    case 'people':
      entities = readJsonFile<T>(PEOPLE_DATA_PATH);
      break;
    case 'tool':
    case 'tools':
      entities = readJsonFile<T>(TOOLS_DATA_PATH);
      break;
    case 'toolkit':
    case 'toolkits':
      entities = readJsonFile<T>(TOOLKITS_DATA_PATH);
      break;
    default:
      console.warn(`Unknown entity type: ${entityType}`);
      return [];
  }
  
  return entities.filter(e => ids.includes(e.id));
}

// Path to the JSON files
const laptopsDataFilePath = path.join(process.cwd(), "data", "laptops.json")
const packagesDataFilePath = path.join(process.cwd(), "data", "packages.json")
const toolkitsDataFilePath = path.join(process.cwd(), "data", "toolkits.json")
const toolsDataFilePath = path.join(process.cwd(), "data", "tools.json")

// Ensure the data directory exists
const ensureDataDirectoryExists = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true })
  }
}

// Create an empty JSON file if it doesn't exist
const ensureDataFileExists = (filePath: string, initialData: any[] = []) => {
  ensureDataDirectoryExists()
  if (!existsSync(filePath)) {
    writeFileSync(filePath, JSON.stringify(initialData, null, 2), "utf8")
  }
}

// Read laptops from the JSON file
export const getLaptopsFromJson = async (): Promise<Laptop[]> => {
  try {
    ensureDataFileExists(laptopsDataFilePath)
    const data = await readFile(laptopsDataFilePath, "utf8")
    return JSON.parse(data) as Laptop[]
  } catch (error) {
    console.error("Error reading laptops data:", error)
    return []
  }
}

// Get a single laptop by ID
export const getLaptopById = async (id: string): Promise<Laptop | null> => {
  try {
    const laptops = await getLaptopsFromJson()
    return laptops.find((laptop) => laptop.id === id) || null
  } catch (error) {
    console.error(`Error getting laptop with ID ${id}:`, error)
    return null
  }
}

// Read packages from the JSON file
export const getPackagesFromJson = async (): Promise<Package[]> => {
  try {
    ensureDataFileExists(packagesDataFilePath)
    
    const data = await readFile(packagesDataFilePath, "utf8")
    const packages = JSON.parse(data) as Package[]
    
    // Add default priceType if missing
    return packages.map(pkg => ({
      ...pkg,
      priceType: pkg.priceType || "HT" // Default to HT if not specified
    }))
  } catch (error) {
    console.error("Error reading packages data:", error)
    return []
  }
}

// Get a single package by ID
export const getPackageById = async (id: string): Promise<Package | null> => {
  try {
    const packages = await getPackagesFromJson()
    return packages.find((pkg) => pkg.id === id) || null
  } catch (error) {
    console.error(`Error getting package with ID ${id}:`, error)
    return null
  }
}

// Update a package
export const updatePackage = async (updatedPackage: Package): Promise<boolean> => {
  try {
    const packages = await getPackagesFromJson()
    const index = packages.findIndex((pkg) => pkg.id === updatedPackage.id)

    if (index === -1) {
      return false // Package not found
    }

    packages[index] = updatedPackage
    return await savePackages(packages)
  } catch (error) {
    console.error(`Error updating package with ID ${updatedPackage.id}:`, error)
    return false
  }
}

// Add a new package
export const addPackage = async (newPackage: Omit<Package, "id">): Promise<boolean> => {
  try {
    const packages = await getPackagesFromJson()
    
    // Generate a random ID
    const packageWithId = {
      ...newPackage,
      id: Math.random().toString(36).substring(2, 9)
    } as Package
    
    packages.push(packageWithId)
    return await savePackages(packages)
  } catch (error) {
    console.error("Error adding package:", error)
    return false
  }
}

// Save packages to JSON file
export const savePackages = async (packages: Package[]): Promise<boolean> => {
  try {
    ensureDataDirectoryExists()
    await writeFile(packagesDataFilePath, JSON.stringify(packages, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error saving packages data:", error)
    return false
  }
}

// Save laptops to the JSON file
export const saveLaptops = async (laptops: Laptop[]): Promise<boolean> => {
  try {
    ensureDataDirectoryExists()
    await writeFile(laptopsDataFilePath, JSON.stringify(laptops, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error saving laptops data:", error)
    return false
  }
}

// Add a new laptop
export const addLaptop = async (laptop: Laptop): Promise<boolean> => {
  try {
    const laptops = await getLaptopsFromJson()

    // Generate a unique ID if not provided
    if (!laptop.id) {
      laptop.id = Math.random().toString(36).substring(2, 9)
    }

    laptops.push(laptop)
    return await saveLaptops(laptops)
  } catch (error) {
    console.error("Error adding laptop:", error)
    return false
  }
}

// Update an existing laptop
export const updateLaptop = async (updatedLaptop: Laptop): Promise<boolean> => {
  try {
    const laptops = await getLaptopsFromJson()
    const index = laptops.findIndex((laptop) => laptop.id === updatedLaptop.id)

    if (index === -1) {
      return false // Laptop not found
    }

    laptops[index] = updatedLaptop
    return await saveLaptops(laptops)
  } catch (error) {
    console.error(`Error updating laptop with ID ${updatedLaptop.id}:`, error)
    return false
  }
}

// Delete a laptop
export const deleteLaptop = async (id: string): Promise<boolean> => {
  try {
    const laptops = await getLaptopsFromJson()
    const filteredLaptops = laptops.filter((laptop) => laptop.id !== id)

    if (filteredLaptops.length === laptops.length) {
      return false // Laptop not found
    }

    return await saveLaptops(filteredLaptops)
  } catch (error) {
    console.error(`Error deleting laptop with ID ${id}:`, error)
    return false
  }
}

// Get all toolkits
export const getToolkitsFromJson = async (): Promise<Toolkit[]> => {
  try {
    ensureDataFileExists(toolkitsDataFilePath)
    const data = await readFile(toolkitsDataFilePath, "utf8")
    return JSON.parse(data) as Toolkit[]
  } catch (error) {
    console.error("Error reading toolkits data:", error)
    return []
  }
}

// Get toolkit by ID
export const getToolkitById = async (id: string): Promise<Toolkit | null> => {
  try {
    const toolkits = await getToolkitsFromJson()
    return toolkits.find(toolkit => toolkit.id === id) || null
  } catch (error) {
    console.error("Error getting toolkit by id:", error)
    return null
  }
}

// Get toolkits by profile name
export const getToolkitsByProfile = async (profileName: string): Promise<Toolkit[]> => {
  try {
    const toolkits = await getToolkitsFromJson()
    return toolkits.filter(toolkit => toolkit.profileName === profileName)
  } catch (error) {
    console.error("Error getting toolkit by profile:", error)
    return []
  }
}

// Add new toolkit
export const addToolkit = async (toolkit: Omit<Toolkit, "id">): Promise<Toolkit> => {
  try {
    const toolkits = await getToolkitsFromJson()
    
    // Generate a simple ID
    const newId = `${toolkit.profileName.toLowerCase().replace(/\s+/g, '-')}-${toolkit.operatingSystem}-${Date.now().toString(36)}`
    
    const newToolkit: Toolkit = {
      ...toolkit,
      id: newId
    }
    
    toolkits.push(newToolkit)
    await saveToolkits(toolkits)
    
    return newToolkit
  } catch (error) {
    console.error("Error adding toolkit:", error)
    throw error
  }
}

// Update toolkit
export const updateToolkit = async (updatedToolkit: Toolkit): Promise<boolean> => {
  try {
    const toolkits = await getToolkitsFromJson()
    const index = toolkits.findIndex(toolkit => toolkit.id === updatedToolkit.id)
    
    if (index === -1) {
      return false
    }
    
    toolkits[index] = updatedToolkit
    return await saveToolkits(toolkits)
  } catch (error) {
    console.error("Error updating toolkit:", error)
    return false
  }
}

// Delete toolkit
export const deleteToolkit = async (id: string): Promise<boolean> => {
  try {
    const toolkits = await getToolkitsFromJson()
    const filteredToolkits = toolkits.filter(toolkit => toolkit.id !== id)
    
    if (filteredToolkits.length === toolkits.length) {
      return false // No toolkit was removed
    }
    
    return await saveToolkits(filteredToolkits)
  } catch (error) {
    console.error("Error deleting toolkit:", error)
    return false
  }
}

// Save toolkits
export const saveToolkits = async (toolkits: Toolkit[]): Promise<boolean> => {
  try {
    ensureDataDirectoryExists()
    await writeFile(toolkitsDataFilePath, JSON.stringify(toolkits, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error saving toolkits data:", error)
    return false
  }
}

// Get all tools
export const getToolsFromJson = async (): Promise<Tool[]> => {
  try {
    ensureDataFileExists(toolsDataFilePath)
    const data = await readFile(toolsDataFilePath, "utf8")
    return JSON.parse(data) as Tool[]
  } catch (error) {
    console.error("Error reading tools data:", error)
    return []
  }
}

// Get a single tool by ID
export const getToolById = async (id: string): Promise<Tool | null> => {
  try {
    const tools = await getToolsFromJson()
    return tools.find((tool) => tool.id === id) || null
  } catch (error) {
    console.error(`Error getting tool with ID ${id}:`, error)
    return null
  }
}

// Get tools by category
export const getToolsByCategory = async (category: string): Promise<Tool[]> => {
  try {
    const tools = await getToolsFromJson()
    return tools.filter((tool) => tool.category === category)
  } catch (error) {
    console.error(`Error getting tools for category ${category}:`, error)
    return []
  }
}

// Get popular tools
export const getPopularTools = async (limit: number = 10): Promise<Tool[]> => {
  try {
    const tools = await getToolsFromJson()
    return [...tools]
      .sort((a, b) => {
        return (b.popularity ?? 0) - (a.popularity ?? 0);
      })
      .slice(0, limit)
  } catch (error) {
    console.error("Error getting popular tools:", error)
    return []
  }
}

// Save tools to JSON file
export const saveTools = async (tools: Tool[]): Promise<boolean> => {
  try {
    ensureDataDirectoryExists()
    await writeFile(toolsDataFilePath, JSON.stringify(tools, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error saving tools data:", error)
    return false
  }
}

// Add a new tool
export const addTool = async (tool: Omit<Tool, "id" | "createdAt" | "updatedAt" | "usageCount" | "popularity">): Promise<Tool> => {
  try {
    const tools = await getToolsFromJson()
    
    // Create a new tool with required fields
    const newTool: Tool = {
      ...tool,
      id: `tool-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 0,
      popularity: 0
    }
    
    tools.push(newTool)
    await saveTools(tools)
    
    return newTool
  } catch (error) {
    console.error("Error adding tool:", error)
    throw error
  }
}

// Update a tool
export const updateTool = async (updatedTool: Tool): Promise<boolean> => {
  try {
    const tools = await getToolsFromJson()
    const index = tools.findIndex((tool) => tool.id === updatedTool.id)
    
    if (index === -1) {
      return false
    }
    
    // Preserve usage data but update timestamp
    tools[index] = {
      ...updatedTool,
      updatedAt: new Date().toISOString()
    }
    
    return await saveTools(tools)
  } catch (error) {
    console.error(`Error updating tool with ID ${updatedTool.id}:`, error)
    return false
  }
}

// Delete a tool
export const deleteTool = async (id: string): Promise<boolean> => {
  try {
    const tools = await getToolsFromJson()
    const filteredTools = tools.filter((tool) => tool.id !== id)
    
    if (filteredTools.length === tools.length) {
      return false
    }
    
    return await saveTools(filteredTools)
  } catch (error) {
    console.error(`Error deleting tool with ID ${id}:`, error)
    return false
  }
}

// Track tool usage
export const trackToolUsage = async (id: string): Promise<boolean> => {
  try {
    const tools = await getToolsFromJson()
    const index = tools.findIndex((tool) => tool.id === id)
    
    if (index === -1) {
      return false
    }
    
    // Increment usage count and recalculate popularity (0-10 scale)
    tools[index].usageCount = (tools[index].usageCount ?? 0) + 1
    
    // Find max usage count to scale popularity
    const maxUsage = Math.max(...tools.map(t => t.usageCount ?? 0))
    
    // Update popularity if we have usage data
    if (maxUsage > 0) {
      tools[index].popularity = Math.min(10, Math.round(((tools[index].usageCount ?? 0) / maxUsage) * 10))
    }
    
    return await saveTools(tools)
  } catch (error) {
    console.error(`Error tracking usage for tool ${id}:`, error)
    return false
  }
}


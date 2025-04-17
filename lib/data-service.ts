import fs from "fs"
import path from "path"
import type { Laptop, Package, Toolkit } from "@/types"

// Path to the JSON files
const laptopsDataFilePath = path.join(process.cwd(), "data", "laptops.json")
const packagesDataFilePath = path.join(process.cwd(), "data", "packages.json")
const toolkitsDataFilePath = path.join(process.cwd(), "data", "toolkits.json")

// Ensure the data directory exists
const ensureDataDirectoryExists = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Create an empty JSON file if it doesn't exist
const ensureDataFileExists = (filePath: string, initialData: any[] = []) => {
  ensureDataDirectoryExists()
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2), "utf8")
  }
}

// Read laptops from the JSON file
export const getLaptops = async (): Promise<Laptop[]> => {
  try {
    ensureDataFileExists(laptopsDataFilePath)
    const data = await fs.promises.readFile(laptopsDataFilePath, "utf8")
    return JSON.parse(data) as Laptop[]
  } catch (error) {
    console.error("Error reading laptops data:", error)
    return []
  }
}

// Get a single laptop by ID
export const getLaptopById = async (id: string): Promise<Laptop | null> => {
  try {
    const laptops = await getLaptops()
    return laptops.find((laptop) => laptop.id === id) || null
  } catch (error) {
    console.error(`Error getting laptop with ID ${id}:`, error)
    return null
  }
}

// Read packages from the JSON file
export const getPackages = async (): Promise<Package[]> => {
  try {
    ensureDataFileExists(packagesDataFilePath)
    
    const data = await fs.promises.readFile(packagesDataFilePath, "utf8")
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
    const packages = await getPackages()
    return packages.find((pkg) => pkg.id === id) || null
  } catch (error) {
    console.error(`Error getting package with ID ${id}:`, error)
    return null
  }
}

// Update a package
export const updatePackage = async (updatedPackage: Package): Promise<boolean> => {
  try {
    const packages = await getPackages()
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
    const packages = await getPackages()
    
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
    await fs.promises.writeFile(packagesDataFilePath, JSON.stringify(packages, null, 2), "utf8")
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
    await fs.promises.writeFile(laptopsDataFilePath, JSON.stringify(laptops, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error saving laptops data:", error)
    return false
  }
}

// Add a new laptop
export const addLaptop = async (laptop: Laptop): Promise<boolean> => {
  try {
    const laptops = await getLaptops()

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
    const laptops = await getLaptops()
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
    const laptops = await getLaptops()
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
export const getToolkits = async (): Promise<Toolkit[]> => {
  try {
    ensureDataFileExists(toolkitsDataFilePath)
    const data = await fs.promises.readFile(toolkitsDataFilePath, "utf8")
    return JSON.parse(data) as Toolkit[]
  } catch (error) {
    console.error("Error reading toolkits data:", error)
    return []
  }
}

// Get toolkit by ID
export const getToolkitById = async (id: string): Promise<Toolkit | null> => {
  try {
    const toolkits = await getToolkits()
    return toolkits.find(toolkit => toolkit.id === id) || null
  } catch (error) {
    console.error("Error getting toolkit by id:", error)
    return null
  }
}

// Get toolkits by profile name
export const getToolkitsByProfile = async (profileName: string): Promise<Toolkit[]> => {
  try {
    const toolkits = await getToolkits()
    return toolkits.filter(toolkit => toolkit.profileName === profileName)
  } catch (error) {
    console.error("Error getting toolkit by profile:", error)
    return []
  }
}

// Add new toolkit
export const addToolkit = async (toolkit: Omit<Toolkit, "id">): Promise<Toolkit> => {
  try {
    const toolkits = await getToolkits()
    
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
    const toolkits = await getToolkits()
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
    const toolkits = await getToolkits()
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
    ensureDataFileExists(toolkitsDataFilePath)
    await fs.promises.writeFile(toolkitsDataFilePath, JSON.stringify(toolkits, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error saving toolkits:", error)
    return false
  }
}


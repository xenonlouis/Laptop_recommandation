import fs from "fs"
import path from "path"
import type { Laptop } from "@/types"

// Path to the JSON file
const dataFilePath = path.join(process.cwd(), "data", "laptops.json")

// Ensure the data directory exists
const ensureDataDirectoryExists = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Create an empty JSON file if it doesn't exist
const ensureDataFileExists = () => {
  ensureDataDirectoryExists()
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2), "utf8")
  }
}

// Read laptops from the JSON file
export const getLaptops = async (): Promise<Laptop[]> => {
  try {
    ensureDataFileExists()
    const data = await fs.promises.readFile(dataFilePath, "utf8")
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

// Save laptops to the JSON file
export const saveLaptops = async (laptops: Laptop[]): Promise<boolean> => {
  try {
    ensureDataDirectoryExists()
    await fs.promises.writeFile(dataFilePath, JSON.stringify(laptops, null, 2), "utf8")
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


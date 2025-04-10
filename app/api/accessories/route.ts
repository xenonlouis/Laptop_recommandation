import { type NextRequest, NextResponse } from "next/server"
import type { Accessory } from "@/types"
import fs from "fs"
import path from "path"

const accessoriesDataFilePath = path.join(process.cwd(), "data", "accessories.json")

// Ensure the data directory exists
const ensureDataDirectoryExists = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Ensure the accessories file exists
const ensureAccessoriesFileExists = () => {
  ensureDataDirectoryExists()
  if (!fs.existsSync(accessoriesDataFilePath)) {
    fs.writeFileSync(accessoriesDataFilePath, JSON.stringify([], null, 2), "utf8")
  }
}

// GET /api/accessories - Get all accessories
export async function GET() {
  try {
    ensureAccessoriesFileExists()
    const data = await fs.promises.readFile(accessoriesDataFilePath, "utf8")
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    console.error("Error fetching accessories:", error)
    return NextResponse.json({ error: "Failed to fetch accessories" }, { status: 500 })
  }
}

// POST /api/accessories - Add a new accessory
export async function POST(request: NextRequest) {
  try {
    ensureAccessoriesFileExists()
    const accessoryData = (await request.json()) as Omit<Accessory, "id">

    // Validate required fields
    if (!accessoryData.name || !accessoryData.type || !accessoryData.brand) {
      return NextResponse.json({ error: "Name, type, and brand are required" }, { status: 400 })
    }

    // Read existing accessories
    const data = await fs.promises.readFile(accessoriesDataFilePath, "utf8")
    const accessories = JSON.parse(data) as Accessory[]

    // Create a new accessory with ID
    const newAccessory = {
      ...accessoryData,
      id: Math.random().toString(36).substring(2, 9)
    }

    // Add to accessories array
    accessories.push(newAccessory)

    // Save to file
    await fs.promises.writeFile(accessoriesDataFilePath, JSON.stringify(accessories, null, 2), "utf8")

    return NextResponse.json({ message: "Accessory added successfully", accessory: newAccessory }, { status: 201 })
  } catch (error) {
    console.error("Error adding accessory:", error)
    return NextResponse.json({ error: "Failed to add accessory" }, { status: 500 })
  }
} 
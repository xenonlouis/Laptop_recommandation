import { type NextRequest, NextResponse } from "next/server"
import type { Accessory } from "@/types"
import fs from "fs"
import path from "path"

const accessoriesDataFilePath = path.join(process.cwd(), "data", "accessories.json")

interface Params {
  id: string
}

// Helper function to read accessories
const getAccessories = async (): Promise<Accessory[]> => {
  try {
    if (!fs.existsSync(accessoriesDataFilePath)) {
      return []
    }
    const data = await fs.promises.readFile(accessoriesDataFilePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading accessories:", error)
    return []
  }
}

// GET /api/accessories/:id - Get a single accessory by ID
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params
    const accessories = await getAccessories()
    const accessory = accessories.find((acc) => acc.id === id)

    if (accessory) {
      return NextResponse.json(accessory)
    } else {
      return NextResponse.json({ error: "Accessory not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error fetching accessory:", error)
    return NextResponse.json({ error: "Failed to fetch accessory" }, { status: 500 })
  }
}

// PUT /api/accessories/:id - Update an accessory
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params
    const accessoryData = (await request.json()) as Accessory

    if (id !== accessoryData.id) {
      return NextResponse.json({ error: "Accessory ID mismatch" }, { status: 400 })
    }

    const accessories = await getAccessories()
    const index = accessories.findIndex((acc) => acc.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "Accessory not found" }, { status: 404 })
    }

    // Update the accessory
    accessories[index] = accessoryData

    // Save to file
    await fs.promises.writeFile(accessoriesDataFilePath, JSON.stringify(accessories, null, 2), "utf8")

    return NextResponse.json({ message: "Accessory updated successfully" })
  } catch (error) {
    console.error("Error updating accessory:", error)
    return NextResponse.json({ error: "Failed to update accessory" }, { status: 500 })
  }
}

// DELETE /api/accessories/:id - Delete an accessory
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params
    const accessories = await getAccessories()
    const filteredAccessories = accessories.filter((acc) => acc.id !== id)

    if (filteredAccessories.length === accessories.length) {
      return NextResponse.json({ error: "Accessory not found" }, { status: 404 })
    }

    // Save to file
    await fs.promises.writeFile(accessoriesDataFilePath, JSON.stringify(filteredAccessories, null, 2), "utf8")

    return NextResponse.json({ message: "Accessory deleted successfully" })
  } catch (error) {
    console.error("Error deleting accessory:", error)
    return NextResponse.json({ error: "Failed to delete accessory" }, { status: 500 })
  }
} 
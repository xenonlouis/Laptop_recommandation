import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"

const prisma = new PrismaClient()

// GET /api/accessories - Get all accessories
export async function GET() {
  try {
    const accessories = await prisma.accessory.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    // Convert Decimal types to numbers for JSON serialization
    const serializedAccessories = accessories.map(accessory => ({
      ...accessory,
      price: Number(accessory.price)
    }))

    return NextResponse.json(serializedAccessories)
  } catch (error) {
    console.error("Error fetching accessories:", error)
    return NextResponse.json({ error: "Failed to fetch accessories" }, { status: 500 })
  }
}

// POST /api/accessories - Add a new accessory
export async function POST(request: NextRequest) {
  try {
    const accessoryData = await request.json()

    // Validate required fields
    if (!accessoryData.name || !accessoryData.type || !accessoryData.brand) {
      return NextResponse.json({ error: "Name, type, and brand are required" }, { status: 400 })
    }

    // Create new accessory in database
    const newAccessory = await prisma.accessory.create({
      data: {
        name: accessoryData.name,
        type: accessoryData.type,
        brand: accessoryData.brand,
        price: accessoryData.price || 0,
        priceType: accessoryData.priceType || 'HT',
        image: accessoryData.image || '',
        notes: accessoryData.notes || ''
      }
    })

    return NextResponse.json({ 
      message: "Accessory added successfully", 
      accessory: {
        ...newAccessory,
        price: Number(newAccessory.price)
      }
    }, { status: 201 })
  } catch (error) {
    console.error("Error adding accessory:", error)
    return NextResponse.json({ error: "Failed to add accessory" }, { status: 500 })
  }
} 
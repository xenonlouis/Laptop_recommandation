import { type NextRequest, NextResponse } from "next/server"
import { getLaptops, addLaptop } from "@/lib/data-service"
import type { Laptop } from "@/types"

// GET /api/laptops - Get all laptops
export async function GET() {
  try {
    const laptops = await getLaptops()
    return NextResponse.json(laptops)
  } catch (error) {
    console.error("Error fetching laptops:", error)
    return NextResponse.json({ error: "Failed to fetch laptops" }, { status: 500 })
  }
}

// POST /api/laptops - Add a new laptop
export async function POST(request: NextRequest) {
  try {
    const laptop = (await request.json()) as Laptop

    // Validate required fields
    if (!laptop.brand || !laptop.model) {
      return NextResponse.json({ error: "Brand and model are required" }, { status: 400 })
    }

    const success = await addLaptop(laptop)

    if (success) {
      return NextResponse.json({ message: "Laptop added successfully" }, { status: 201 })
    } else {
      return NextResponse.json({ error: "Failed to add laptop" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error adding laptop:", error)
    return NextResponse.json({ error: "Failed to add laptop" }, { status: 500 })
  }
}


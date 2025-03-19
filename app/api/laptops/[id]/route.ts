import { type NextRequest, NextResponse } from "next/server"
import { getLaptopById, updateLaptop, deleteLaptop } from "@/lib/data-service"
import type { Laptop } from "@/types"

// GET /api/laptops/[id] - Get a laptop by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const laptop = await getLaptopById(id)

    if (!laptop) {
      return NextResponse.json({ error: "Laptop not found" }, { status: 404 })
    }

    return NextResponse.json(laptop)
  } catch (error) {
    console.error(`Error fetching laptop with ID ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch laptop" }, { status: 500 })
  }
}

// PUT /api/laptops/[id] - Update a laptop
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const updatedData = (await request.json()) as Laptop

    // Ensure the ID in the URL matches the ID in the request body
    if (updatedData.id && updatedData.id !== id) {
      return NextResponse.json({ error: "ID mismatch between URL and request body" }, { status: 400 })
    }

    // Set the ID from the URL
    updatedData.id = id

    const success = await updateLaptop(updatedData)

    if (success) {
      return NextResponse.json({ message: "Laptop updated successfully" })
    } else {
      return NextResponse.json({ error: "Laptop not found or update failed" }, { status: 404 })
    }
  } catch (error) {
    console.error(`Error updating laptop with ID ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update laptop" }, { status: 500 })
  }
}

// DELETE /api/laptops/[id] - Delete a laptop
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const success = await deleteLaptop(id)

    if (success) {
      return NextResponse.json({ message: "Laptop deleted successfully" })
    } else {
      return NextResponse.json({ error: "Laptop not found or delete failed" }, { status: 404 })
    }
  } catch (error) {
    console.error(`Error deleting laptop with ID ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete laptop" }, { status: 500 })
  }
}


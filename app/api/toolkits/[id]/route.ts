import { type NextRequest, NextResponse } from "next/server"
import { getToolkitById, updateToolkit, deleteToolkit } from "@/lib/data-service"
import type { Toolkit } from "@/types"

interface Params {
  id: string
}

// GET /api/toolkits/:id - Get a single toolkit
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const toolkit = await getToolkitById(id)

    if (toolkit) {
      return NextResponse.json(toolkit)
    } else {
      return NextResponse.json({ error: "Toolkit not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error fetching toolkit:", error)
    return NextResponse.json({ error: "Failed to fetch toolkit" }, { status: 500 })
  }
}

// PUT /api/toolkits/:id - Update a toolkit
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const toolkitData = (await request.json()) as Toolkit

    if (id !== toolkitData.id) {
      return NextResponse.json({ error: "Toolkit ID mismatch" }, { status: 400 })
    }

    const existingToolkit = await getToolkitById(id)
    if (!existingToolkit) {
      return NextResponse.json({ error: "Toolkit not found" }, { status: 404 })
    }

    const success = await updateToolkit(toolkitData)

    if (success) {
      return NextResponse.json({ message: "Toolkit updated successfully" })
    } else {
      return NextResponse.json({ error: "Failed to update toolkit" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error updating toolkit:", error)
    return NextResponse.json({ error: "Failed to update toolkit" }, { status: 500 })
  }
}

// DELETE /api/toolkits/:id - Delete a toolkit
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    const success = await deleteToolkit(id)

    if (success) {
      return NextResponse.json({ message: "Toolkit deleted successfully" })
    } else {
      return NextResponse.json({ error: "Toolkit not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error deleting toolkit:", error)
    return NextResponse.json({ error: "Failed to delete toolkit" }, { status: 500 })
  }
} 
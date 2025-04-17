import { type NextRequest, NextResponse } from "next/server"
import { getToolById, updateTool, deleteTool } from "@/lib/data-service"

interface RouteParams {
  params: {
    id: string
  }
}

// GET /api/tools/[id] - Get a specific tool
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params
    const tool = await getToolById(id)

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 })
    }

    return NextResponse.json(tool)
  } catch (error) {
    console.error(`Error fetching tool with ID ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch tool" }, { status: 500 })
  }
}

// PUT /api/tools/[id] - Update a specific tool
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params
    const tool = await getToolById(id)

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 })
    }

    const toolData = await request.json()
    const updatedTool = {
      ...tool,
      ...toolData,
      id,
      updatedAt: new Date().toISOString()
    }

    const success = await updateTool(updatedTool)

    if (success) {
      return NextResponse.json({ message: "Tool updated successfully" })
    } else {
      return NextResponse.json({ error: "Failed to update tool" }, { status: 500 })
    }
  } catch (error) {
    console.error(`Error updating tool with ID ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update tool" }, { status: 500 })
  }
}

// DELETE /api/tools/[id] - Delete a specific tool
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params
    const tool = await getToolById(id)

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 })
    }

    const success = await deleteTool(id)

    if (success) {
      return NextResponse.json({ message: "Tool deleted successfully" })
    } else {
      return NextResponse.json({ error: "Failed to delete tool" }, { status: 500 })
    }
  } catch (error) {
    console.error(`Error deleting tool with ID ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete tool" }, { status: 500 })
  }
} 
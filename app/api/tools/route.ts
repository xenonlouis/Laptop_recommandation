import { type NextRequest, NextResponse } from "next/server"
import { getTools, addTool } from "@/lib/data-service"
import type { Tool } from "@/lib/api-client-tools"

// GET /api/tools - Get all tools
export async function GET() {
  try {
    const tools = await getTools()
    return NextResponse.json(tools)
  } catch (error) {
    console.error("Error fetching tools:", error)
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 })
  }
}

// POST /api/tools - Add a new tool
export async function POST(request: NextRequest) {
  try {
    const toolData = await request.json()

    // Validate required fields
    if (!toolData.name || !toolData.category) {
      return NextResponse.json({ error: "Name and category are required" }, { status: 400 })
    }

    // Add the tool
    const tool = await addTool(toolData)
    
    return NextResponse.json({ 
      message: "Tool added successfully", 
      tool 
    }, { status: 201 })
  } catch (error) {
    console.error("Error adding tool:", error)
    return NextResponse.json({ error: "Failed to add tool" }, { status: 500 })
  }
} 
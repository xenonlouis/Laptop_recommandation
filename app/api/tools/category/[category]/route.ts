import { type NextRequest, NextResponse } from "next/server"
import { getToolsByCategory } from "@/lib/data-service"

interface Params {
  category: string
}

// GET /api/tools/category/:category - Get tools by category
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const { category } = params
    const decodedCategory = decodeURIComponent(category)
    
    const tools = await getToolsByCategory(decodedCategory)
    
    return NextResponse.json(tools)
  } catch (error) {
    console.error("Error fetching tools by category:", error)
    return NextResponse.json({ error: "Failed to fetch tools by category" }, { status: 500 })
  }
} 
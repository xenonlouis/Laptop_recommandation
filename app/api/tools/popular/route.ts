import { type NextRequest, NextResponse } from "next/server"
import { getPopularTools } from "@/lib/data-service"

// GET /api/tools/popular - Get popular tools
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const limit = url.searchParams.get("limit") ? parseInt(url.searchParams.get("limit")!) : 10
    
    const tools = await getPopularTools(limit)
    
    return NextResponse.json(tools)
  } catch (error) {
    console.error("Error fetching popular tools:", error)
    return NextResponse.json({ error: "Failed to fetch popular tools" }, { status: 500 })
  }
} 
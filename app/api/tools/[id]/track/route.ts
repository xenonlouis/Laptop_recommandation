import { type NextRequest, NextResponse } from "next/server"
import { trackToolUsage } from "@/lib/data-service"

interface Params {
  id: string
}

// POST /api/tools/:id/track - Track tool usage
export async function POST(request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params
    
    const success = await trackToolUsage(id)

    if (success) {
      return NextResponse.json({ message: "Tool usage tracked successfully" })
    } else {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error tracking tool usage:", error)
    return NextResponse.json({ error: "Failed to track tool usage" }, { status: 500 })
  }
} 
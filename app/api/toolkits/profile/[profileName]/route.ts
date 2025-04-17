import { type NextRequest, NextResponse } from "next/server"
import { getToolkitsByProfile } from "@/lib/data-service"

interface Params {
  profileName: string
}

// GET /api/toolkits/profile/:profileName - Get toolkits by profile name
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const { profileName } = params
    const decodedProfileName = decodeURIComponent(profileName)
    const toolkits = await getToolkitsByProfile(decodedProfileName)

    return NextResponse.json(toolkits)
  } catch (error) {
    console.error("Error fetching toolkits by profile:", error)
    return NextResponse.json({ error: "Failed to fetch toolkits by profile" }, { status: 500 })
  }
} 
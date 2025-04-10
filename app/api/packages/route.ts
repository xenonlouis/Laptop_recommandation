import { type NextRequest, NextResponse } from "next/server"
import { getPackages, addPackage } from "@/lib/data-service"
import type { Package } from "@/types"

// GET /api/packages - Get all packages
export async function GET() {
  try {
    const packages = await getPackages()
    return NextResponse.json(packages)
  } catch (error) {
    console.error("Error fetching packages:", error)
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 })
  }
}

// POST /api/packages - Add a new package
export async function POST(request: NextRequest) {
  try {
    const packageData = (await request.json()) as Omit<Package, "id">

    // Validate required fields
    if (!packageData.name || !packageData.laptop) {
      return NextResponse.json({ error: "Name and laptop are required" }, { status: 400 })
    }

    const success = await addPackage(packageData)

    if (success) {
      return NextResponse.json({ message: "Package added successfully" }, { status: 201 })
    } else {
      return NextResponse.json({ error: "Failed to add package" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error adding package:", error)
    return NextResponse.json({ error: "Failed to add package" }, { status: 500 })
  }
} 
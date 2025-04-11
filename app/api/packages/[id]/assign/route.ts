import { type NextRequest, NextResponse } from "next/server"
import { getPackageById, updatePackage } from "@/lib/data-service"
import type { Package } from "@/types"

interface Params {
  id: string
}

// POST /api/packages/:id/assign - Assign a package to a person
export async function POST(request: NextRequest, { params }: { params: Params }) {
  try {
    const id = params.id
    const { assignedTo } = await request.json()

    if (!assignedTo) {
      return NextResponse.json({ error: "assignedTo is required" }, { status: 400 })
    }

    const packageData = await getPackageById(id)

    if (!packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    // Update the package
    const updatedPackage: Package = {
      ...packageData,
      assignedTo,
      updatedAt: new Date().toISOString()
    }

    const success = await updatePackage(updatedPackage)

    if (success) {
      return NextResponse.json({ 
        message: "Package assigned successfully",
        package: updatedPackage
      })
    } else {
      return NextResponse.json({ error: "Failed to assign package" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error assigning package:", error)
    return NextResponse.json({ error: "Failed to assign package" }, { status: 500 })
  }
} 
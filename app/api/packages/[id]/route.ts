import { type NextRequest, NextResponse } from "next/server"
import { getPackageById, updatePackage as updatePackageInDb, getPackages } from "@/lib/data-service"
import type { Package } from "@/types"

interface Params {
  id: string
}

// GET /api/packages/:id - Get a single package by ID
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params
    const packageData = await getPackageById(id)

    if (packageData) {
      return NextResponse.json(packageData)
    } else {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error fetching package:", error)
    return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 })
  }
}

// PUT /api/packages/:id - Update a package
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params
    const packageData = (await request.json()) as Package

    if (id !== packageData.id) {
      return NextResponse.json({ error: "Package ID mismatch" }, { status: 400 })
    }

    const existingPackage = await getPackageById(id)
    if (!existingPackage) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    const success = await updatePackageInDb(packageData)

    if (success) {
      return NextResponse.json({ message: "Package updated successfully" })
    } else {
      return NextResponse.json({ error: "Failed to update package" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error updating package:", error)
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 })
  }
}

// DELETE /api/packages/:id - Delete a package
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params
    const packages = await getPackages()
    const filteredPackages = packages.filter((pkg) => pkg.id !== id)

    if (filteredPackages.length === packages.length) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    const fs = require("fs")
    const path = require("path")
    const dataFilePath = path.join(process.cwd(), "data", "packages.json")
    fs.writeFileSync(dataFilePath, JSON.stringify(filteredPackages, null, 2), "utf8")

    return NextResponse.json({ message: "Package deleted successfully" })
  } catch (error) {
    console.error("Error deleting package:", error)
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 })
  }
} 
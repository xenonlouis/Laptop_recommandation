import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { withPermission, Permission, AuthenticatedUser } from '@/lib/auth-helpers';

const prisma = new PrismaClient();

// GET /api/accessories/[id] - Get a specific accessory (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const accessory = await prisma.accessory.findUnique({
      where: { id }
    });

    if (!accessory) {
      return NextResponse.json({ error: "Accessory not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...accessory,
      price: Number(accessory.price)
    });
  } catch (error) {
    console.error("Error fetching accessory:", error);
    return NextResponse.json({ error: "Failed to fetch accessory" }, { status: 500 });
  }
}

// PUT /api/accessories/[id] - Update an accessory (requires MANAGE_ACCESSORIES permission)
export const PUT = withPermission(
  Permission.MANAGE_ACCESSORIES,
  async (request: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      const accessoryData = await request.json();

      // Validate required fields
      if (!accessoryData.name || !accessoryData.type || !accessoryData.brand) {
        return NextResponse.json({ error: "Name, type, and brand are required" }, { status: 400 });
      }

      const updatedAccessory = await prisma.accessory.update({
        where: { id },
        data: {
          name: accessoryData.name,
          type: accessoryData.type,
          brand: accessoryData.brand,
          price: accessoryData.price || 0,
          priceType: accessoryData.priceType || 'HT',
          image: accessoryData.image || '',
          notes: accessoryData.notes || ''
        }
      });

      return NextResponse.json({
        message: "Accessory updated successfully",
        accessory: {
          ...updatedAccessory,
          price: Number(updatedAccessory.price)
        }
      });
    } catch (error: any) {
      console.error("Error updating accessory:", error);
      if (error.code === 'P2025') {
        return NextResponse.json({ error: "Accessory not found" }, { status: 404 });
      }
      return NextResponse.json({ error: "Failed to update accessory" }, { status: 500 });
    }
  }
);

// DELETE /api/accessories/[id] - Delete an accessory (requires MANAGE_ACCESSORIES permission)
export const DELETE = withPermission(
  Permission.MANAGE_ACCESSORIES,
  async (request: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      await prisma.accessory.delete({
        where: { id }
      });

      return NextResponse.json({ message: "Accessory deleted successfully" });
    } catch (error: any) {
      console.error("Error deleting accessory:", error);
      if (error.code === 'P2025') {
        return NextResponse.json({ error: "Accessory not found" }, { status: 404 });
      }
      return NextResponse.json({ error: "Failed to delete accessory" }, { status: 500 });
    }
  }
); 
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withPermission, Permission, AuthenticatedUser } from '@/lib/auth-helpers';

// GET /api/laptops/[id] - Get a laptop by ID (public)
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const laptop = await prisma.laptop.findUnique({
      where: { id },
      include: {
        supportedProfiles: true,
        supportedOS: true,
      },
    });

    if (!laptop) {
      return NextResponse.json({ error: "Laptop not found" }, { status: 404 });
    }

    // Format the response
    const formattedLaptop = {
      ...laptop,
      price: Number(laptop.price),
      batteryLife: Number(laptop.batteryLife),
      performanceScore: Number(laptop.performanceScore),
      images: laptop.images || [],
      supportedProfiles: laptop.supportedProfiles.map(p => p.profile),
      supportedOS: laptop.supportedOS.map(os => os.os),
    };

    return NextResponse.json(formattedLaptop);
  } catch (error) {
    console.error(`Error fetching laptop:`, error);
    return NextResponse.json({ error: "Failed to fetch laptop" }, { status: 500 });
  }
}

// PUT /api/laptops/[id] - Update a laptop (requires MANAGE_LAPTOPS permission)
export const PUT = withPermission(
  Permission.MANAGE_LAPTOPS,
  async (request: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      const data = await request.json();
      
      // Extract supportedProfiles and supportedOS from the data
      const { supportedProfiles, supportedOS, ...laptopData } = data;
      
      // Update the laptop
      const laptop = await prisma.laptop.update({
        where: { id },
        data: {
          ...laptopData,
          images: laptopData.images || [],
          updatedAt: new Date(),
        },
      });
      
      // Update laptop profiles
      if (supportedProfiles !== undefined) {
        // Delete existing profiles
        await prisma.laptopProfile.deleteMany({
          where: { laptopId: id },
        });
        
        // Create new profiles
        if (Array.isArray(supportedProfiles)) {
          for (const profile of supportedProfiles) {
            await prisma.laptopProfile.create({
              data: {
                laptopId: id,
                profile,
              },
            });
          }
        }
      }
      
      // Update laptop OS
      if (supportedOS !== undefined) {
        // Delete existing OS
        await prisma.laptopOS.deleteMany({
          where: { laptopId: id },
        });
        
        // Create new OS
        if (Array.isArray(supportedOS)) {
          for (const os of supportedOS) {
            await prisma.laptopOS.create({
              data: {
                laptopId: id,
                os,
              },
            });
          }
        }
      }
      
      // Return the updated laptop with the profiles and OS
      const updatedLaptop = await prisma.laptop.findUnique({
        where: { id },
        include: {
          supportedProfiles: true,
          supportedOS: true,
        },
      });
      
      if (!updatedLaptop) {
        return NextResponse.json({ error: 'Failed to retrieve updated laptop' }, { status: 500 });
      }
      
      // Format the response
      const formattedLaptop = {
        ...updatedLaptop,
        price: Number(updatedLaptop.price),
        batteryLife: Number(updatedLaptop.batteryLife),
        performanceScore: Number(updatedLaptop.performanceScore),
        images: updatedLaptop.images || [],
        supportedProfiles: updatedLaptop.supportedProfiles.map(p => p.profile.toLowerCase()),
        supportedOS: updatedLaptop.supportedOS.map(os => os.os),
      };
      
      return NextResponse.json(formattedLaptop);
    } catch (error: any) {
      console.error(`Error updating laptop:`, error);
      if (error.code === 'P2025') {
        return NextResponse.json({ error: "Laptop not found" }, { status: 404 });
      }
      return NextResponse.json({ error: "Failed to update laptop" }, { status: 500 });
    }
  }
);

// DELETE /api/laptops/[id] - Delete a laptop (requires MANAGE_LAPTOPS permission)
export const DELETE = withPermission(
  Permission.MANAGE_LAPTOPS,
  async (request: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      await prisma.laptop.delete({
        where: { id },
      });
      
      return NextResponse.json({ message: "Laptop deleted successfully" });
    } catch (error: any) {
      console.error(`Error deleting laptop:`, error);
      if (error.code === 'P2025') {
        return NextResponse.json({ error: "Laptop not found" }, { status: 404 });
      }
      return NextResponse.json({ error: "Failed to delete laptop" }, { status: 500 });
    }
  }
);


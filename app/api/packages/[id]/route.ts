import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/packages/:id - Get a specific package
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const pkg = await prisma.package.findUnique({
      where: { id },
      include: {
        laptop: true,
        accessories: {
          include: {
            accessory: true
          }
        },
        assignments: {
          include: {
            person: true
          }
        }
      }
    });
    
    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }
    
    // Format the response to match the expected structure
    const accessories = pkg.accessories.map(pa => pa.accessory);
    const assignedPeople = pkg.assignments.map(assignment => assignment.person);
    
    const formattedPackage = {
      ...pkg,
      accessories,
      assignedPeople,
      // Remove the raw relations
      assignments: undefined
    };
    
    return NextResponse.json(formattedPackage);
  } catch (error) {
    console.error('Error fetching package:', error);
    return NextResponse.json({ error: 'Failed to fetch package' }, { status: 500 });
  }
}

// PUT /api/packages/:id - Update a specific package
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await req.json();
    const { accessories, laptop, ...packageData } = data;
    
    // Check if package exists
    const existingPackage = await prisma.package.findUnique({
      where: { id },
      include: {
        accessories: true
      }
    });
    
    if (!existingPackage) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }
    
    // Update the package
    let updatedPackage = await prisma.package.update({
      where: { id },
      data: {
        ...packageData,
        updatedAt: new Date(),
        laptop: laptop ? {
          connect: { id: laptop.id }
        } : undefined
      }
    });
    
    // Update accessories (if provided)
    if (accessories) {
      // Delete existing accessory relationships
      await prisma.packageAccessory.deleteMany({
        where: { packageId: id }
      });
      
      // Create new accessory relationships
      if (accessories.length > 0) {
        await Promise.all(accessories.map(async (accessory: { id: string }) => {
          await prisma.packageAccessory.create({
            data: {
              packageId: id,
              accessoryId: accessory.id
            }
          });
        }));
      }
    }
    
    // Fetch the updated package with all relations
    const refreshedPackage = await prisma.package.findUnique({
      where: { id },
      include: {
        laptop: true,
        accessories: {
          include: {
            accessory: true
          }
        },
        assignments: {
          include: {
            person: true
          }
        }
      }
    });
    
    if (!refreshedPackage) {
      return NextResponse.json({ error: 'Failed to fetch updated package' }, { status: 500 });
    }
    
    // Format the response
    const formattedAccessories = refreshedPackage.accessories.map(pa => pa.accessory);
    const assignedPeople = refreshedPackage.assignments.map(assignment => assignment.person);
    
    const formattedPackage = {
      ...refreshedPackage,
      accessories: formattedAccessories,
      assignedPeople,
      assignments: undefined
    };
    
    return NextResponse.json(formattedPackage);
  } catch (error) {
    console.error('Error updating package:', error);
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

// DELETE /api/packages/:id - Delete a specific package
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if package exists
    const existingPackage = await prisma.package.findUnique({
      where: { id }
    });
    
    if (!existingPackage) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }
    
    // Delete package associations first
    await prisma.packageAccessory.deleteMany({
      where: { packageId: id }
    });
    
    await prisma.packageAssignment.deleteMany({
      where: { packageId: id }
    });
    
    // Delete the package
    await prisma.package.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting package:', error);
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
} 
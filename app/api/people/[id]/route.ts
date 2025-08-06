import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/people/:id - Get a specific person
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const person = await prisma.person.findUnique({
      where: { id },
      include: {
        packageAssignments: {
          include: {
            package: {
              include: {
                laptop: true,
                accessories: {
                  include: {
                    accessory: true
                  }
                }
              }
            }
          }
        }
      }
    });
    
    if (!person) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }
    
    // Format the response to match the expected structure
    const assignedPackages = person.packageAssignments.map(assignment => {
      const pkg = assignment.package;
      
      // Format accessories
      const accessories = pkg.accessories.map(pa => pa.accessory);
      
      return {
        ...pkg,
        accessories,
      };
    });
    
    const formattedPerson = {
      ...person,
      assignedPackages,
      packageAssignments: undefined
    };
    
    return NextResponse.json(formattedPerson);
  } catch (error) {
    console.error('Error fetching person:', error);
    return NextResponse.json({ error: 'Failed to fetch person' }, { status: 500 });
  }
}

// PUT /api/people/:id - Update a specific person
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    
    // Check if person exists
    const existingPerson = await prisma.person.findUnique({
      where: { id }
    });
    
    if (!existingPerson) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }
    
    // Update person
    const updatedPerson = await prisma.person.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json(updatedPerson);
  } catch (error) {
    console.error('Error updating person:', error);
    return NextResponse.json({ error: 'Failed to update person' }, { status: 500 });
  }
}

// DELETE /api/people/:id - Delete a specific person
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check if person exists
    const existingPerson = await prisma.person.findUnique({
      where: { id }
    });
    
    if (!existingPerson) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }
    
    // Delete person
    await prisma.person.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.error('Error deleting person:', error);
    return NextResponse.json({ error: 'Failed to delete person' }, { status: 500 });
  }
} 
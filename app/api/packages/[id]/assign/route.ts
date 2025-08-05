import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// POST /api/packages/:id/assign - Assign a package to a person
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const packageId = params.id;
    const { personId, pcReference } = await req.json();
    
    if (!personId) {
      return NextResponse.json({ error: 'Person ID is required' }, { status: 400 });
    }
    
    // Check if package exists
    const pkg = await prisma.package.findUnique({
      where: { id: packageId }
    });
    
    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }
    
    // Check if person exists
    const person = await prisma.person.findUnique({
      where: { id: personId }
    });
    
    if (!person) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }
    
    // Check if assignment already exists
    const existingAssignment = await prisma.packageAssignment.findFirst({
      where: {
        packageId,
        personId
      }
    });
    
    if (existingAssignment) {
      return NextResponse.json({ error: 'Package already assigned to this person' }, { status: 409 });
    }
    
    // Create the assignment
    const assignment = await prisma.packageAssignment.create({
      data: {
        packageId,
        personId,
        pcReference: pcReference || person.pcReference,
        assignedAt: new Date()
      },
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
        },
        person: true
      }
    });
    
    // Format the response
    const formattedPackage = {
      ...assignment.package,
      accessories: assignment.package.accessories.map(pa => pa.accessory)
    };
    
    const response = {
      ...assignment,
      package: formattedPackage
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error assigning package:', error);
    return NextResponse.json({ error: 'Failed to assign package' }, { status: 500 });
  }
}

// DELETE /api/packages/:id/assign - Unassign a package from a person
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const packageId = params.id;
    const url = new URL(req.url);
    const personId = url.searchParams.get('personId');
    
    if (!personId) {
      return NextResponse.json({ error: 'Person ID is required' }, { status: 400 });
    }
    
    // Check if the assignment exists
    const existingAssignment = await prisma.packageAssignment.findFirst({
      where: {
        packageId,
        personId
      }
    });
    
    if (!existingAssignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }
    
    // Delete the assignment
    await prisma.packageAssignment.delete({
      where: {
        id: existingAssignment.id
      }
    });
    
    return NextResponse.json({ message: 'Package unassigned successfully' });
  } catch (error) {
    console.error('Error unassigning package:', error);
    return NextResponse.json({ error: 'Failed to unassign package' }, { status: 500 });
  }
} 
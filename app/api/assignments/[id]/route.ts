import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// GET /api/assignments/[id] - Get specific assignment
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const assignment = await prisma.personAssignment.findUnique({
      where: { id: params.id },
      include: {
        person: true,
        template: {
          include: {
            laptop: {
              include: {
                supportedProfiles: true,
                supportedOS: true
              }
            },
            accessories: {
              include: {
                accessory: true
              }
            }
          }
        }
      }
    });

    if (!assignment) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      );
    }

    // Transform the data
    const transformedAssignment = {
      id: assignment.id,
      status: assignment.status,
      pcReference: assignment.pcReference,
      assignedAt: assignment.assignedAt,
      deliveredAt: assignment.deliveredAt,
      notes: assignment.notes,
      person: assignment.person,
      template: {
        id: assignment.template.id,
        name: assignment.template.name,
        description: assignment.template.description,
        profileType: assignment.template.profileType,
        priceType: assignment.template.priceType,
        laptop: {
          ...assignment.template.laptop,
          price: Number(assignment.template.laptop.price),
          batteryLife: Number(assignment.template.laptop.batteryLife),
          performanceScore: Number(assignment.template.laptop.performanceScore)
        },
        accessories: assignment.template.accessories.map(ta => ({
          ...ta.accessory,
          price: Number(ta.accessory.price)
        })),
        totalPrice: Number(assignment.template.laptop.price) + 
                   assignment.template.accessories.reduce((sum, ta) => sum + Number(ta.accessory.price), 0)
      }
    };

    return NextResponse.json(transformedAssignment);
  } catch (error) {
    console.error('Error fetching assignment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assignment' },
      { status: 500 }
    );
  }
}

// PUT /api/assignments/[id] - Update assignment
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, pcReference, notes, assignedAt, deliveredAt } = body;

    // Check if assignment exists
    const existingAssignment = await prisma.personAssignment.findUnique({
      where: { id: params.id }
    });

    if (!existingAssignment) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    
    if (status !== undefined) {
      updateData.status = status;
      
      // Auto-set deliveredAt when status changes to 'delivered'
      if (status === 'delivered' && !existingAssignment.deliveredAt) {
        updateData.deliveredAt = new Date();
      }
      
      // Clear deliveredAt when status changes away from 'delivered'
      if (status !== 'delivered' && existingAssignment.deliveredAt) {
        updateData.deliveredAt = null;
      }
    }
    
    if (pcReference !== undefined) {
      updateData.pcReference = pcReference;
    }
    
    if (notes !== undefined) {
      updateData.notes = notes;
    }
    
    if (assignedAt !== undefined) {
      updateData.assignedAt = new Date(assignedAt);
    }
    
    if (deliveredAt !== undefined) {
      updateData.deliveredAt = deliveredAt ? new Date(deliveredAt) : null;
    }

    // Update the assignment
    const assignment = await prisma.personAssignment.update({
      where: { id: params.id },
      data: updateData
    });

    // Fetch the updated assignment with relations
    const updatedAssignment = await prisma.personAssignment.findUnique({
      where: { id: params.id },
      include: {
        person: true,
        template: {
          include: {
            laptop: {
              include: {
                supportedProfiles: true,
                supportedOS: true
              }
            },
            accessories: {
              include: {
                accessory: true
              }
            }
          }
        }
      }
    });

    if (!updatedAssignment) {
      return NextResponse.json(
        { error: 'Assignment updated but not found' },
        { status: 500 }
      );
    }

    // Transform the data
    const transformedAssignment = {
      id: updatedAssignment.id,
      status: updatedAssignment.status,
      pcReference: updatedAssignment.pcReference,
      assignedAt: updatedAssignment.assignedAt,
      deliveredAt: updatedAssignment.deliveredAt,
      notes: updatedAssignment.notes,
      person: updatedAssignment.person,
      template: {
        id: updatedAssignment.template.id,
        name: updatedAssignment.template.name,
        description: updatedAssignment.template.description,
        profileType: updatedAssignment.template.profileType,
        priceType: updatedAssignment.template.priceType,
        laptop: {
          ...updatedAssignment.template.laptop,
          price: Number(updatedAssignment.template.laptop.price),
          batteryLife: Number(updatedAssignment.template.laptop.batteryLife),
          performanceScore: Number(updatedAssignment.template.laptop.performanceScore)
        },
        accessories: updatedAssignment.template.accessories.map(ta => ({
          ...ta.accessory,
          price: Number(ta.accessory.price)
        })),
        totalPrice: Number(updatedAssignment.template.laptop.price) + 
                   updatedAssignment.template.accessories.reduce((sum, ta) => sum + Number(ta.accessory.price), 0)
      }
    };

    return NextResponse.json(transformedAssignment);
  } catch (error) {
    console.error('Error updating assignment:', error);
    return NextResponse.json(
      { error: 'Failed to update assignment' },
      { status: 500 }
    );
  }
}

// DELETE /api/assignments/[id] - Delete assignment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if assignment exists
    const existingAssignment = await prisma.personAssignment.findUnique({
      where: { id: params.id }
    });

    if (!existingAssignment) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      );
    }

    // Delete the assignment
    await prisma.personAssignment.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Assignment deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting assignment:', error);
    return NextResponse.json(
      { error: 'Failed to delete assignment' },
      { status: 500 }
    );
  }
}
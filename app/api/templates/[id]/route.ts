import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// GET /api/templates/[id] - Get specific template
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const template = await prisma.packageTemplate.findUnique({
      where: { id: params.id },
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
        },
        assignments: {
          include: {
            person: true
          }
        }
      }
    });

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Transform the data
    const transformedTemplate = {
      id: template.id,
      name: template.name,
      description: template.description,
      profileType: template.profileType,
      priceType: template.priceType,
      isActive: template.isActive,
      notes: template.notes,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
      laptop: {
        ...template.laptop,
        price: Number(template.laptop.price),
        batteryLife: Number(template.laptop.batteryLife),
        performanceScore: Number(template.laptop.performanceScore)
      },
      accessories: template.accessories.map(ta => ({
        ...ta.accessory,
        price: Number(ta.accessory.price)
      })),
      assignments: template.assignments.map(assignment => ({
        id: assignment.id,
        status: assignment.status,
        pcReference: assignment.pcReference,
        assignedAt: assignment.assignedAt,
        deliveredAt: assignment.deliveredAt,
        notes: assignment.notes,
        person: assignment.person
      })),
      assignmentCount: template.assignments.length,
      totalPrice: Number(template.laptop.price) + 
                 template.accessories.reduce((sum, ta) => sum + Number(ta.accessory.price), 0)
    };

    return NextResponse.json(transformedTemplate);
  } catch (error) {
    console.error('Error fetching template:', error);
    return NextResponse.json(
      { error: 'Failed to fetch template' },
      { status: 500 }
    );
  }
}

// PUT /api/templates/[id] - Update template
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, description, profileType, laptopId, priceType, accessoryIds, isActive, notes } = body;

    // Check if template exists
    const existingTemplate = await prisma.packageTemplate.findUnique({
      where: { id: params.id }
    });

    if (!existingTemplate) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Update the template
    const template = await prisma.packageTemplate.update({
      where: { id: params.id },
      data: {
        name,
        description,
        profileType,
        laptopId,
        priceType,
        isActive,
        notes,
        updatedAt: new Date()
      }
    });

    // Update accessories if provided
    if (accessoryIds !== undefined) {
      // Remove existing accessories
      await prisma.templateAccessory.deleteMany({
        where: { templateId: params.id }
      });

      // Add new accessories
      if (accessoryIds.length > 0) {
        const templateAccessories = accessoryIds.map((accessoryId: string) => ({
          templateId: params.id,
          accessoryId
        }));

        await prisma.templateAccessory.createMany({
          data: templateAccessories
        });
      }
    }

    // Fetch the updated template with relations
    const updatedTemplate = await prisma.packageTemplate.findUnique({
      where: { id: params.id },
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
        },
        assignments: {
          include: {
            person: true
          }
        }
      }
    });

    if (!updatedTemplate) {
      return NextResponse.json(
        { error: 'Template updated but not found' },
        { status: 500 }
      );
    }

    // Transform the data
    const transformedTemplate = {
      id: updatedTemplate.id,
      name: updatedTemplate.name,
      description: updatedTemplate.description,
      profileType: updatedTemplate.profileType,
      priceType: updatedTemplate.priceType,
      isActive: updatedTemplate.isActive,
      notes: updatedTemplate.notes,
      createdAt: updatedTemplate.createdAt,
      updatedAt: updatedTemplate.updatedAt,
      laptop: {
        ...updatedTemplate.laptop,
        price: Number(updatedTemplate.laptop.price),
        batteryLife: Number(updatedTemplate.laptop.batteryLife),
        performanceScore: Number(updatedTemplate.laptop.performanceScore)
      },
      accessories: updatedTemplate.accessories.map(ta => ({
        ...ta.accessory,
        price: Number(ta.accessory.price)
      })),
      assignments: updatedTemplate.assignments.map(assignment => ({
        id: assignment.id,
        status: assignment.status,
        pcReference: assignment.pcReference,
        assignedAt: assignment.assignedAt,
        deliveredAt: assignment.deliveredAt,
        notes: assignment.notes,
        person: assignment.person
      })),
      assignmentCount: updatedTemplate.assignments.length,
      totalPrice: Number(updatedTemplate.laptop.price) + 
                 updatedTemplate.accessories.reduce((sum, ta) => sum + Number(ta.accessory.price), 0)
    };

    return NextResponse.json(transformedTemplate);
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
}

// DELETE /api/templates/[id] - Delete template
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if template exists
    const existingTemplate = await prisma.packageTemplate.findUnique({
      where: { id: params.id },
      include: {
        assignments: true
      }
    });

    if (!existingTemplate) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Check if template has active assignments
    const activeAssignments = existingTemplate.assignments.filter(
      assignment => assignment.status === 'assigned' || assignment.status === 'delivered'
    );

    if (activeAssignments.length > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete template with active assignments',
          activeAssignments: activeAssignments.length
        },
        { status: 400 }
      );
    }

    // Delete the template (cascading deletes will handle accessories and assignments)
    await prisma.packageTemplate.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Template deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
}
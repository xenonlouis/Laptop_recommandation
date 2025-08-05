import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// GET /api/assignments - Get all person assignments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const personId = searchParams.get('personId');
    const templateId = searchParams.get('templateId');
    const status = searchParams.get('status');

    const where: any = {};
    
    if (personId) {
      where.personId = personId;
    }
    
    if (templateId) {
      where.templateId = templateId;
    }
    
    if (status) {
      where.status = status;
    }

    const assignments = await prisma.personAssignment.findMany({
      where,
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
      },
      orderBy: [
        { assignedAt: 'desc' }
      ]
    });

    // Transform the data for frontend consumption
    const transformedAssignments = assignments.map(assignment => ({
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
    }));

    return NextResponse.json(transformedAssignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assignments' },
      { status: 500 }
    );
  }
}

// POST /api/assignments - Create a new assignment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { personId, templateId, status = 'assigned', pcReference, notes } = body;

    // Validate required fields
    if (!personId || !templateId) {
      return NextResponse.json(
        { error: 'Missing required fields: personId, templateId' },
        { status: 400 }
      );
    }

    // Check if person exists
    const person = await prisma.person.findUnique({
      where: { id: personId }
    });

    if (!person) {
      return NextResponse.json(
        { error: 'Person not found' },
        { status: 404 }
      );
    }

    // Check if template exists and is active
    const template = await prisma.packageTemplate.findUnique({
      where: { id: templateId }
    });

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    if (!template.isActive) {
      return NextResponse.json(
        { error: 'Cannot assign inactive template' },
        { status: 400 }
      );
    }

    // Check if assignment already exists
    const existingAssignment = await prisma.personAssignment.findUnique({
      where: {
        personId_templateId: {
          personId,
          templateId
        }
      }
    });

    if (existingAssignment) {
      return NextResponse.json(
        { error: 'Person is already assigned to this template' },
        { status: 400 }
      );
    }

    // Create the assignment
    const assignment = await prisma.personAssignment.create({
      data: {
        personId,
        templateId,
        status,
        pcReference,
        notes,
        assignedAt: new Date(),
        deliveredAt: status === 'delivered' ? new Date() : null
      }
    });

    // Fetch the complete assignment with relations
    const createdAssignment = await prisma.personAssignment.findUnique({
      where: { id: assignment.id },
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

    if (!createdAssignment) {
      return NextResponse.json(
        { error: 'Assignment created but not found' },
        { status: 500 }
      );
    }

    // Transform the data
    const transformedAssignment = {
      id: createdAssignment.id,
      status: createdAssignment.status,
      pcReference: createdAssignment.pcReference,
      assignedAt: createdAssignment.assignedAt,
      deliveredAt: createdAssignment.deliveredAt,
      notes: createdAssignment.notes,
      person: createdAssignment.person,
      template: {
        id: createdAssignment.template.id,
        name: createdAssignment.template.name,
        description: createdAssignment.template.description,
        profileType: createdAssignment.template.profileType,
        priceType: createdAssignment.template.priceType,
        laptop: {
          ...createdAssignment.template.laptop,
          price: Number(createdAssignment.template.laptop.price),
          batteryLife: Number(createdAssignment.template.laptop.batteryLife),
          performanceScore: Number(createdAssignment.template.laptop.performanceScore)
        },
        accessories: createdAssignment.template.accessories.map(ta => ({
          ...ta.accessory,
          price: Number(ta.accessory.price)
        })),
        totalPrice: Number(createdAssignment.template.laptop.price) + 
                   createdAssignment.template.accessories.reduce((sum, ta) => sum + Number(ta.accessory.price), 0)
      }
    };

    return NextResponse.json(transformedAssignment);
  } catch (error) {
    console.error('Error creating assignment:', error);
    return NextResponse.json(
      { error: 'Failed to create assignment' },
      { status: 500 }
    );
  }
}
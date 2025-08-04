import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// GET /api/templates - Get all package templates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileType = searchParams.get('profileType');
    const isActive = searchParams.get('isActive');

    const where: any = {};
    
    if (profileType) {
      where.profileType = profileType;
    }
    
    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }

    const templates = await prisma.packageTemplate.findMany({
      where,
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
      },
      orderBy: [
        { profileType: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    // Transform the data for frontend consumption
    const transformedTemplates = templates.map(template => ({
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
        person: assignment.person
      })),
      // Computed fields
      assignmentCount: template.assignments.length,
      totalPrice: Number(template.laptop.price) + 
                 template.accessories.reduce((sum, ta) => sum + Number(ta.accessory.price), 0)
    }));

    return NextResponse.json(transformedTemplates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

// POST /api/templates - Create a new package template
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, profileType, laptopId, priceType, accessoryIds, notes } = body;

    // Validate required fields
    if (!name || !profileType || !laptopId || !priceType) {
      return NextResponse.json(
        { error: 'Missing required fields: name, profileType, laptopId, priceType' },
        { status: 400 }
      );
    }

    // Create the template
    const template = await prisma.packageTemplate.create({
      data: {
        name,
        description,
        profileType,
        laptopId,
        priceType,
        isActive: true,
        notes
      }
    });

    // Add accessories if provided
    if (accessoryIds && accessoryIds.length > 0) {
      const templateAccessories = accessoryIds.map((accessoryId: string) => ({
        templateId: template.id,
        accessoryId
      }));

      await prisma.templateAccessory.createMany({
        data: templateAccessories
      });
    }

    // Fetch the complete template with relations
    const createdTemplate = await prisma.packageTemplate.findUnique({
      where: { id: template.id },
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

    if (!createdTemplate) {
      return NextResponse.json(
        { error: 'Template created but not found' },
        { status: 500 }
      );
    }

    // Transform the data
    const transformedTemplate = {
      id: createdTemplate.id,
      name: createdTemplate.name,
      description: createdTemplate.description,
      profileType: createdTemplate.profileType,
      priceType: createdTemplate.priceType,
      isActive: createdTemplate.isActive,
      notes: createdTemplate.notes,
      createdAt: createdTemplate.createdAt,
      updatedAt: createdTemplate.updatedAt,
      laptop: {
        ...createdTemplate.laptop,
        price: Number(createdTemplate.laptop.price),
        batteryLife: Number(createdTemplate.laptop.batteryLife),
        performanceScore: Number(createdTemplate.laptop.performanceScore)
      },
      accessories: createdTemplate.accessories.map(ta => ({
        ...ta.accessory,
        price: Number(ta.accessory.price)
      })),
      assignments: [],
      assignmentCount: 0,
      totalPrice: Number(createdTemplate.laptop.price) + 
                 createdTemplate.accessories.reduce((sum, ta) => sum + Number(ta.accessory.price), 0)
    };

    return NextResponse.json(transformedTemplate);
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/people - Get all people
export async function GET(req: NextRequest) {
  try {
    const people = await prisma.person.findMany({
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

    // Format the data to match the expected structure
    const formattedPeople = people.map(person => {
      // Get assigned packages with full details
      const assignedPackages = person.packageAssignments.map(assignment => {
        const pkg = assignment.package;
        
        // Format accessories
        const accessories = pkg.accessories.map(pa => pa.accessory);
        
        return {
          ...pkg,
          accessories,
        };
      });
      
      return {
        ...person,
        assignedPackages,
        // Remove the raw relations
        packageAssignments: undefined
      };
    });

    return NextResponse.json(formattedPeople);
  } catch (error) {
    console.error('Error fetching people:', error);
    return NextResponse.json({ error: 'Failed to fetch people' }, { status: 500 });
  }
}

// POST /api/people - Add a new person
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Create the person
    const person = await prisma.person.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    
    return NextResponse.json(person);
  } catch (error) {
    console.error('Error creating person:', error);
    return NextResponse.json({ error: 'Failed to create person' }, { status: 500 });
  }
} 
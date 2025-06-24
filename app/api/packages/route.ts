import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/packages - Get all packages
export async function GET(req: NextRequest) {
  try {
    const packages = await prisma.package.findMany({
      include: {
        laptop: true,
        accessories: {
          include: {
            accessory: true
          }
        }
      }
    });

    // Format the data to match the expected structure
    const formattedPackages = packages.map(pkg => {
      // Get accessories
      const accessories = pkg.accessories.map(pa => pa.accessory);
      
      return {
        ...pkg,
        accessories,
      };
    });

    return NextResponse.json(formattedPackages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

// POST /api/packages - Create a new package
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { accessories, laptop, ...packageData } = data;
    
    // Create the package with relationships
    const newPackage = await prisma.package.create({
      data: {
        ...packageData,
        createdAt: new Date(),
        updatedAt: new Date(),
        laptop: laptop ? { 
          connect: { id: laptop.id } 
        } : undefined,
        accessories: accessories && accessories.length > 0 ? {
          create: accessories.map((accessory: any) => ({
            accessory: {
              connect: { id: accessory.id }
            }
          }))
        } : undefined
      },
      include: {
        laptop: true,
        accessories: {
          include: {
            accessory: true
          }
        }
      }
    });
    
    // Format the response
    const formattedPackage = {
      ...newPackage,
      accessories: newPackage.accessories.map(pa => pa.accessory)
    };
    
    return NextResponse.json(formattedPackage);
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
} 
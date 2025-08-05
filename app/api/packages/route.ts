import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/packages - Get all packages
export async function GET(req: NextRequest) {
  try {
    const packages = await prisma.package.findMany({
      include: {
        laptop: {
          include: {
            supportedProfiles: true
          }
        },
        accessories: {
          include: {
            accessory: true
          }
        }
      }
    });

    // Format the data to match the expected structure
    const formattedPackages = packages.map(pkg => {
      // Get accessories and convert Decimal prices to numbers
      const accessories = pkg.accessories.map(pa => ({
        ...pa.accessory,
        price: Number(pa.accessory.price)
      }));
      
      return {
        ...pkg,
        laptop: {
          ...pkg.laptop,
          price: Number(pkg.laptop.price),
          batteryLife: Number(pkg.laptop.batteryLife),
          performanceScore: Number(pkg.laptop.performanceScore),
          images: pkg.laptop.images || [] // Include images for frontend display
        },
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
        laptop: {
          include: {
            supportedProfiles: true
          }
        },
        accessories: {
          include: {
            accessory: true
          }
        }
      }
    });
    
    // Format the response and convert Decimal prices to numbers
    const formattedPackage = {
      ...newPackage,
      laptop: {
        ...newPackage.laptop,
        price: Number(newPackage.laptop.price),
        batteryLife: Number(newPackage.laptop.batteryLife),
        performanceScore: Number(newPackage.laptop.performanceScore),
        images: newPackage.laptop.images || [] // Include images for frontend display
      },
      accessories: newPackage.accessories.map(pa => ({
        ...pa.accessory,
        price: Number(pa.accessory.price)
      }))
    };
    
    return NextResponse.json(formattedPackage);
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
} 
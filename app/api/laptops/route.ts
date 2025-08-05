import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/laptops - Get all laptops
export async function GET(req: NextRequest) {
  try {
    const laptops = await prisma.laptop.findMany({
      include: {
        supportedProfiles: true,
        supportedOS: true,
      },
    });

    // Format the data to match the expected structure and convert Decimals to numbers
    const formattedLaptops = laptops.map(laptop => ({
      ...laptop,
      price: Number(laptop.price),
      batteryLife: Number(laptop.batteryLife),
      performanceScore: Number(laptop.performanceScore),
      images: laptop.images || [], // Ensure images is always an array
      supportedProfiles: laptop.supportedProfiles.map(p => p.profile),
      supportedOS: laptop.supportedOS.map(os => os.os),
    }));

    return NextResponse.json(formattedLaptops);
  } catch (error) {
    console.error('Error fetching laptops:', error);
    return NextResponse.json({ error: 'Failed to fetch laptops' }, { status: 500 });
  }
}

// POST /api/laptops - Add a new laptop
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Extract supportedProfiles and supportedOS from the data
    const { supportedProfiles, supportedOS, ...laptopData } = data;
    
    // Create the laptop
    const laptop = await prisma.laptop.create({
      data: {
        ...laptopData,
        images: laptopData.images || [], // Ensure images is always an array
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    
    // Create the laptop profiles
    if (supportedProfiles && Array.isArray(supportedProfiles)) {
      for (const profile of supportedProfiles) {
        await prisma.laptopProfile.create({
          data: {
            laptopId: laptop.id,
            profile,
          },
        });
      }
    }
    
    // Create the laptop OS
    if (supportedOS && Array.isArray(supportedOS)) {
      for (const os of supportedOS) {
        await prisma.laptopOS.create({
          data: {
            laptopId: laptop.id,
            os,
          },
        });
      }
    }
    
    // Return the created laptop with the profiles and OS
    const createdLaptop = await prisma.laptop.findUnique({
      where: { id: laptop.id },
      include: {
        supportedProfiles: true,
        supportedOS: true,
      },
    });
    
    if (!createdLaptop) {
      return NextResponse.json({ error: 'Failed to retrieve created laptop' }, { status: 500 });
    }
    
    // Format the response
    const formattedLaptop = {
      ...createdLaptop,
      supportedProfiles: createdLaptop.supportedProfiles.map(p => p.profile),
      supportedOS: createdLaptop.supportedOS.map(os => os.os),
    };
    
    return NextResponse.json(formattedLaptop);
  } catch (error) {
    console.error('Error creating laptop:', error);
    return NextResponse.json({ error: 'Failed to create laptop' }, { status: 500 });
  }
}


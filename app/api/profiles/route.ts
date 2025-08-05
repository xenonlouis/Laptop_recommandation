import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get unique profile types from multiple sources
    const [laptopProfiles, templateProfiles, personPositions] = await Promise.all([
      // Get profiles from laptop_profiles table
      prisma.laptopProfile.findMany({
        select: { profile: true },
        distinct: ['profile']
      }),
      
      // Get profiles from package_templates table
      prisma.packageTemplate.findMany({
        select: { profileType: true },
        distinct: ['profileType']
      }),
      
      // Get positions from people table
      prisma.person.findMany({
        select: { position: true },
        where: { position: { not: null } },
        distinct: ['position']
      })
    ]);

    // Combine and deduplicate all profile types
    const allProfiles = new Set<string>();
    
    // Add laptop profiles
    laptopProfiles.forEach(lp => allProfiles.add(lp.profile));
    
    // Add template profiles
    templateProfiles.forEach(tp => allProfiles.add(tp.profileType));
    
    // Add person positions
    personPositions.forEach(pp => {
      if (pp.position) allProfiles.add(pp.position);
    });

    // Convert to array, normalize case, and sort
    const normalizedProfiles = Array.from(allProfiles).map(profile => 
      profile.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) // Title case
    );
    
    // Remove duplicates after normalization
    const uniqueProfiles = [...new Set(normalizedProfiles)].sort();

    return NextResponse.json({ profiles: uniqueProfiles });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profiles' },
      { status: 500 }
    );
  }
} 
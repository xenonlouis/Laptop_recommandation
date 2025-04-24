import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma'; // Import Prisma client
import { SurveyResponse } from '@/types';

// Protected route to get all survey responses
export async function GET(request: NextRequest) {
  try {
    // Simple password protection - check for the correct API key in headers
    const apiKey = request.headers.get('x-api-key');
    const requiredKey = process.env.ADMIN_API_KEY || 'sbaxilobaxi';
    
    // Require authentication to access survey responses
    if (apiKey !== requiredKey) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }
    
    // Fetch all responses from the database using Prisma
    console.log('Fetching all survey responses from database...');
    const responses = await prisma.surveyResponse.findMany({
      // Optional: Add ordering if desired
      orderBy: {
        submittedAt: 'desc', // Example: newest first
      },
    });
    console.log(`Found ${responses.length} responses.`);
    
    return NextResponse.json(responses);

  } catch (error) {
    console.error('Error fetching survey responses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch survey responses' },
      { status: 500 }
    );
  }
} 
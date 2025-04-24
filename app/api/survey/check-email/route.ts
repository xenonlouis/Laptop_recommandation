import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma'; // Import Prisma client

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
  }

  console.log(`Checking database for email: ${email}`);

  try {
    const existingResponse = await prisma.surveyResponse.findUnique({
      where: { email: email.toLowerCase() }, // Check using lowercase email
      select: { id: true }, // Only select the ID, we just need to know if it exists
    });

    const exists = !!existingResponse;
    console.log(`Email ${email} exists in DB: ${exists}`);

    return NextResponse.json({ exists });

  } catch (error) {
    console.error(`Error checking email ${email}:`, error);
    return NextResponse.json(
      { error: 'Failed to check email existence' },
      { status: 500 }
    );
  }
} 
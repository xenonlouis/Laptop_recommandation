import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// GET /api/people - Get all people
export async function GET(request: NextRequest) {
  try {
    const people = await prisma.person.findMany({
      orderBy: [
        { name: 'asc' }
      ]
    });

    return NextResponse.json(people);
  } catch (error) {
    console.error('Error fetching people:', error);
    return NextResponse.json(
      { error: 'Failed to fetch people' },
      { status: 500 }
    );
  }
}

// POST /api/people - Create a new person
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, department, position, pcReference } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Missing required field: name' },
        { status: 400 }
      );
    }

    // Check for duplicate email if provided
    if (email) {
      const existingPerson = await prisma.person.findUnique({
        where: { email }
      });

      if (existingPerson) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        );
      }
    }

    // Create the person
    const person = await prisma.person.create({
      data: {
        name,
        email,
        department,
        position,
        pcReference
      }
    });

    return NextResponse.json(person);
  } catch (error) {
    console.error('Error creating person:', error);
    return NextResponse.json(
      { error: 'Failed to create person' },
      { status: 500 }
    );
  }
}
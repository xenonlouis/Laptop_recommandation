import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma'; // Import Prisma client
import { SurveyResponse } from '@/types';

interface Params {
  id: string;
}

// Protected route to get a specific survey response
export async function GET(request: NextRequest, { params }: { params: Params }) {
  console.log(`GET request received for ID: ${params.id}`);
  try {
    const { id } = params; // Destructure id directly
    
    // Authentication Check (Keep as is)
    const apiKey = request.headers.get('x-api-key');
    const requiredKey = process.env.ADMIN_API_KEY || 'sbaxilobaxi';
    if (apiKey !== requiredKey) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }
    console.log('GET authentication successful');
    
    // Fetch the specific response from the database using Prisma
    console.log(`Fetching response with ID: ${id} from database...`);
    const response = await prisma.surveyResponse.findUnique({
      where: { id: id },
    });
    
    if (!response) {
      console.log(`Response with ID: ${id} not found.`);
      return NextResponse.json(
        { error: 'Survey response not found' },
        { status: 404 }
      );
    }
    
    console.log(`Successfully fetched response with ID: ${id}`);
    return NextResponse.json(response);

  } catch (error) {
    console.error(`Error fetching survey response with ID ${params.id}:`, error);
    // Check if it's an error due to invalid ID format for Prisma
    if (error instanceof Error && error.message.includes('Invalid uuid')) { // Example check
        return NextResponse.json({ error: 'Invalid survey response ID format' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch survey response' },
      { status: 500 }
    );
  }
}

// --- DELETE FUNCTION --- 
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  console.log(`DELETE request received for ID: ${params.id}`);
  try {
    const { id } = params;
    
    // Authentication Check (Keep as is)
    const apiKey = request.headers.get('x-api-key');
    const requiredKey = process.env.ADMIN_API_KEY || 'sbaxilobaxi';
    if (apiKey !== requiredKey) {
      console.log('DELETE failed: Unauthorized access');
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }
    console.log('DELETE authentication successful');
    
    // Attempt to delete the response from the database using Prisma
    console.log(`Attempting to delete response with ID: ${id} from database...`);
    await prisma.surveyResponse.delete({
      where: { id: id },
    });
    
    // If delete succeeds without error, it means the record existed
    console.log(`Successfully deleted response with ID: ${id}`);
    return new NextResponse(null, { status: 204 }); // No Content success response

  } catch (error: any) {
    console.error(`DELETE failed: Overall error for ID ${params.id}:`, error);
    
    // Check if the error is because the record was not found
    // Prisma throws P2025 error code when record to delete is not found
    if (error.code === 'P2025') { 
      console.log(`DELETE failed: Record with ID ${params.id} not found.`);
       return NextResponse.json({ error: 'Survey response not found' }, { status: 404 });
    }
    // Handle potential invalid ID format
    if (error instanceof Error && error.message.includes('Invalid uuid')) {
        return NextResponse.json({ error: 'Invalid survey response ID format' }, { status: 400 });
    }
    
    // Generic error for unexpected issues
    return NextResponse.json({ error: 'An internal server error occurred during deletion.' }, { status: 500 });
  }
}

// --- PUT FUNCTION --- 
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  console.log(`PUT request received for ID: ${params.id}`);
  try {
    const { id } = params;
    const updateData = await request.json();
    console.log('PUT request body:', updateData);
    
    // Authentication Check (Keep as is)
    const apiKey = request.headers.get('x-api-key');
    const requiredKey = process.env.ADMIN_API_KEY || 'sbaxilobaxi';
    if (apiKey !== requiredKey) {
      console.log('PUT failed: Unauthorized access');
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }
    console.log('PUT authentication successful');
    
    // Clean up updateData - remove fields that should not be changed
    // delete updateData.id; // Cannot update primary key
    // delete updateData.submittedAt; // Should not change submission time
    // delete updateData.email; // Prevent changing unique email for now?

    // Attempt to update the response in the database using Prisma
    console.log(`Attempting to update response with ID: ${id} in database...`);
    const updatedResponse = await prisma.surveyResponse.update({
      where: { id: id },
      data: updateData, // Pass the request body directly (Prisma handles partial updates)
    });
    
    console.log(`Successfully updated response with ID: ${id}`);
    return NextResponse.json(updatedResponse, { status: 200 });

  } catch (error: any) {
    console.error(`PUT failed: Overall error for ID ${params.id}:`, error);
    
    // Check if the error is because the record was not found
    if (error.code === 'P2025') { // Prisma code for record not found on update
      console.log(`PUT failed: Record with ID ${params.id} not found.`);
       return NextResponse.json({ error: 'Survey response not found' }, { status: 404 });
    }
    // Handle potential invalid ID format
    if (error instanceof Error && error.message.includes('Invalid uuid')) {
        return NextResponse.json({ error: 'Invalid survey response ID format' }, { status: 400 });
    }
    // Handle potential unique constraint errors (e.g., if email was changed to an existing one)
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        console.log('PUT failed: Email already exists.');
        return NextResponse.json({ error: 'Cannot update: Email address already in use.' }, { status: 409 }); // Conflict
    }
    
    // Generic error for unexpected issues
    return NextResponse.json({ error: 'An internal server error occurred during update.' }, { status: 500 });
  }
} 
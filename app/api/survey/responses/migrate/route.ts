import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma'; // Import Prisma client
import { SurveyResponse } from '@/types'; // Import the type for validation

// --- POST Handler for Manual Migration ---
export async function POST(request: NextRequest) {
  console.log('Manual survey migration request received');
  
  try {
    // 1. Authentication Check
    const apiKey = request.headers.get('x-api-key');
    const requiredKey = process.env.ADMIN_API_KEY || 'sbaxilobaxi';
    if (apiKey !== requiredKey) {
      console.log('Migration failed: Unauthorized access');
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }
    console.log('Migration authentication successful');
    
    // 2. Get and Parse JSON Body
    let responseData: Partial<SurveyResponse>; // Use Partial initially
    try {
      responseData = await request.json();
      console.log('Received migration data for:', responseData.email);
    } catch (parseError) {
      console.error('Migration failed: Invalid JSON format', parseError);
      return NextResponse.json({ error: 'Invalid JSON format in request body' }, { status: 400 });
    }

    // 3. Basic Validation (Ensure required fields exist)
    if (!responseData.name || !responseData.email || !responseData.position || !responseData.id || !responseData.submittedAt) {
       console.log('Migration failed: Missing required fields (name, email, position, id, submittedAt)');
       return NextResponse.json({ error: 'Missing required fields (name, email, position, id, submittedAt)' }, { status: 400 });
    }

    // 4. Database Duplicate Check (by Email)
    console.log(`Migration: Checking for existing email: ${responseData.email}`);
    const existingByEmail = await prisma.surveyResponse.findUnique({
      where: { email: responseData.email.toLowerCase() },
      select: { id: true },
    });

    if (existingByEmail) {
      console.log('Migration skipped: Duplicate email found in database:', responseData.email);
      // Return a specific status/message indicating duplicate email
      return NextResponse.json(
        { message: `Skipped: Email ${responseData.email} already exists in database.`, existingId: existingByEmail.id },
        { status: 409 } // Conflict
      );
    }
    console.log('Migration: No duplicate email found.');

    // 5. Database Duplicate Check (by ID - less likely but good practice)
    console.log(`Migration: Checking for existing ID: ${responseData.id}`);
    const existingById = await prisma.surveyResponse.findUnique({
      where: { id: responseData.id },
      select: { id: true },
    });

    if (existingById) {
      console.log('Migration skipped: Duplicate ID found in database:', responseData.id);
      return NextResponse.json(
        { message: `Skipped: ID ${responseData.id} already exists in database.` },
        { status: 409 } // Conflict
      );
    }
    console.log('Migration: No duplicate ID found.');

    // 6. Prepare data for creation (align with Prisma schema)
    // We trust the structure from the pasted JSON but ensure types/defaults
    const dataToCreate = {
        id: responseData.id, // Use the ID from the JSON
        submittedAt: new Date(responseData.submittedAt), // Convert string to Date
        name: responseData.name,
        email: responseData.email.toLowerCase(),
        position: responseData.position,
        primaryRole: responseData.primaryRole || null,
        developmentPercentage: responseData.developmentPercentage ?? null,
        primaryOS: responseData.primaryOS || null,
        experienceWithOtherOS: responseData.experienceWithOtherOS || [],
        preferredOS: responseData.preferredOS || null,
        osPreferenceReason: responseData.osPreferenceReason || null,
        programmingLanguages: responseData.programmingLanguages || [],
        otherLanguages: responseData.otherLanguages || null,
        developmentType: responseData.developmentType || [],
        otherDevelopmentType: responseData.otherDevelopmentType || null,
        resourceIntensiveEnvironments: responseData.resourceIntensiveEnvironments || false,
        multipleEnvironments: responseData.multipleEnvironments || false,
        terminalImportance: responseData.terminalImportance ?? null,
        clientPresentationFrequency: responseData.clientPresentationFrequency || null,
        largeDataModels: responseData.largeDataModels || false,
        specializedSoftware: responseData.specializedSoftware || false,
        specializedSoftwareList: responseData.specializedSoftwareList || null,
        batteryLifeImportance: responseData.batteryLifeImportance ?? null,
        remoteWorkFrequency: responseData.remoteWorkFrequency || null,
        selectedTools: responseData.selectedTools || [],
        otherTools: responseData.otherTools || null,
        simultaneousApplications: responseData.simultaneousApplications || null,
        multipleWorkspaces: responseData.multipleWorkspaces || false,
        typicalBrowserTabs: responseData.typicalBrowserTabs || null,
        externalDisplays: responseData.externalDisplays || null,
        resourceIntensiveApps: responseData.resourceIntensiveApps || false,
        resourceIntensiveAppsList: responseData.resourceIntensiveAppsList || null,
        matchedToolkitId: responseData.matchedToolkitId || null,
        matchScore: responseData.matchScore ?? null,
    };

    // 7. Create record in Database
    console.log(`Migration: Attempting to create survey response in database for ID: ${dataToCreate.id}`);
    const newSurveyResponse = await prisma.surveyResponse.create({
      data: dataToCreate,
    });
    console.log('Migration: Successfully created survey response in database. ID:', newSurveyResponse.id);
    
    // 8. Return Success
    return NextResponse.json(newSurveyResponse, { status: 201 }); // Created

  } catch (error) {
    console.error('Error processing manual migration request:', error);
    // Check for specific Prisma errors if needed (e.g., invalid data format)
    return NextResponse.json(
      { error: 'Failed to process manual survey migration' },
      { status: 500 }
    );
  }
} 
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { SurveyResponse } from '@/types';
import { withPermission, Permission, AuthenticatedUser } from '@/lib/auth-helpers';

// POST Handler for Manual Migration - requires ADMIN role
export const POST = withPermission(
  Permission.VIEW_SURVEY_RESPONSES, // Using VIEW permission since it's a migration operation
  async (request: NextRequest, user: AuthenticatedUser) => {
    try {
      // Get and Parse JSON Body
      let responseData: Partial<SurveyResponse>;
      try {
        responseData = await request.json();
      } catch (parseError) {
        console.error('Migration failed: Invalid JSON format', parseError);
        return NextResponse.json({ error: 'Invalid JSON format in request body' }, { status: 400 });
      }

      // Basic Validation
      if (!responseData.name || !responseData.email || !responseData.position || !responseData.id || !responseData.submittedAt) {
        return NextResponse.json(
          { error: 'Missing required fields (name, email, position, id, submittedAt)' },
          { status: 400 }
        );
      }

      // Database Duplicate Check (by Email)
      const existingByEmail = await prisma.surveyResponse.findFirst({
        where: { email: { equals: responseData.email.toLowerCase(), mode: 'insensitive' } },
        select: { id: true },
      });

      if (existingByEmail) {
        return NextResponse.json(
          { message: `Skipped: Email ${responseData.email} already exists in database.`, existingId: existingByEmail.id },
          { status: 409 }
        );
      }

      // Database Duplicate Check (by ID)
      const existingById = await prisma.surveyResponse.findUnique({
        where: { id: responseData.id },
        select: { id: true },
      });

      if (existingById) {
        return NextResponse.json(
          { message: `Skipped: ID ${responseData.id} already exists in database.` },
          { status: 409 }
        );
      }

      // Prepare data for creation
      const dataToCreate = {
        id: responseData.id,
        submittedAt: new Date(responseData.submittedAt),
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

      // Create record in Database
      const newSurveyResponse = await prisma.surveyResponse.create({
        data: dataToCreate,
      });

      return NextResponse.json(newSurveyResponse, { status: 201 });
    } catch (error) {
      console.error('Error processing manual migration request:', error);
      return NextResponse.json(
        { error: 'Failed to process manual survey migration' },
        { status: 500 }
      );
    }
  }
); 
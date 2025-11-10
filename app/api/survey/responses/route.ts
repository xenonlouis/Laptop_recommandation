import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { SurveyResponse } from '@/types';
import { withPermission, Permission } from '@/lib/auth-helpers';

// Protected route to get all survey responses
export const GET = withPermission(
  Permission.VIEW_SURVEY_RESPONSES,
  async (request: NextRequest) => {
    try {
      // Fetch all responses from the database using Prisma
      const responses = await prisma.surveyResponse.findMany({
        orderBy: {
          submittedAt: 'desc',
        },
      });

      return NextResponse.json(responses);
    } catch (error) {
      console.error('Error fetching survey responses:', error);
      return NextResponse.json(
        { error: 'Failed to fetch survey responses' },
        { status: 500 }
      );
    }
  }
); 
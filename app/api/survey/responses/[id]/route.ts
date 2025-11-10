import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { SurveyResponse } from '@/types';
import { withPermission, Permission, AuthenticatedUser } from '@/lib/auth-helpers';

interface Params {
  id: string;
}

// Protected route to get a specific survey response
export const GET = withPermission(
  Permission.VIEW_SURVEY_RESPONSES,
  async (request: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<Params> }) => {
    try {
      const { id } = await params;
      
      const response = await prisma.surveyResponse.findUnique({
        where: { id },
      });
      
      if (!response) {
        return NextResponse.json(
          { error: 'Survey response not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(response);
    } catch (error: any) {
      console.error(`Error fetching survey response:`, error);
      if (error instanceof Error && error.message.includes('Invalid uuid')) {
        return NextResponse.json({ error: 'Invalid survey response ID format' }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to fetch survey response' },
        { status: 500 }
      );
    }
  }
);

// Delete survey response - requires DELETE_SURVEY_RESPONSES permission (ADMIN only)
export const DELETE = withPermission(
  Permission.DELETE_SURVEY_RESPONSES,
  async (request: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<Params> }) => {
    try {
      const { id } = await params;
      
      await prisma.surveyResponse.delete({
        where: { id },
      });
      
      return new NextResponse(null, { status: 204 });
    } catch (error: any) {
      console.error(`Error deleting survey response:`, error);
      
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'Survey response not found' }, { status: 404 });
      }
      if (error instanceof Error && error.message.includes('Invalid uuid')) {
        return NextResponse.json({ error: 'Invalid survey response ID format' }, { status: 400 });
      }
      
      return NextResponse.json(
        { error: 'An internal server error occurred during deletion.' },
        { status: 500 }
      );
    }
  }
);

// Update survey response - requires EDIT_SURVEY_RESPONSES permission
export const PUT = withPermission(
  Permission.EDIT_SURVEY_RESPONSES,
  async (request: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<Params> }) => {
    try {
      const { id } = await params;
      const updateData = await request.json();
      
      const updatedResponse = await prisma.surveyResponse.update({
        where: { id },
        data: updateData,
      });
      
      return NextResponse.json(updatedResponse, { status: 200 });
    } catch (error: any) {
      console.error(`Error updating survey response:`, error);
      
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'Survey response not found' }, { status: 404 });
      }
      if (error instanceof Error && error.message.includes('Invalid uuid')) {
        return NextResponse.json({ error: 'Invalid survey response ID format' }, { status: 400 });
      }
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return NextResponse.json(
          { error: 'Cannot update: Email address already in use.' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: 'An internal server error occurred during update.' },
        { status: 500 }
      );
    }
  }
); 
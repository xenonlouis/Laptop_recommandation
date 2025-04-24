import { NextResponse, NextRequest } from 'next/server';
import { Octokit } from '@octokit/rest';
import { SurveyResponse } from '@/types';

// GitHub configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'xenonlouis';
const REPO_NAME = 'Laptop_Survey';
const FILE_PATH = 'data/survey-responses.json';

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
    
    // Initialize GitHub client
    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    
    try {
      const { data: fileData } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
      });
      
      if ('content' in fileData) {
        const content = Buffer.from(fileData.content, 'base64').toString();
        const responses: SurveyResponse[] = JSON.parse(content);
        return NextResponse.json(responses);
      }
      
      return NextResponse.json([]);
    } catch (error) {
      // File doesn't exist yet
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error('Error fetching survey responses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch survey responses' },
      { status: 500 }
    );
  }
} 
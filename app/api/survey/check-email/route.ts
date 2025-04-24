import { NextResponse, NextRequest } from 'next/server';
import { Octokit } from '@octokit/rest';
import { SurveyResponse } from '@/types';

// GitHub configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'xenonlouis';
const REPO_NAME = 'Laptop_Survey';
const FILE_PATH = 'data/survey-responses.json';

export async function GET(request: NextRequest) {
  console.log('Email check started');
  
  try {
    // Get the email from query params
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    console.log('Checking email:', email);
    
    if (!email) {
      console.log('Email parameter missing');
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }
    
    // Initialize GitHub client
    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    console.log('GitHub client initialized for email check');
    
    try {
      console.log('Attempting to get response file for email check...');
      const { data: fileData } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
      });
      
      if ('content' in fileData) {
        const content = Buffer.from(fileData.content, 'base64').toString();
        const responses: SurveyResponse[] = JSON.parse(content);
        console.log('Found responses file with', responses.length, 'responses');
        
        // Check if email exists
        const exists = responses.some(r => 
          r.email.toLowerCase() === email.toLowerCase()
        );
        
        console.log('Email exists:', exists);
        return NextResponse.json({ exists });
      }
      
      // No file or no responses yet
      console.log('No responses file found, email does not exist');
      return NextResponse.json({ exists: false });
    } catch (error) {
      console.log('Error checking file for email:', error);
      // File doesn't exist yet
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking email:', error);
    return NextResponse.json(
      { error: 'Failed to check email' },
      { status: 500 }
    );
  }
} 
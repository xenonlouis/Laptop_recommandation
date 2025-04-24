import { NextResponse, NextRequest } from 'next/server';
import { Octokit } from '@octokit/rest';
import { v4 as uuid } from 'uuid';
import { SurveyResponse, Toolkit, OperatingSystem, UserProfile } from '@/types';
import fs from 'fs/promises';
import path from 'path';

// GitHub configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'xenonlouis';
const REPO_NAME = 'Laptop_Survey';
const FILE_PATH = 'data/survey-responses.json';
const TOOLKITS_FILE_PATH = path.join(process.cwd(), 'data', 'toolkits.json');

// --- Toolkit Matching Logic ---

// Helper function to load toolkits from JSON file
async function loadToolkits(): Promise<Toolkit[]> {
  try {
    const data = await fs.readFile(TOOLKITS_FILE_PATH, 'utf-8');
    return JSON.parse(data) as Toolkit[];
  } catch (error) {
    console.error('Error loading toolkits:', error);
    // Return empty array or throw error depending on desired behavior if file is missing/invalid
    return []; 
  }
}

// Function to calculate the best matching toolkit
async function calculateBestToolkitMatch(
  surveyData: SurveyResponse, 
  toolkits: Toolkit[]
): Promise<{ bestMatch: Toolkit | null; score: number }> {
  let bestMatch: Toolkit | null = null;
  let highestScore = -1;

  // Filter toolkits by preferred/primary OS first (important optimization)
  const relevantOS = surveyData.preferredOS || surveyData.primaryOS;
  const compatibleToolkits = relevantOS 
    ? toolkits.filter(tk => tk.operatingSystem === relevantOS)
    : toolkits; // Consider all if no OS preference

  console.log(`Found ${compatibleToolkits.length} toolkits compatible with OS: ${relevantOS || 'any'}`);

  for (const toolkit of compatibleToolkits) {
    let currentScore = 0;

    // 1. OS Score
    if (surveyData.preferredOS && surveyData.preferredOS === toolkit.operatingSystem) {
      currentScore += 10; // Strong match
    } else if (surveyData.primaryOS === toolkit.operatingSystem) {
      currentScore += 5; // Good match
    }

    // 2. Role Score (Simple mapping - needs refinement based on actual profileNames)
    // TODO: Refine this mapping based on actual Toolkit profileName values
    if (toolkit.profileName.toLowerCase().includes('developer') && surveyData.primaryRole === 'developer') {
      currentScore += 10;
    } else if (toolkit.profileName.toLowerCase().includes('consultant') && surveyData.primaryRole === 'consultant') {
      currentScore += 10;
    }
    
    // 3. Selected Tools Score
    if (toolkit.toolIds && surveyData.selectedTools) {
      const matches = toolkit.toolIds.filter(toolId => surveyData.selectedTools.includes(toolId));
      currentScore += matches.length * 2; // Example: +2 points per matching tool
    }

    // Add more scoring criteria here (Hardware, Workflow etc.) based on SurveyData fields...

    console.log(`Toolkit: ${toolkit.profileName} (${toolkit.operatingSystem}), Score: ${currentScore}`);

    if (currentScore > highestScore) {
      highestScore = currentScore;
      bestMatch = toolkit;
    }
  }

  console.log(`Best match: ${bestMatch?.profileName || 'None'}, Score: ${highestScore}`);
  return { bestMatch, score: highestScore };
}

// -----------------------------

export async function POST(request: NextRequest) {
  console.log('Survey submission started');
  
  try {
    const data = await request.json();
    console.log('Survey data received:', { name: data.name, email: data.email });
    
    // Ensure required fields are present
    if (!data.name || !data.email  || !data.position) {
      console.log('Required fields missing:', { name: !!data.name, email: !!data.email, position: !!data.position });
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      );
    }
    
    // Create a new survey response object (initially without match data)
    const surveyResponseData: SurveyResponse = {
      ...data,
      id: uuid(),
      submittedAt: new Date().toISOString()
    };
    console.log('Created new response object with ID:', surveyResponseData.id);

    // --- Perform Toolkit Matching ---
    const allToolkits = await loadToolkits();
    let matchedToolkitData: { matchedToolkitId: string | null; matchScore: number } = { matchedToolkitId: null, matchScore: -1 };
    let bestMatchingToolkit: Toolkit | null = null;

    if (allToolkits.length > 0) {
      const { bestMatch, score } = await calculateBestToolkitMatch(surveyResponseData, allToolkits);
      bestMatchingToolkit = bestMatch; // Store the full toolkit object for the response
      matchedToolkitData = {
        matchedToolkitId: bestMatch?.id || null,
        matchScore: score
      };
      console.log('Matching complete. Best Toolkit ID:', matchedToolkitData.matchedToolkitId, 'Score:', matchedToolkitData.matchScore);
    } else {
      console.warn('No toolkits loaded, skipping matching.');
    }
    // --------------------------------
    
    // Add matching results to the data before saving
    const finalResponseToSave = {
      ...surveyResponseData,
      ...matchedToolkitData
    };

    // Debug GitHub token
    console.log('GitHub token exists:', !!GITHUB_TOKEN, 'Length:', GITHUB_TOKEN ? GITHUB_TOKEN.length : 0);
    console.log('Repository details:', { owner: REPO_OWNER, repo: REPO_NAME, path: FILE_PATH });
    
    // Initialize GitHub client
    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    console.log('GitHub client initialized');
    
    // Get current file content (if exists)
    let responses: SurveyResponse[] = [];
    let sha: string | undefined;
    
    try {
      console.log('Attempting to get existing response file...');
      const { data: fileData } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
      });
      
      if ('content' in fileData) {
        const content = Buffer.from(fileData.content, 'base64').toString();
        responses = JSON.parse(content);
        sha = fileData.sha;
        console.log('Existing responses found:', responses.length, 'SHA:', sha);
      }
    } catch (error: any) {
      // Only ignore the error if it's specifically a 404 (Not Found)
      if (error.status === 404) {
        console.log('Response file not found (404). Will create a new one.');
        // sha remains undefined, which is correct for creation
      } else {
        // For any other error during getContent, log it and re-throw
        console.error('Error fetching existing response file (not 404):', error);
        throw error; 
      }
    }
    
    // Check for duplicate email
    if (responses.some(r => r.email.toLowerCase() === data.email.toLowerCase())) {
      console.log('Duplicate email found:', data.email);
      return NextResponse.json(
        { error: 'You have already submitted a survey with this email' },
        { status: 409 }
      );
    }
    
    // Add final response (including match data) to the array
    responses.push(finalResponseToSave);
    console.log('Added final response to array, new total:', responses.length);
    
    // Update file in GitHub
    console.log('Attempting to update GitHub file...');
    try {
      // Prepare payload, conditionally adding sha only if it exists (i.e., we are updating)
      const payload: any = {
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
        message: `Add survey response from ${finalResponseToSave.name}`,
        content: Buffer.from(JSON.stringify(responses, null, 2)).toString('base64'),
        branch: 'main'
      };
      if (sha) {
        payload.sha = sha;
      }

      // Log the SHA value and the final payload before sending
      console.log('SHA value being used:', sha);
      console.log('Payload for createOrUpdateFileContents:', payload);

      const result = await octokit.repos.createOrUpdateFileContents(payload);
      
      console.log('GitHub file updated successfully:', result.status);
    } catch (gitError) {
      console.error('GitHub error details:', gitError);
      throw gitError; // Re-throw to be caught by outer catch
    }
    
    console.log('Survey submission completed successfully');
    // Return both the saved survey data and the full matched toolkit object
    return NextResponse.json({
      surveyResponse: finalResponseToSave, 
      matchedToolkit: bestMatchingToolkit
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting survey response:', error);
    return NextResponse.json(
      { error: 'Failed to submit survey response' },
      { status: 500 }
    );
  }
} 
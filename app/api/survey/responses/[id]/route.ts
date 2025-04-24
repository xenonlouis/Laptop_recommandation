import { NextResponse, NextRequest } from 'next/server';
import { Octokit } from '@octokit/rest';
import { SurveyResponse } from '@/types';

// GitHub configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'xenonlouis';
const REPO_NAME = 'Laptop_Survey';
const FILE_PATH = 'data/survey-responses.json';

interface Params {
  id: string;
}

// Protected route to get a specific survey response
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params;
    
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
        const response = responses.find(r => r.id === id);
        
        if (!response) {
          return NextResponse.json(
            { error: 'Survey response not found' },
            { status: 404 }
          );
        }
        
        return NextResponse.json(response);
      }
      
      return NextResponse.json(
        { error: 'Survey response not found' },
        { status: 404 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: 'Survey response not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(`Error fetching survey response with ID ${params.id}:`, error);
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
    const { id } = await params;
    
    // --- Authentication Check (Copied from GET) ---
    const apiKey = request.headers.get('x-api-key');
    const requiredKey = process.env.ADMIN_API_KEY || 'sbaxilobaxi';
    if (apiKey !== requiredKey) {
      console.log('DELETE failed: Unauthorized access');
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }
    console.log('DELETE authentication successful');
    // --- End Auth Check ---
    
    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    let currentResponses: SurveyResponse[] = [];
    let currentSha: string | undefined;

    // 1. Get the current file content and SHA
    try {
      console.log('DELETE: Getting current file content...');
      const { data: fileData } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
      });
      
      if ('content' in fileData && fileData.sha) {
        const content = Buffer.from(fileData.content, 'base64').toString();
        currentResponses = JSON.parse(content);
        currentSha = fileData.sha;
        console.log(`DELETE: Found ${currentResponses.length} responses. SHA: ${currentSha}`);
      } else {
        // Should not happen if deleting, file must exist
        console.error('DELETE failed: File content or SHA missing in getContent response');
        throw new Error('Failed to read existing responses file for deletion.');
      }
    } catch (error: any) {
      console.error('DELETE failed: Error getting file content:', error);
      if (error.status === 404) {
         return NextResponse.json({ error: 'Survey responses file not found.' }, { status: 404 });
      }
      throw new Error('Failed to get existing responses file.');
    }
    
    // 2. Filter out the response to delete
    const initialLength = currentResponses.length;
    const updatedResponses = currentResponses.filter(r => r.id !== id);
    
    if (updatedResponses.length === initialLength) {
      console.warn(`DELETE: Response ID ${id} not found in the data.`);
      // Return 404 or maybe success depending on desired idempotency?
      // Let's return 404 for clarity that the specific item wasn't found.
      return NextResponse.json({ error: 'Survey response with the specified ID not found.' }, { status: 404 });
    }
    
    console.log(`DELETE: Filtered responses. New count: ${updatedResponses.length}`);

    // 3. Write the updated array back to GitHub
    try {
      console.log('DELETE: Updating GitHub file...');
      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
        message: `Delete survey response with ID ${id}`,
        content: Buffer.from(JSON.stringify(updatedResponses, null, 2)).toString('base64'),
        sha: currentSha, // MUST provide SHA for update
      });
      console.log('DELETE: GitHub file updated successfully.');
    } catch (gitError) {
      console.error('DELETE failed: GitHub update error:', gitError);
      throw new Error('Failed to update survey responses file on GitHub.');
    }
    
    // Return success (No Content)
    console.log(`DELETE successful for ID: ${id}`);
    return new NextResponse(null, { status: 204 }); 

  } catch (error: any) {
    console.error(`DELETE failed: Overall error for ID ${params.id}:`, error);
    // Ensure we don't leak sensitive error details
    const message = error instanceof Error ? error.message : 'Failed to delete survey response';
    // Avoid generic messages if it was a specific known issue handled above
    if (message.startsWith('Failed to') || message.startsWith('Survey response') || message.startsWith('Unauthorized')) {
       return NextResponse.json({ error: message }, { status: error.status || 500 });
    }
    // Generic error for unexpected issues
    return NextResponse.json({ error: 'An internal server error occurred during deletion.' }, { status: 500 });
  }
}

// --- PUT FUNCTION ---
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  console.log(`PUT request received for ID: ${params.id}`);
  try {
    const { id } = await params;
    const updateData = await request.json();
    console.log('PUT request body:', updateData);
    
    // --- Authentication Check ---
    const apiKey = request.headers.get('x-api-key');
    const requiredKey = process.env.ADMIN_API_KEY || 'sbaxilobaxi';
    if (apiKey !== requiredKey) {
      console.log('PUT failed: Unauthorized access');
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }
    console.log('PUT authentication successful');
    // --- End Auth Check ---
    
    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    let currentResponses: SurveyResponse[] = [];
    let currentSha: string | undefined;

    // 1. Get current file content and SHA
    try {
      console.log('PUT: Getting current file content...');
      const { data: fileData } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
      });
      
      if ('content' in fileData && fileData.sha) {
        const content = Buffer.from(fileData.content, 'base64').toString();
        currentResponses = JSON.parse(content);
        currentSha = fileData.sha;
        console.log(`PUT: Found ${currentResponses.length} responses. SHA: ${currentSha}`);
      } else {
        console.error('PUT failed: File content or SHA missing.');
        throw new Error('Failed to read existing responses file for update.');
      }
    } catch (error: any) {
      console.error('PUT failed: Error getting file content:', error);
      if (error.status === 404) {
         return NextResponse.json({ error: 'Survey responses file not found.' }, { status: 404 });
      }
      throw new Error('Failed to get existing responses file.');
    }
    
    // 2. Find the index of the response to update
    const responseIndex = currentResponses.findIndex(r => r.id === id);
    
    if (responseIndex === -1) {
      console.warn(`PUT: Response ID ${id} not found in the data.`);
      return NextResponse.json({ error: 'Survey response with the specified ID not found.' }, { status: 404 });
    }
    
    // 3. Update the response data (merge existing with new data)
    // Important: Avoid overwriting the ID or submittedAt timestamp accidentally
    const updatedResponse = {
      ...currentResponses[responseIndex], // Keep existing data
      ...updateData,                     // Apply updates from request body
      id: currentResponses[responseIndex].id, // Ensure ID is not changed
      submittedAt: currentResponses[responseIndex].submittedAt // Ensure submittedAt is not changed
    };
    
    // Create the new array with the updated response
    const updatedResponsesArray = [...currentResponses];
    updatedResponsesArray[responseIndex] = updatedResponse;
    
    console.log(`PUT: Updated response object for ID ${id}:`, updatedResponse);

    // 4. Write the updated array back to GitHub
    try {
      console.log('PUT: Updating GitHub file...');
      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
        message: `Update survey response for ${updatedResponse.name} (ID ${id})`,
        content: Buffer.from(JSON.stringify(updatedResponsesArray, null, 2)).toString('base64'),
        sha: currentSha, // MUST provide SHA for update
      });
      console.log('PUT: GitHub file updated successfully.');
    } catch (gitError) {
      console.error('PUT failed: GitHub update error:', gitError);
      throw new Error('Failed to update survey responses file on GitHub.');
    }
    
    // Return the updated response
    console.log(`PUT successful for ID: ${id}`);
    return NextResponse.json(updatedResponse, { status: 200 }); 

  } catch (error: any) {
    console.error(`PUT failed: Overall error for ID ${params.id}:`, error);
    const message = error instanceof Error ? error.message : 'Failed to update survey response';
    if (message.startsWith('Failed to') || message.startsWith('Survey response') || message.startsWith('Unauthorized')) {
       return NextResponse.json({ error: message }, { status: error.status || 500 });
    }
    return NextResponse.json({ error: 'An internal server error occurred during update.' }, { status: 500 });
  }
} 
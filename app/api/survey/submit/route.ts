import { NextResponse, NextRequest } from 'next/server';
import { v4 as uuid } from 'uuid';
import { SurveyResponse, Toolkit, OperatingSystem, UserProfile } from '@/types';
import fs from 'fs/promises';
import path from 'path';
import prisma from '@/lib/prisma'; // Import the Prisma client instance

// GitHub configuration
// const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
// const REPO_OWNER = 'xenonlouis';
// const REPO_NAME = 'Laptop_Survey';
// const FILE_PATH = 'data/survey-responses.json';
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
  let highestKeyToolScore = -1; // Track key tool score for the best match

  // --- Define Key Tools and Keywords ---
  const keyDeveloperTools: { [id: string]: number } = {
    'tool-1': 5, // VS Code (General Dev)
    'tool-2': 3, // Git (General Dev)
    'tool-3': 3, // Node.js (General Dev)
    'tool-6': 4, // Docker (General Dev)
    'tool-16': 15, // Anypoint Studio (Mulesoft Specific)
    'tool-18': 8,  // Anypoint Platform CLI (Mulesoft Specific)
    'tool-19': 8,  // Salesforce Inspector (SF Specific)
    'tool-22': 10, // Salesforce CLI (SF Specific)
    'tool-23': 10, // Salesforce Extensions for VS Code (SF Specific)
    // Add other key tools and weights as needed
  };
  const specializedKeywords: { [keyword: string]: { profiles: string[], score: number } } = {
    'mulesoft': { profiles: ['integration', 'mulesoft'], score: 10 },
    'salesforce': { profiles: ['salesforce', 'crm', 'admin', 'developer', 'consultant', 'sfmc'], score: 8 },
    'talend': { profiles: ['integration', 'etl', 'data'], score: 8 },
    // Add other keywords
  };
  // -------------------------------------

  // Filter toolkits by preferred/primary OS first
  const relevantOS = surveyData.preferredOS || surveyData.primaryOS;
  const compatibleToolkits = relevantOS 
    ? toolkits.filter(tk => tk.operatingSystem === relevantOS)
    : toolkits;

  console.log(`Found ${compatibleToolkits.length} toolkits compatible with OS: ${relevantOS || 'any'}`);

  for (const toolkit of compatibleToolkits) {
    let currentScore = 0;
    let currentKeyToolScore = 0; // Track key tool score for this toolkit
    const profileNameLower = toolkit.profileName.toLowerCase();

    // --- Scoring Logic --- 

    // 1. OS Score (Keep as is)
    if (surveyData.preferredOS && surveyData.preferredOS === toolkit.operatingSystem) {
      currentScore += 10;
    } else if (surveyData.primaryOS === toolkit.operatingSystem) {
      currentScore += 5;
    }

    // 2. Role Score (Refined)
    const isDeveloperRole = surveyData.primaryRole === 'developer';
    const isConsultantRole = surveyData.primaryRole === 'consultant';
    const isDeveloperToolkit = profileNameLower.includes('developer') || profileNameLower.includes('engineer');
    const isConsultantToolkit = profileNameLower.includes('consultant') || profileNameLower.includes('analyst') || profileNameLower.includes('admin');

    if (isDeveloperToolkit && isDeveloperRole) currentScore += 10;
    if (isConsultantToolkit && isConsultantRole) currentScore += 10;

    // Add points based on development percentage for relevant toolkits
    if (isDeveloperToolkit && surveyData.developmentPercentage && surveyData.developmentPercentage > 50) {
        currentScore += Math.round((surveyData.developmentPercentage - 50) / 10); // +0 to +5 points
    }
    // Slightly penalize dev toolkits if consultant role and low dev percentage?
    // if (isDeveloperToolkit && isConsultantRole && surveyData.developmentPercentage && surveyData.developmentPercentage < 30) {
    //     currentScore -= 5;
    // }

    // 3. Selected Tools Score (Weighted + Track Key Tool Score)
    if (toolkit.toolIds && surveyData.selectedTools) {
      surveyData.selectedTools.forEach(toolId => {
        if (toolkit.toolIds.includes(toolId)) {
          const toolScore = keyDeveloperTools[toolId] || 2;
          currentScore += toolScore;
          if (keyDeveloperTools[toolId]) {
            currentKeyToolScore += toolScore;
          }
        }
      });
    }

    // 4. Specialized Software List Score
    if (surveyData.specializedSoftwareList) {
        const listLower = surveyData.specializedSoftwareList.toLowerCase();
        Object.entries(specializedKeywords).forEach(([keyword, data]) => {
            if (listLower.includes(keyword)) {
                // Check if toolkit profile seems relevant to the keyword
                if (data.profiles.some(pKeyword => profileNameLower.includes(pKeyword))) {
                    currentScore += data.score;
                }
            }
        });
    }
    
    // 5. Terminal Importance Score (Minor influence)
    if (isDeveloperToolkit && surveyData.terminalImportance && surveyData.terminalImportance > 6) {
        currentScore += Math.round(surveyData.terminalImportance / 3); // +2 or +3 points for high importance
    }

    // --- End Scoring Logic --- 

    console.log(`Toolkit: ${toolkit.profileName} (${toolkit.operatingSystem}), Score: ${currentScore}, KeyToolScore: ${currentKeyToolScore}`);

    // --- Update Best Match with Tie-Breaking --- 
    if (currentScore > highestScore) {
      // New highest score, update everything
      highestScore = currentScore;
      highestKeyToolScore = currentKeyToolScore;
      bestMatch = toolkit;
    } else if (currentScore === highestScore) {
      // Tied score, check key tool score
      if (currentKeyToolScore > highestKeyToolScore) {
        // Higher key tool score wins the tie
        highestKeyToolScore = currentKeyToolScore;
        bestMatch = toolkit;
        console.log(` --> Tied score, but new best match due to higher key tool score: ${toolkit.profileName}`);
      }
    }
    // --- End Update Best Match --- 
  }

  console.log(`Best match: ${bestMatch?.profileName || 'None'}, Score: ${highestScore}, KeyToolScore: ${highestKeyToolScore}`);
  // Ensure a minimum score threshold? E.g., if highestScore < 5, return null?
  // if (highestScore < 5) return { bestMatch: null, score: highestScore }; 
  return { bestMatch, score: highestScore };
}

// -----------------------------

export async function POST(request: NextRequest) {
  console.log('Survey submission started - Using Database');
  
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
    
    // --- Database Duplicate Check --- 
    console.log(`Checking for existing email: ${data.email}`);
    const existingResponse = await prisma.surveyResponse.findUnique({
      where: { email: data.email.toLowerCase() }, // Check using lowercase email
    });

    if (existingResponse) {
      console.log('Duplicate email found in database:', data.email);
      return NextResponse.json(
        { error: 'You have already submitted a survey with this email' },
        { status: 409 } // Conflict status code
      );
    }
    console.log('No duplicate email found.');
    // --- End Duplicate Check --- 
    
    // --- Perform Toolkit Matching (Keep as is) ---
    // Note: Matching logic requires the full SurveyResponse shape temporarily
    const allToolkits = await loadToolkits();
    let matchedToolkitData: { matchedToolkitId: string | null; matchScore: number | null } = { matchedToolkitId: null, matchScore: null };
    let bestMatchingToolkit: Toolkit | null = null;

    if (allToolkits.length > 0) {
      // Create a temporary object matching the SurveyResponse type for the matching function
      const tempForMatching: SurveyResponse = {
        // Fields from request body 
        name: data.name,
        email: data.email.toLowerCase(),
        position: data.position,
        primaryRole: data.primaryRole || null,
        developmentPercentage: data.developmentPercentage,
        primaryOS: data.primaryOS || null,
        experienceWithOtherOS: data.experienceWithOtherOS || [],
        preferredOS: data.preferredOS || null,
        osPreferenceReason: data.osPreferenceReason || null,
        programmingLanguages: data.programmingLanguages || [],
        otherLanguages: data.otherLanguages || null,
        developmentType: data.developmentType || [],
        otherDevelopmentType: data.otherDevelopmentType || null,
        resourceIntensiveEnvironments: data.resourceIntensiveEnvironments || false,
        multipleEnvironments: data.multipleEnvironments || false,
        terminalImportance: data.terminalImportance,
        clientPresentationFrequency: data.clientPresentationFrequency || null,
        largeDataModels: data.largeDataModels || false,
        specializedSoftware: data.specializedSoftware || false,
        specializedSoftwareList: data.specializedSoftwareList || null,
        batteryLifeImportance: data.batteryLifeImportance,
        remoteWorkFrequency: data.remoteWorkFrequency || null,
        selectedTools: data.selectedTools || [],
        otherTools: data.otherTools || null,
        simultaneousApplications: data.simultaneousApplications || null,
        multipleWorkspaces: data.multipleWorkspaces || false,
        typicalBrowserTabs: data.typicalBrowserTabs || null,
        externalDisplays: data.externalDisplays || null,
        resourceIntensiveApps: data.resourceIntensiveApps || false,
        resourceIntensiveAppsList: data.resourceIntensiveAppsList || null,
        // Temporary/default values for fields not directly from data but needed for type
        id: 'temp', 
        submittedAt: new Date().toISOString(),
        matchedToolkitId: null, 
        matchScore: null
      };
      
      const { bestMatch, score } = await calculateBestToolkitMatch(tempForMatching, allToolkits);
      bestMatchingToolkit = bestMatch;
      matchedToolkitData = {
        matchedToolkitId: bestMatch?.id || null,
        matchScore: score >= 0 ? score : null // Store score only if valid
      };
      console.log('Matching complete. Best Toolkit ID:', matchedToolkitData.matchedToolkitId, 'Score:', matchedToolkitData.matchScore);
    } else {
      console.warn('No toolkits loaded, skipping matching.');
    }
    // --------------------------------
    
    // Final data object to save to the database - *Explicitly pick fields*
    const dataToSave = {
      // Personal Information
      name: data.name,
      email: data.email.toLowerCase(),
      position: data.position,
      // Role Identification
      primaryRole: data.primaryRole || null,
      developmentPercentage: data.developmentPercentage,
      // OS Preferences
      primaryOS: data.primaryOS || null,
      experienceWithOtherOS: data.experienceWithOtherOS || [],
      preferredOS: data.preferredOS || null,
      osPreferenceReason: data.osPreferenceReason || null,
      // Development Questions
      programmingLanguages: data.programmingLanguages || [],
      otherLanguages: data.otherLanguages || null,
      developmentType: data.developmentType || [],
      otherDevelopmentType: data.otherDevelopmentType || null,
      resourceIntensiveEnvironments: data.resourceIntensiveEnvironments || false,
      multipleEnvironments: data.multipleEnvironments || false,
      terminalImportance: data.terminalImportance,
      // Consultant Questions
      clientPresentationFrequency: data.clientPresentationFrequency || null,
      largeDataModels: data.largeDataModels || false,
      specializedSoftware: data.specializedSoftware || false,
      specializedSoftwareList: data.specializedSoftwareList || null,
      batteryLifeImportance: data.batteryLifeImportance,
      remoteWorkFrequency: data.remoteWorkFrequency || null,
      // Software Tools Section
      selectedTools: data.selectedTools || [],
      otherTools: data.otherTools || null,
      simultaneousApplications: data.simultaneousApplications || null,
      // Workflow Patterns
      multipleWorkspaces: data.multipleWorkspaces || false,
      typicalBrowserTabs: data.typicalBrowserTabs || null,
      externalDisplays: data.externalDisplays || null,
      resourceIntensiveApps: data.resourceIntensiveApps || false,
      resourceIntensiveAppsList: data.resourceIntensiveAppsList || null,
      // Matching Results (calculated above)
      matchedToolkitId: matchedToolkitData.matchedToolkitId,
      matchScore: matchedToolkitData.matchScore,
      // NOTE: id and submittedAt are handled by Prisma defaults
    };

    // --- Create record in Database --- 
    console.log('Attempting to create survey response in database with data:', dataToSave);
    const newSurveyResponse = await prisma.surveyResponse.create({
      data: dataToSave, // Use the explicitly constructed object
    });
    console.log('Successfully created survey response in database. ID:', newSurveyResponse.id);
    // --- End Database Create --- 

    // Return the newly created survey response object from DB
    // Note: Matched toolkit details are not typically returned here unless needed by frontend immediately
    return NextResponse.json({
      surveyResponse: newSurveyResponse, // Return the object created by Prisma
      // matchedToolkit: bestMatchingToolkit // Optionally return full toolkit details if needed
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting survey response (outer catch):', error);
    
    // Check for Prisma specific errors if needed, otherwise return generic 500
    // Example: PrismaClientKnownRequestError for unique constraint violations etc.
    
    // Use the specific duplicate message if caught earlier (shouldn't happen with DB check)
    const errorMessage = (error instanceof Error && error.message.includes('already submitted')) 
                            ? error.message 
                            : 'Failed to submit survey response';
                            
    const status = (error instanceof Error && error.message.includes('already submitted')) ? 409 : 500;

    return NextResponse.json(
      { error: errorMessage },
      { status: status }
    );
  }
} 
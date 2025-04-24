import { SurveyResponse, Toolkit } from '@/types';
import { v4 as uuid } from 'uuid';

/**
 * Checks if a user has already completed a survey
 */
export async function hasCompletedSurvey(email: string): Promise<boolean> {
  if (!email) return false;
  
  try {
    // We'll make a call to check this against our GitHub stored data
    const res = await fetch(`/api/survey/check-email?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) return false;
    
    const data = await res.json();
    return data.exists;
  } catch (error) {
    console.error('Error checking email completion status:', error);
    return false;
  }
}

/**
 * Fetches all survey responses
 */
export async function fetchSurveyResponses(): Promise<SurveyResponse[]> {
  // We'll need an admin key to fetch all responses
  const adminKey = localStorage.getItem("survey-admin-key") || '';
  
  try {
    const res = await fetch('/api/survey/responses', {
      headers: {
        'x-api-key': adminKey
      }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch survey responses');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching survey responses:', error);
    return [];
  }
}

/**
 * Fetches a specific survey response by ID
 */
export async function fetchSurveyResponseById(id: string): Promise<SurveyResponse | null> {
  // We'll need an admin key to fetch a response
  const adminKey = localStorage.getItem("survey-admin-key") || '';
  
  try {
    const res = await fetch(`/api/survey/responses/${id}`, {
      headers: {
        'x-api-key': adminKey
      }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch survey response');
    }
    
    return await res.json();
  } catch (error) {
    console.error(`Error fetching survey response with ID ${id}:`, error);
    return null;
  }
}

/**
 * Creates a new survey response
 */
export async function createSurveyResponse(
  data: Omit<SurveyResponse, 'id' | 'submittedAt' | 'matchedToolkitId' | 'matchScore'>
): Promise<SurveyResponse> {
  try {
    const res = await fetch('/api/survey/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create survey response');
    }
    
    // Return only the saved SurveyResponse (which includes matchId/score)
    const responseData = await res.json(); 
    return responseData.surveyResponse; // Assuming API returns { surveyResponse: ..., matchedToolkit: ...}
  } catch (error) {
    console.error('Error creating survey response:', error);
    throw error;
  }
}

/**
 * Updates an existing survey response
 */
export async function updateSurveyResponse(id: string, data: Partial<SurveyResponse>): Promise<SurveyResponse> {
  // We'll need an admin key to update a response
  const adminKey = localStorage.getItem("survey-admin-key") || '';
  
  try {
    const res = await fetch(`/api/survey/responses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': adminKey
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      throw new Error('Failed to update survey response');
    }
    
    return await res.json();
  } catch (error) {
    console.error(`Error updating survey response with ID ${id}:`, error);
    throw new Error('Failed to update survey response');
  }
}

/**
 * Deletes a survey response
 */
export async function deleteSurveyResponse(id: string): Promise<void> {
  // We'll need an admin key to delete a response
  const adminKey = localStorage.getItem("survey-admin-key") || '';
  
  try {
    const res = await fetch(`/api/survey/responses/${id}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': adminKey
      }
    });
    
    if (!res.ok) {
      throw new Error('Failed to delete survey response');
    }
  } catch (error) {
    console.error(`Error deleting survey response with ID ${id}:`, error);
    throw new Error('Failed to delete survey response');
  }
} 
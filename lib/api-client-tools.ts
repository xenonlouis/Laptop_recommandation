import { Tool, ToolkitItem } from '@/types';

// Future implementation: Tools will be stored separately and referenced by ID in toolkits
export interface ToolDetails extends Omit<ToolkitItem, 'id'> {
  id: string
  createdAt: string
  updatedAt: string
  usageCount: number
  popularity: number // 0-10 scale based on usage metrics
  icon?: string // URL to the tool's icon/logo
}

// This file handles the API calls for the tools functionality

/**
 * Fetch all tools
 */
export async function fetchTools(): Promise<ToolDetails[]> {
  try {
    const res = await fetch('/api/tools');
    
    if (!res.ok) {
      throw new Error(`Failed to fetch tools: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching tools:", error);
    throw error;
  }
}

/**
 * Fetch a single tool by ID
 */
export async function fetchToolById(id: string): Promise<ToolDetails> {
  try {
    const res = await fetch(`/api/tools/${id}`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch tool: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error(`Error fetching tool with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new tool
 */
export async function createTool(toolData: Omit<ToolDetails, "id">): Promise<ToolDetails> {
  try {
    const res = await fetch('/api/tools', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toolData),
    });
    
    if (!res.ok) {
      throw new Error(`Failed to create tool: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error("Error creating tool:", error);
    throw error;
  }
}

/**
 * Update an existing tool
 */
export async function updateTool(id: string, toolData: Partial<ToolDetails>): Promise<ToolDetails> {
  try {
    const res = await fetch(`/api/tools/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toolData),
    });
    
    if (!res.ok) {
      throw new Error(`Failed to update tool: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error(`Error updating tool with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a tool
 */
export async function deleteTool(id: string): Promise<void> {
  try {
    const res = await fetch(`/api/tools/${id}`, {
      method: 'DELETE',
    });
    
    if (!res.ok) {
      throw new Error(`Failed to delete tool: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error(`Error deleting tool with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch tools by category
 */
export async function fetchToolsByCategory(category: string): Promise<ToolDetails[]> {
  try {
    const res = await fetch(`/api/tools/category/${category}`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch tools by category: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error(`Error fetching tools for category ${category}:`, error);
    throw error;
  }
}

// Track tool usage for analytics
export async function trackToolUsage(toolId: string): Promise<{ message: string }> {
  try {
    const response = await fetch(`/api/tools/${toolId}/track`, {
      method: 'POST'
    })
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    
    return response.json()
  } catch (error) {
    console.error('Error tracking tool usage:', error)
    throw error
  }
}

// Get popular tools based on usage metrics
export async function fetchPopularTools(limit: number = 10): Promise<ToolDetails[]> {
  try {
    const response = await fetch(`/api/tools/popular?limit=${limit}`)
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching popular tools:', error)
    throw error
  }
} 
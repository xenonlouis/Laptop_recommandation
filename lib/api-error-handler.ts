/**
 * API Error Handler
 * Provides graceful error handling with user-friendly messages
 */

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  isPermissionError: boolean;
  isAuthError: boolean;
}

/**
 * Parse API error response and return user-friendly error
 */
export async function handleApiError(response: Response): Promise<ApiError> {
  let errorMessage = "An unexpected error occurred";
  let errorData: any = {};

  try {
    errorData = await response.json();
    errorMessage = errorData.error || errorMessage;
  } catch {
    // If response is not JSON, use status text
    errorMessage = response.statusText || errorMessage;
  }

  const status = response.status;
  const isAuthError = status === 401;
  const isPermissionError = status === 403;

  // Provide user-friendly messages for common errors
  if (isAuthError) {
    errorMessage = "You need to be logged in to perform this action.";
  } else if (isPermissionError) {
    // Extract permission name from error message if available
    const permissionMatch = errorMessage.match(/Forbidden: (.+) permission required/i);
    if (permissionMatch) {
      const permission = permissionMatch[1];
      errorMessage = `You don't have permission to ${getPermissionAction(permission)}. Please contact an administrator if you need access.`;
    } else {
      errorMessage = "You don't have permission to perform this action. Please contact an administrator if you need access.";
    }
  } else if (status === 404) {
    errorMessage = "The requested resource was not found.";
  } else if (status === 500) {
    errorMessage = "A server error occurred. Please try again later.";
  }

  return {
    message: errorMessage,
    status,
    code: errorData.code,
    isPermissionError,
    isAuthError,
  };
}

/**
 * Get user-friendly action description from permission name
 */
function getPermissionAction(permission: string): string {
  const actionMap: Record<string, string> = {
    MANAGE_LAPTOPS: "manage laptops",
    MANAGE_ACCESSORIES: "manage accessories",
    MANAGE_TOOLS: "manage tools",
    MANAGE_TOOLKITS: "manage toolkits",
    MANAGE_PACKAGES: "manage packages",
    MANAGE_PEOPLE: "manage people",
    NOTION_SYNC: "sync with Notion",
    VIEW_SURVEY_RESPONSES: "view survey responses",
    EDIT_SURVEY_RESPONSES: "edit survey responses",
    DELETE_SURVEY_RESPONSES: "delete survey responses",
  };

  return actionMap[permission] || "perform this action";
}

/**
 * Wrapper for fetch that handles errors gracefully
 */
export async function fetchWithErrorHandling(
  url: string,
  options?: RequestInit
): Promise<Response> {
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await handleApiError(response);
    throw error;
  }

  return response;
}


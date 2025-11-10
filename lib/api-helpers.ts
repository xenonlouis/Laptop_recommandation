/**
 * Wrapper function for API calls with graceful error handling
 * This ensures all API errors are handled consistently
 */
export async function apiCall<T>(
  fetchPromise: Promise<Response>
): Promise<T> {
  try {
    const response = await fetchPromise;
    
    if (!response.ok) {
      const { handleApiError } = await import("./api-error-handler");
      const error = await handleApiError(response);
      throw error;
    }
    
    return await response.json();
  } catch (error) {
    // Re-throw ApiError as-is, wrap others
    if (error && typeof error === 'object' && 'isPermissionError' in error) {
      throw error;
    }
    
    // Wrap unexpected errors
    throw {
      message: error instanceof Error ? error.message : "An unexpected error occurred",
      status: 0,
      isPermissionError: false,
      isAuthError: false,
    };
  }
}


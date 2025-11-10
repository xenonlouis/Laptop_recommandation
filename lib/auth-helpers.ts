import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { UserRole, Permission, hasPermission } from "@/lib/permissions";

// Re-export Permission for convenience
export { Permission, UserRole } from "@/lib/permissions";

export interface AuthenticatedUser {
  id: string;
  email: string;
  name?: string | null;
  role: UserRole;
}

/**
 * Get the current authenticated user from the session
 */
export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  const session = await auth();
  
  if (!session?.user) {
    return null;
  }

  return {
    id: (session.user as any).id,
    email: session.user.email!,
    name: session.user.name,
    role: (session.user as any).role as UserRole,
  };
}

/**
 * Require authentication - throws error if not authenticated
 */
export async function requireAuth(): Promise<AuthenticatedUser> {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Unauthorized: Authentication required");
  }
  
  return user;
}

/**
 * Require a specific role - throws error if user doesn't have the role
 */
export async function requireRole(requiredRole: UserRole): Promise<AuthenticatedUser> {
  const user = await requireAuth();
  
  if (user.role !== requiredRole) {
    throw new Error(`Forbidden: ${requiredRole} role required`);
  }
  
  return user;
}

/**
 * Require a specific permission - throws error if user doesn't have the permission
 */
export async function requirePermission(permission: Permission): Promise<AuthenticatedUser> {
  const user = await requireAuth();
  
  if (!hasPermission(user.role, permission)) {
    throw new Error(`Forbidden: ${permission} permission required`);
  }
  
  return user;
}

/**
 * Check if user has a specific permission (non-throwing)
 */
export async function hasUserPermission(permission: Permission): Promise<boolean> {
  try {
    await requirePermission(permission);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if user has a specific role (non-throwing)
 */
export async function hasUserRole(role: UserRole): Promise<boolean> {
  try {
    await requireRole(role);
    return true;
  } catch {
    return false;
  }
}

/**
 * API route wrapper that requires authentication
 */
export function withAuth(
  handler: (req: NextRequest, user: AuthenticatedUser, ...args: any[]) => Promise<NextResponse>
) {
  return async (req: NextRequest, ...args: any[]) => {
    try {
      const user = await requireAuth();
      return await handler(req, user, ...args);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Unauthorized" },
        { status: error.message?.includes("Forbidden") ? 403 : 401 }
      );
    }
  };
}

/**
 * API route wrapper that requires a specific role
 */
export function withRole(
  role: UserRole,
  handler: (req: NextRequest, user: AuthenticatedUser, ...args: any[]) => Promise<NextResponse>
) {
  return async (req: NextRequest, ...args: any[]) => {
    try {
      const user = await requireRole(role);
      return await handler(req, user, ...args);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Unauthorized" },
        { status: error.message?.includes("Forbidden") ? 403 : 401 }
      );
    }
  };
}

/**
 * API route wrapper that requires a specific permission
 */
export function withPermission(
  permission: Permission,
  handler: (req: NextRequest, user: AuthenticatedUser, ...args: any[]) => Promise<NextResponse>
) {
  return async (req: NextRequest, ...args: any[]) => {
    try {
      const user = await requirePermission(permission);
      return await handler(req, user, ...args);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Unauthorized" },
        { status: error.message?.includes("Forbidden") ? 403 : 401 }
      );
    }
  };
}


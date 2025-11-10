"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { Permission, UserRole, hasPermission } from "@/lib/permissions";

/**
 * Hook to check user permissions
 */
export function usePermissions() {
  const { data: session, status } = useSession();

  const userRole = useMemo(() => {
    if (!session?.user) return null;
    return (session.user as any).role as UserRole | null;
  }, [session]);

  const hasPermissionCheck = useMemo(() => {
    if (!userRole) return () => false;
    
    return (permission: Permission): boolean => {
      return hasPermission(userRole, permission);
    };
  }, [userRole]);

  const hasRole = useMemo(() => {
    if (!userRole) return () => false;
    
    return (role: UserRole): boolean => {
      return userRole === role;
    };
  }, [userRole]);

  const isAdmin = useMemo(() => {
    return userRole === UserRole.ADMIN;
  }, [userRole]);

  const isManager = useMemo(() => {
    return userRole === UserRole.MANAGER;
  }, [userRole]);

  const isViewer = useMemo(() => {
    return userRole === UserRole.VIEWER;
  }, [userRole]);

  return {
    userRole,
    hasPermission: hasPermissionCheck,
    hasRole,
    isAdmin,
    isManager,
    isViewer,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
}


"use client";

import { ReactNode } from "react";
import { Permission, UserRole } from "@/lib/permissions";
import { usePermissions } from "@/hooks/use-permissions";

interface PermissionGateProps {
  permission?: Permission;
  role?: UserRole;
  fallback?: ReactNode;
  children: ReactNode;
  showFallback?: boolean;
}

/**
 * Component that conditionally renders children based on user permissions
 * 
 * @example
 * <PermissionGate permission={Permission.MANAGE_LAPTOPS}>
 *   <Button>Add Laptop</Button>
 * </PermissionGate>
 * 
 * @example
 * <PermissionGate 
 *   permission={Permission.MANAGE_LAPTOPS}
 *   fallback={<p>You don't have permission</p>}
 *   showFallback
 * >
 *   <Button>Add Laptop</Button>
 * </PermissionGate>
 */
export function PermissionGate({
  permission,
  role,
  fallback = null,
  children,
  showFallback = false,
}: PermissionGateProps) {
  const { hasPermission, hasRole, isLoading } = usePermissions();

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  // Check permission if provided
  if (permission && !hasPermission(permission)) {
    return showFallback ? <>{fallback}</> : null;
  }

  // Check role if provided
  if (role && !hasRole(role)) {
    return showFallback ? <>{fallback}</> : null;
  }

  // User has permission/role, render children
  return <>{children}</>;
}

/**
 * Higher-order component version for class components or functional components
 */
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  permission: Permission,
  fallback?: ReactNode
) {
  return function PermissionWrappedComponent(props: P) {
    return (
      <PermissionGate permission={permission} fallback={fallback}>
        <Component {...props} />
      </PermissionGate>
    );
  };
}


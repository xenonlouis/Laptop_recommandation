"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

interface RequireRoleProps {
  children: ReactNode;
  role: string;
  fallback?: ReactNode;
}

export function RequireRole({ children, role, fallback = null }: RequireRoleProps) {
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role;

  if (userRole === role) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}


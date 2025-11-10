// Role definitions
export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  VIEWER = "VIEWER",
}

// Permission definitions
export enum Permission {
  // View permissions
  VIEW_HOME = "VIEW_HOME",
  VIEW_PACKAGES = "VIEW_PACKAGES",
  VIEW_PEOPLE = "VIEW_PEOPLE",
  VIEW_TOOLKITS = "VIEW_TOOLKITS",
  VIEW_SURVEY_RESPONSES = "VIEW_SURVEY_RESPONSES",
  
  // Write permissions
  SUBMIT_SURVEY = "SUBMIT_SURVEY",
  EDIT_SURVEY_RESPONSES = "EDIT_SURVEY_RESPONSES",
  DELETE_SURVEY_RESPONSES = "DELETE_SURVEY_RESPONSES",
  
  // CRUD permissions
  MANAGE_LAPTOPS = "MANAGE_LAPTOPS",
  MANAGE_ACCESSORIES = "MANAGE_ACCESSORIES",
  MANAGE_TOOLS = "MANAGE_TOOLS",
  MANAGE_TOOLKITS = "MANAGE_TOOLKITS",
  MANAGE_PACKAGES = "MANAGE_PACKAGES",
  MANAGE_PEOPLE = "MANAGE_PEOPLE",
  
  // Admin permissions
  NOTION_SYNC = "NOTION_SYNC",
  MANAGE_USERS = "MANAGE_USERS",
}

// Role to permissions mapping
export const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    // View all
    Permission.VIEW_HOME,
    Permission.VIEW_PACKAGES,
    Permission.VIEW_PEOPLE,
    Permission.VIEW_TOOLKITS,
    Permission.VIEW_SURVEY_RESPONSES,
    
    // Survey
    Permission.SUBMIT_SURVEY,
    Permission.EDIT_SURVEY_RESPONSES,
    Permission.DELETE_SURVEY_RESPONSES,
    
    // CRUD all
    Permission.MANAGE_LAPTOPS,
    Permission.MANAGE_ACCESSORIES,
    Permission.MANAGE_TOOLS,
    Permission.MANAGE_TOOLKITS,
    Permission.MANAGE_PACKAGES,
    Permission.MANAGE_PEOPLE,
    
    // Admin only
    Permission.NOTION_SYNC,
    Permission.MANAGE_USERS,
  ],
  
  [UserRole.MANAGER]: [
    // View all
    Permission.VIEW_HOME,
    Permission.VIEW_PACKAGES,
    Permission.VIEW_PEOPLE,
    Permission.VIEW_TOOLKITS,
    Permission.VIEW_SURVEY_RESPONSES,
    
    // Survey
    Permission.SUBMIT_SURVEY,
    Permission.EDIT_SURVEY_RESPONSES,
    
    // CRUD all (no delete)
    Permission.MANAGE_LAPTOPS,
    Permission.MANAGE_ACCESSORIES,
    Permission.MANAGE_TOOLS,
    Permission.MANAGE_TOOLKITS,
    Permission.MANAGE_PACKAGES,
    Permission.MANAGE_PEOPLE,
  ],
  
  [UserRole.VIEWER]: [
    // View only
    Permission.VIEW_HOME,
    Permission.VIEW_PACKAGES,
    Permission.VIEW_PEOPLE,
    Permission.VIEW_TOOLKITS,
    Permission.VIEW_SURVEY_RESPONSES,
    
    // Can submit surveys
    Permission.SUBMIT_SURVEY,
  ],
};

// Helper function to check if a role has a permission
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

// Helper function to check if a role string has a permission
export function roleHasPermission(role: string, permission: Permission): boolean {
  return hasPermission(role as UserRole, permission);
}


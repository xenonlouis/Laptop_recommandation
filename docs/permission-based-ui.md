# Permission-Based UI & Graceful Error Handling

This guide explains how to implement graceful permission denial and hide UI elements based on user permissions.

## Overview

We've implemented:
1. **Graceful Error Handling** - User-friendly error messages instead of console errors
2. **Permission-Based UI** - Hide/show buttons and components based on permissions
3. **Permission Hooks** - Easy-to-use hooks for checking permissions

## Components & Utilities

### 1. Permission Gate Component

Wrap any UI element to conditionally render it based on permissions:

```tsx
import { PermissionGate } from "@/components/auth/permission-gate"
import { Permission } from "@/lib/permissions"

// Hide button if user doesn't have permission
<PermissionGate permission={Permission.MANAGE_LAPTOPS}>
  <Button onClick={handleAddLaptop}>Add Laptop</Button>
</PermissionGate>

// Show fallback message if no permission
<PermissionGate 
  permission={Permission.MANAGE_LAPTOPS}
  fallback={<p className="text-muted-foreground">You need admin access</p>}
  showFallback
>
  <Button>Add Laptop</Button>
</PermissionGate>

// Check by role instead
<PermissionGate role={UserRole.ADMIN}>
  <Button>Admin Only</Button>
</PermissionGate>
```

### 2. usePermissions Hook

Check permissions programmatically:

```tsx
import { usePermissions } from "@/hooks/use-permissions"
import { Permission } from "@/lib/permissions"

function MyComponent() {
  const { hasPermission, isAdmin, isManager, isViewer, userRole } = usePermissions()

  if (hasPermission(Permission.MANAGE_LAPTOPS)) {
    // Show admin UI
  }

  return (
    <div>
      {isAdmin && <AdminPanel />}
      {isManager && <ManagerPanel />}
      {isViewer && <ViewerPanel />}
    </div>
  )
}
```

### 3. API Error Handler

All API errors are now handled gracefully with user-friendly messages:

```tsx
import { createLaptop } from "@/lib/api-client"
import { ApiError } from "@/lib/api-error-handler"
import { useToast } from "@/hooks/use-toast"

async function handleAddLaptop() {
  try {
    await createLaptop(laptopData)
    toast({ title: "Success", description: "Laptop added!" })
  } catch (err) {
    const error = err as ApiError
    
    // Error is automatically formatted with user-friendly message
    toast({
      title: error.isPermissionError ? "Permission Denied" : "Error",
      description: error.message, // Already user-friendly!
    })
  }
}
```

## Error Messages

The error handler automatically converts technical errors to user-friendly messages:

- **403 Forbidden**: "You don't have permission to manage laptops. Please contact an administrator if you need access."
- **401 Unauthorized**: "You need to be logged in to perform this action."
- **404 Not Found**: "The requested resource was not found."
- **500 Server Error**: "A server error occurred. Please try again later."

## Examples

### Example 1: Hide Button Based on Permission

```tsx
// Before: Button always visible, shows error when clicked
<Button onClick={handleAddLaptop}>Add Laptop</Button>

// After: Button only visible if user has permission
<PermissionGate permission={Permission.MANAGE_LAPTOPS}>
  <Button onClick={handleAddLaptop}>Add Laptop</Button>
</PermissionGate>
```

### Example 2: Conditional Menu Items

```tsx
<DropdownMenuContent>
  <DropdownMenuItem>View</DropdownMenuItem>
  
  <PermissionGate permission={Permission.MANAGE_LAPTOPS}>
    <DropdownMenuItem onClick={handleEdit}>
      <Pencil className="h-4 w-4 mr-2" />
      Edit
    </DropdownMenuItem>
  </PermissionGate>
  
  <PermissionGate permission={Permission.MANAGE_LAPTOPS}>
    <DropdownMenuItem onClick={handleDelete} className="text-destructive">
      <Trash2 className="h-4 w-4 mr-2" />
      Delete
    </DropdownMenuItem>
  </PermissionGate>
</DropdownMenuContent>
```

### Example 3: Entire Sections

```tsx
<PermissionGate permission={Permission.NOTION_SYNC}>
  <Card>
    <CardHeader>
      <CardTitle>Notion Sync</CardTitle>
    </CardHeader>
    <CardContent>
      <Button onClick={handleSync}>Sync Now</Button>
    </CardContent>
  </Card>
</PermissionGate>
```

### Example 4: Error Handling in API Calls

```tsx
// Before: Console error, generic toast
try {
  await createLaptop(data)
} catch (err) {
  console.error("Error:", err) // ❌ Console error
  toast({
    title: "Error",
    description: "Failed to add laptop", // ❌ Generic message
  })
}

// After: User-friendly error message
try {
  await createLaptop(data)
  toast({ title: "Success", description: "Laptop added!" })
} catch (err) {
  const error = err as ApiError
  toast({
    title: error.isPermissionError ? "Permission Denied" : "Error",
    description: error.message, // ✅ User-friendly message
  })
}
```

## Available Permissions

- `Permission.MANAGE_LAPTOPS` - Create/edit/delete laptops
- `Permission.MANAGE_ACCESSORIES` - Manage accessories
- `Permission.MANAGE_TOOLS` - Manage tools
- `Permission.MANAGE_TOOLKITS` - Manage toolkits
- `Permission.MANAGE_PACKAGES` - Manage packages
- `Permission.MANAGE_PEOPLE` - Manage people
- `Permission.NOTION_SYNC` - Sync with Notion (Admin only)
- `Permission.VIEW_SURVEY_RESPONSES` - View survey responses
- `Permission.EDIT_SURVEY_RESPONSES` - Edit survey responses
- `Permission.DELETE_SURVEY_RESPONSES` - Delete survey responses

## Role-Based Access

- **ADMIN**: All permissions
- **MANAGER**: Can manage content (no delete, no Notion sync)
- **VIEWER**: Read-only access + can submit surveys

## Best Practices

1. **Hide UI elements** rather than showing disabled buttons
2. **Use PermissionGate** for conditional rendering
3. **Always handle errors gracefully** with user-friendly messages
4. **Check permissions on both client and server** (server is source of truth)
5. **Use the error handler** for all API calls to get consistent error messages

## Migration Guide

To update existing code:

1. **Wrap buttons/actions** with `PermissionGate`
2. **Update error handling** to use `ApiError` type
3. **Remove console.error** calls - errors are handled automatically
4. **Use toast notifications** for user feedback

Example migration:

```tsx
// Old code
<Button onClick={handleAdd}>Add</Button>
// ... in handler
catch (err) {
  console.error(err)
  toast({ title: "Error", description: "Failed" })
}

// New code
<PermissionGate permission={Permission.MANAGE_LAPTOPS}>
  <Button onClick={handleAdd}>Add</Button>
</PermissionGate>
// ... in handler
catch (err) {
  const error = err as ApiError
  toast({
    title: error.isPermissionError ? "Permission Denied" : "Error",
    description: error.message,
  })
}
```


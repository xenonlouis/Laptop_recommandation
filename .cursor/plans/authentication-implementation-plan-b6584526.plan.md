<!-- b6584526-8b47-4ab5-a1dc-cd7e20c820d1 220e7c1f-9f4a-4088-afe8-39d277ec6744 -->
# Fix NextAuth v5 Beta Build Errors

## Issues Identified

NextAuth v5 beta has breaking API changes from v4. The following files need updates:

### 1. Route Handler API (`app/api/auth/[...nextauth]/route.ts`)

- **Issue**: NextAuth v5 uses `auth()` function instead of `NextAuth()` constructor
- **Fix**: Update to use the new v5 route handler pattern

### 2. Server Session Import (`lib/auth-helpers.ts`)

- **Issue**: `getServerSession` import path may be incorrect for v5
- **Fix**: Update import to use correct v5 path or use `auth()` helper

### 3. Type Definitions (`lib/auth.ts`)

- **Issue**: `NextAuthOptions` type may have changed in v5
- **Fix**: Update type imports and configuration structure

### 4. Client-side SignIn (`app/login/page.tsx`)

- **Issue**: `signIn` function API may have changed
- **Fix**: Update to use v5 compatible signIn API

## Implementation Steps

1. **Update route handler** (`app/api/auth/[...nextauth]/route.ts`)

- Replace `NextAuth(authOptions)` with v5 `auth()` pattern
- Export GET and POST handlers correctly

2. **Fix server session helper** (`lib/auth-helpers.ts`)

- Update `getServerSession` import or use `auth()` helper from v5
- Ensure compatibility with Next.js 15 App Router

3. **Update auth configuration** (`lib/auth.ts`)

- Verify `NextAuthOptions` type compatibility
- Ensure adapter configuration works with v5

4. **Fix client-side auth** (`app/login/page.tsx`)

- Verify `signIn` function works with v5 API
- Update error handling if needed

5. **Add type declarations** (if needed)

- Create or update `types/next-auth.d.ts` for custom session types
- Ensure role field is properly typed

## Files to Modify

- `app/api/auth/[...nextauth]/route.ts` - Route handler
- `lib/auth-helpers.ts` - Server session helper
- `lib/auth.ts` - Auth configuration (if types need fixing)
- `app/login/page.tsx` - Client signIn (if API changed)
- `types/next-auth.d.ts` - Type declarations (create if needed)

### To-dos

- [ ] Install NextAuth.js and configure basic setup with email/password provider
- [ ] Add User, Account, Session models to Prisma schema and run migration
- [ ] Create NextAuth configuration file with providers and session strategy
- [ ] Create NextAuth API route handler at /api/auth/[...nextauth]
- [ ] Create authentication helper functions for API route protection
- [ ] Replace all API key checks in protected routes with NextAuth middleware
- [ ] Create login page UI component
- [ ] Update frontend pages to use NextAuth session instead of localStorage API key
- [ ] Remove hardcoded API keys and localStorage authentication code
- [ ] Create .env.example file with required authentication variables
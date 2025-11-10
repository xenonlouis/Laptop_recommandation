# How to Deploy Environment Variables to Vercel

There are several ways to push your environment variables to Vercel. Here are the most common methods:

## Method 1: Using Vercel Dashboard (Recommended)

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project → **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: Variable name (e.g., `DATABASE_URL`)
   - **Value**: Variable value
   - **Environment**: Select where it applies (Production, Preview, Development)
4. Click **Save**
5. Redeploy your application for changes to take effect

## Method 2: Using Vercel CLI

### Install Vercel CLI (if not already installed)
```bash
npm i -g vercel
# or
pnpm add -g vercel
```

### Login to Vercel
```bash
vercel login
```

### Link your project (if not already linked)
```bash
vercel link
```

### Push environment variables from your .env file

**Option A: Push all variables from .env file**
```bash
# This will read your .env file and push all variables
vercel env pull .env.production
# Then push them back
vercel env add DATABASE_URL production
vercel env add AUTH_SECRET production
# ... repeat for each variable
```

**Option B: Push variables one by one**
```bash
vercel env add DATABASE_URL production
# Enter the value when prompted, or pipe it:
echo "your-database-url" | vercel env add DATABASE_URL production

vercel env add AUTH_SECRET production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
vercel env add NOTION_API_KEY production
vercel env add NOTION_PACKAGES_DATABASE_ID production
vercel env add NOTION_LAPTOPS_DATABASE_ID production
vercel env add NOTION_ACCESSORIES_DATABASE_ID production
vercel env add NOTION_PEOPLE_DATABASE_ID production
```

### Push to all environments (Production, Preview, Development)
```bash
vercel env add DATABASE_URL production preview development
```

## Method 3: Using a Script (Automated)

Create a script to push all variables at once:

```bash
#!/bin/bash
# push-env-to-vercel.sh

# Read from .env file and push to Vercel
while IFS='=' read -r key value; do
  # Skip comments and empty lines
  [[ $key =~ ^#.*$ ]] && continue
  [[ -z $key ]] && continue
  
  # Remove quotes from value
  value=$(echo "$value" | sed 's/^"\(.*\)"$/\1/')
  
  echo "Adding $key to Vercel..."
  echo "$value" | vercel env add "$key" production preview development
done < .env
```

Make it executable and run:
```bash
chmod +x push-env-to-vercel.sh
./push-env-to-vercel.sh
```

## Method 4: Using Vercel CLI with .env file (Bulk Import)

You can also use a script to bulk import:

```bash
# Install jq if needed: brew install jq (Mac) or apt-get install jq (Linux)

# Convert .env to JSON and push
cat .env | grep -v '^#' | grep -v '^$' | while IFS='=' read -r key value; do
  echo "{\"key\":\"$key\",\"value\":\"$value\"}" | vercel env add "$key" production preview development
done
```

## Required Environment Variables for Your Project

Based on your codebase, you need these variables:

### Required:
- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SECRET` or `NEXTAUTH_SECRET` - NextAuth.js secret (generate with: `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Your app URL (e.g., `https://your-app.vercel.app`)

### Optional (for Notion Sync):
- `NOTION_API_KEY`
- `NOTION_PACKAGES_DATABASE_ID`
- `NOTION_LAPTOPS_DATABASE_ID`
- `NOTION_ACCESSORIES_DATABASE_ID`
- `NOTION_PEOPLE_DATABASE_ID`

## Important Notes

1. **Never commit .env files** - They're already in `.gitignore`
2. **Use different values for production** - Don't use development secrets in production
3. **Redeploy after adding variables** - Changes take effect on next deployment
4. **Environment-specific variables** - You can set different values for Production, Preview, and Development
5. **Secret values** - Vercel will mask secret values in the dashboard for security

## Quick Command Reference

```bash
# List all environment variables
vercel env ls

# Remove an environment variable
vercel env rm VARIABLE_NAME production

# Pull environment variables (download from Vercel to local .env)
vercel env pull .env.production

# Push a single variable
vercel env add VARIABLE_NAME production

# Push to all environments
vercel env add VARIABLE_NAME production preview development
```

## After Pushing Variables

1. **Redeploy your application**:
   ```bash
   vercel --prod
   ```
   Or trigger a redeploy from the Vercel dashboard

2. **Verify variables are set**:
   - Check in Vercel Dashboard → Settings → Environment Variables
   - Or check in your app: `console.log(process.env.DATABASE_URL)` (remove after testing!)

## Troubleshooting

- **Variables not appearing?** Make sure you redeployed after adding them
- **Wrong environment?** Check that you selected the correct environment (Production/Preview/Development)
- **Can't access variables?** Ensure they're set for the environment you're deploying to


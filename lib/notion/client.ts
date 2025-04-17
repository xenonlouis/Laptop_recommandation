import { Client } from '@notionhq/client';

// Initialize Notion client
export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Database IDs
export const databaseIds = {
  packages: process.env.NOTION_PACKAGES_DATABASE_ID,
  laptops: process.env.NOTION_LAPTOPS_DATABASE_ID,
  accessories: process.env.NOTION_ACCESSORIES_DATABASE_ID,
  people: process.env.NOTION_PEOPLE_DATABASE_ID,
};

// Check if required environment variables are set
export function validateNotionConfig() {
  const requiredEnvVars = [
    'NOTION_API_KEY',
    'NOTION_PACKAGES_DATABASE_ID',
    'NOTION_LAPTOPS_DATABASE_ID',
    'NOTION_ACCESSORIES_DATABASE_ID',
    'NOTION_PEOPLE_DATABASE_ID',
  ];

  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    return false;
  }

  return true;
} 
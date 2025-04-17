import { notionClient, databaseIds } from './client';

// Configure Kanban view for a Notion database
export async function setupKanbanView(databaseId: string, statusProperty: string) {
  try {
    console.log(`Setting up Kanban view for database ${databaseId}...`);
    
    // First, retrieve the database to check existing views
    const database = await notionClient.databases.retrieve({
      database_id: databaseId
    });
    
    // The Notion API doesn't expose views.create, so we'll need to use the web interface
    // to create Kanban views. This function will output instructions instead.
    let databaseName = 'Database';
    
    // Safely attempt to get the database name from response
    // @ts-ignore - Handle API type inconsistencies
    if (database.title && Array.isArray(database.title)) {
      // @ts-ignore
      databaseName = database.title[0]?.plain_text || 'Database';
    }
    
    console.log(`
      INSTRUCTIONS TO CREATE KANBAN VIEW:
      1. Open the Notion database: https://www.notion.so/${databaseId.replace(/-/g, '')}
      2. Click on 'New view' (+ button)
      3. Select 'Board'
      4. Choose '${statusProperty}' as the grouping property
      5. Rename the view to '${databaseName} Board'
    `);
    
    return `https://www.notion.so/${databaseId.replace(/-/g, '')}`;
  } catch (error) {
    console.error('Error setting up Kanban view:', error);
    throw error;
  }
}

// Set up Kanban views for all databases
export async function setupAllKanbanViews() {
  try {
    const results = {
      packages: await setupKanbanView(databaseIds.packages as string, 'Status'),
      // We could add other databases here if they have status properties
    };
    
    console.log('Kanban views instruction printed successfully');
    return results;
  } catch (error) {
    console.error('Error setting up Kanban views:', error);
    throw error;
  }
}

// Enhance packages database for Kanban view
export async function enhancePackagesForKanban() {
  try {
    // Get the packages database
    const databaseId = databaseIds.packages;
    
    if (!databaseId) {
      throw new Error('Packages database ID is undefined');
    }
    
    // Update properties to enhance Kanban experience
    const response = await notionClient.databases.update({
      database_id: databaseId,
      properties: {
        'Cover Image': {
          type: 'files',
          files: {}
        },
        'Assigned To': {
          type: 'people',
          people: {}
        },
        'Status': {
          type: 'select',
          select: {
            options: [
              {
                name: 'Not Started',
                color: 'default'
              },
              {
                name: 'In Progress',
                color: 'blue'
              },
              {
                name: 'Ready for Review',
                color: 'yellow'
              },
              {
                name: 'Complete',
                color: 'green'
              },
              {
                name: 'Archived',
                color: 'gray'
              }
            ]
          }
        }
      }
    });
    
    console.log('Enhanced packages database with Kanban-friendly properties');
    
    // Set up Kanban view with the Status property
    if (databaseId) {
      return setupKanbanView(databaseId, 'Status');
    }
    return false;
  } catch (error) {
    console.error('Error enhancing packages database:', error);
    throw error;
  }
} 
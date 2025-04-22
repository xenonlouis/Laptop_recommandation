import { NextRequest, NextResponse } from "next/server";
import { validateNotionConfig } from "@/lib/notion/client";
import { getDiffStatus } from "@/lib/notion/diff-service";

// Summary counts interface
interface EntitySummary {
  ahead: number;
  behind: number;
  modified: number;
  unchanged: number;
}

interface SyncSummary {
  laptops: EntitySummary;
  accessories: EntitySummary;
  packages: EntitySummary;
  people: EntitySummary;
  tools?: EntitySummary;
  toolkits?: EntitySummary;
  lastChecked: string;
}

// GET /api/notion/status - Get sync status compared to Notion
export async function GET(request: NextRequest) {
  try {
    // Validate Notion configuration
    if (!validateNotionConfig()) {
      return NextResponse.json(
        { error: "Notion configuration is incomplete. Please check environment variables." },
        { status: 500 }
      );
    }
    
    // Get diff status for all entities
    const status = await getDiffStatus();
    
    // Prepare summary counts for quicker access in UI
    const summary: SyncSummary = {
      laptops: {
        ahead: status.laptops.ahead.length,
        behind: status.laptops.behind.length,
        modified: status.laptops.modified.length,
        unchanged: status.laptops.unchanged.length,
      },
      accessories: {
        ahead: status.accessories.ahead.length,
        behind: status.accessories.behind.length,
        modified: status.accessories.modified.length,
        unchanged: status.accessories.unchanged.length,
      },
      packages: {
        ahead: status.packages.ahead.length,
        behind: status.packages.behind.length,
        modified: status.packages.modified.length,
        unchanged: status.packages.unchanged.length,
      },
      people: {
        ahead: status.people.ahead.length,
        behind: status.people.behind.length,
        modified: status.people.modified.length,
        unchanged: status.people.unchanged.length,
      },
      lastChecked: status.lastChecked
    };
    
    // If tools and toolkits are implemented
    if (status.tools) {
      summary.tools = {
        ahead: status.tools.ahead.length,
        behind: status.tools.behind.length,
        modified: status.tools.modified.length,
        unchanged: status.tools.unchanged.length,
      };
    }
    
    if (status.toolkits) {
      summary.toolkits = {
        ahead: status.toolkits.ahead.length,
        behind: status.toolkits.behind.length,
        modified: status.toolkits.modified.length,
        unchanged: status.toolkits.unchanged.length,
      };
    }
    
    return NextResponse.json({
      summary,
      details: status
    });
  } catch (error) {
    console.error("Error getting sync status:", error);
    return NextResponse.json(
      { error: "Failed to get sync status", details: (error as Error).message },
      { status: 500 }
    );
  }
} 
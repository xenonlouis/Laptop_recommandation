import { NextRequest, NextResponse } from "next/server";
import { validateNotionConfig } from "@/lib/notion/client";
import { syncLaptopsToNotion } from "@/lib/notion/laptops-service";
import { syncAccessoriesToNotion } from "@/lib/notion/accessories-service";
import { syncPackagesToNotion } from "@/lib/notion/packages-service";
import { syncPeopleToNotion } from "@/lib/notion/people-service";
import { createCheckpoint, cleanupCheckpoints } from "@/lib/notion/checkpoint";

// POST /api/notion/sync
export async function POST(request: NextRequest) {
  try {
    // Validate Notion configuration
    if (!validateNotionConfig()) {
      return NextResponse.json(
        { error: "Notion configuration is incomplete. Please check environment variables." },
        { status: 500 }
      );
    }

    // Create a checkpoint before syncing
    const checkpointPath = await createCheckpoint();
    
    // Parse request body to determine which entities to sync
    const body = await request.json();
    const { entities = ["laptops", "accessories", "packages", "people"] } = body;
    
    // Track results for each entity
    const results: Record<string, any> = {
      checkpoint: checkpointPath,
    };
    
    // Sync requested entities
    if (entities.includes("laptops")) {
      results.laptops = await syncLaptopsToNotion();
    }
    
    if (entities.includes("accessories")) {
      results.accessories = await syncAccessoriesToNotion();
    }
    
    if (entities.includes("packages")) {
      results.packages = await syncPackagesToNotion();
    }
    
    if (entities.includes("people")) {
      results.people = await syncPeopleToNotion();
    }
    
    // Clean up old checkpoints
    await cleanupCheckpoints();
    
    return NextResponse.json({
      message: "Sync completed successfully",
      results
    });
  } catch (error) {
    console.error("Error during Notion sync:", error);
    return NextResponse.json(
      { error: "Failed to sync with Notion", details: (error as Error).message },
      { status: 500 }
    );
  }
}

// GET /api/notion/sync
export async function GET() {
  // Simple status endpoint
  return NextResponse.json({
    status: "available",
    endpoints: {
      sync: "POST /api/notion/sync",
      status: "GET /api/notion/sync",
    },
    supportedEntities: ["laptops", "accessories", "packages", "people"],
  });
} 
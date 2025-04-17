import { NextRequest, NextResponse } from "next/server";
import { listCheckpoints, cleanupCheckpoints } from "@/lib/notion/checkpoint";

// GET /api/notion/checkpoints - List all checkpoints
export async function GET() {
  try {
    const checkpoints = listCheckpoints();
    return NextResponse.json(checkpoints);
  } catch (error) {
    console.error("Error listing checkpoints:", error);
    return NextResponse.json(
      { error: "Failed to list checkpoints", details: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE /api/notion/checkpoints - Clean up old checkpoints
export async function DELETE() {
  try {
    const deletedCount = cleanupCheckpoints();
    return NextResponse.json({
      message: `Cleaned up ${deletedCount} old checkpoints`,
      deletedCount
    });
  } catch (error) {
    console.error("Error cleaning up checkpoints:", error);
    return NextResponse.json(
      { error: "Failed to clean up checkpoints", details: (error as Error).message },
      { status: 500 }
    );
  }
} 
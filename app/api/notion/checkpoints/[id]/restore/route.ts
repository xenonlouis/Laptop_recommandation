import { NextRequest, NextResponse } from "next/server";
import { restoreCheckpoint } from "@/lib/notion/checkpoint";

interface Params {
  id: string;
}

// POST /api/notion/checkpoints/:id/restore - Restore from a checkpoint
export async function POST(request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Checkpoint ID is required" },
        { status: 400 }
      );
    }
    
    const success = await restoreCheckpoint(id);
    
    return NextResponse.json({
      message: `Checkpoint ${id} restored successfully`,
      success
    });
  } catch (error) {
    console.error(`Error restoring checkpoint:`, error);
    return NextResponse.json(
      { error: "Failed to restore checkpoint", details: (error as Error).message },
      { status: 500 }
    );
  }
} 
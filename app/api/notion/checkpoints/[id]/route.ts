import { NextRequest, NextResponse } from "next/server";
import { deleteCheckpoint } from "@/lib/notion/checkpoint";

interface Params {
  id: string;
}

// DELETE /api/notion/checkpoints/:id - Delete a specific checkpoint
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Checkpoint ID is required" },
        { status: 400 }
      );
    }
    
    const success = deleteCheckpoint(id);
    
    return NextResponse.json({
      message: `Checkpoint ${id} deleted successfully`,
      success
    });
  } catch (error) {
    console.error(`Error deleting checkpoint:`, error);
    return NextResponse.json(
      { error: "Failed to delete checkpoint", details: (error as Error).message },
      { status: 500 }
    );
  }
} 
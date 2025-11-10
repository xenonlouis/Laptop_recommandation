import { type NextRequest, NextResponse } from "next/server";
import { getToolkits, addToolkit } from "@/lib/data-service";
import type { Toolkit } from "@/types";
import { withPermission, Permission, AuthenticatedUser } from '@/lib/auth-helpers';

// GET /api/toolkits - Get all toolkits (public)
export async function GET() {
  try {
    const toolkits = await getToolkits();
    return NextResponse.json(toolkits);
  } catch (error) {
    console.error("Error fetching toolkits:", error);
    return NextResponse.json({ error: "Failed to fetch toolkits" }, { status: 500 });
  }
}

// POST /api/toolkits - Add a new toolkit (requires MANAGE_TOOLKITS permission)
export const POST = withPermission(
  Permission.MANAGE_TOOLKITS,
  async (request: NextRequest, user: AuthenticatedUser) => {
    try {
      const toolkitData = (await request.json()) as Omit<Toolkit, "id">;

      // Validate required fields
      if (!toolkitData.profileName || !toolkitData.operatingSystem || !Array.isArray(toolkitData.tools)) {
        return NextResponse.json(
          { error: "Profile name, operating system, and tools array are required" }, 
          { status: 400 }
        );
      }

      const newToolkit = await addToolkit(toolkitData);

      return NextResponse.json(
        { message: "Toolkit added successfully", toolkit: newToolkit }, 
        { status: 201 }
      );
    } catch (error) {
      console.error("Error adding toolkit:", error);
      return NextResponse.json({ error: "Failed to add toolkit" }, { status: 500 });
    }
  }
); 
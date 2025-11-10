import { type NextRequest, NextResponse } from "next/server";
import { getTools, addTool } from "@/lib/data-service";
import type { Tool } from "@/lib/api-client-tools";
import { withPermission, Permission, AuthenticatedUser } from '@/lib/auth-helpers';

// GET /api/tools - Get all tools (public)
export async function GET() {
  try {
    const tools = await getTools();
    return NextResponse.json(tools);
  } catch (error) {
    console.error("Error fetching tools:", error);
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 });
  }
}

// POST /api/tools - Add a new tool (requires MANAGE_TOOLS permission)
export const POST = withPermission(
  Permission.MANAGE_TOOLS,
  async (request: NextRequest, user: AuthenticatedUser) => {
    try {
      const toolData = await request.json();

      // Validate required fields
      if (!toolData.name || !toolData.category) {
        return NextResponse.json({ error: "Name and category are required" }, { status: 400 });
      }

      // Add the tool
      const tool = await addTool(toolData);
      
      return NextResponse.json({ 
        message: "Tool added successfully", 
        tool 
      }, { status: 201 });
    } catch (error) {
      console.error("Error adding tool:", error);
      return NextResponse.json({ error: "Failed to add tool" }, { status: 500 });
    }
  }
); 
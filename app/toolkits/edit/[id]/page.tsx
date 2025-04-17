// This is a server component
import { EditToolkitContent } from "./client-component"

export default async function EditToolkitPage({ params }: { params: { id: string } }) {
  // Resolve params in the server component
  const resolvedParams = await params;
  
  // Pass the resolved ID to the client component
  return <EditToolkitContent id={resolvedParams.id} />;
} 
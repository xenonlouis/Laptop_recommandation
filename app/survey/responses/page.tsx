"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SurveyResponse } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Edit, Trash2, PlusCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { deleteSurveyResponse } from "@/lib/api-client-survey";

// Helper function to format dates
const formatDate = (dateString: string): string => {
  if (!dateString) return "Unknown date";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export default function SurveyResponsesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isMigrateDialogOpen, setIsMigrateDialogOpen] = useState(false);
  const [migrateJsonText, setMigrateJsonText] = useState("");
  const [isMigrating, setIsMigrating] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      loadResponses();
    } else if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/survey/responses");
    }
  }, [status, router]);

  async function loadResponses() {
    try {
      setLoading(true);
      
      const res = await fetch('/api/survey/responses');
      
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          setError("You don't have permission to view survey responses.");
          router.push("/login?callbackUrl=/survey/responses");
        } else {
          setError("Failed to load survey responses. Please try again later.");
        }
        setLoading(false);
        return;
      }
      
      const data = await res.json();
      setResponses(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch survey responses:", err);
      setError("Failed to load survey responses. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(responseId: string) {
    setIsDeleting(responseId);
    try {
      await deleteSurveyResponse(responseId);
      setResponses(prev => prev.filter(r => r.id !== responseId));
      toast({ title: "Success", description: "Survey response deleted." });
    } catch (error: any) {
      console.error("Error deleting response:", error);
      toast({ title: "Error", description: error.message || "Failed to delete response." });
    } finally {
      setIsDeleting(null);
    }
  }

  // --- Handle Manual Migration Submit --- 
  async function handleMigrateSubmit() {
    if (!migrateJsonText.trim()) {
      toast({ title: "Error", description: "Please paste JSON data into the text area." });
      return;
    }

    let jsonData;
    try {
      jsonData = JSON.parse(migrateJsonText);
    } catch (err) {
      toast({ title: "Error", description: "Invalid JSON format. Please check the pasted text." });
      return;
    }

    setIsMigrating(true);
    try {
      const res = await fetch('/api/survey/responses/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      const result = await res.json();

      if (!res.ok) {
        const description = result.message || `Failed with status ${res.status}.`;
        toast({ title: "Migration Failed", description });
      } else {
        setResponses(prev => [result, ...prev]);
        setMigrateJsonText("");
        setIsMigrateDialogOpen(false);
        toast({ title: "Success", description: `Response for ${result.name} migrated successfully.` });
      }
    } catch (error: any) {
      console.error("Error migrating response:", error);
      toast({ title: "Migration Error", description: error.message || "An unexpected error occurred." });
    } finally {
      setIsMigrating(false);
    }
  }
  // -------------------------------------

  return (
    <ProtectedRoute>
      {loading ? (
        <div className="container mx-auto p-6 flex items-center justify-center h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <p>Loading responses...</p>
        </div>
      ) : (
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Survey Responses</h1>
            <div className="flex items-center gap-2"> 
              <Dialog open={isMigrateDialogOpen} onOpenChange={setIsMigrateDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" /> Migrate Single Response
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Migrate Survey Response</DialogTitle>
                    <DialogDescription>
                      Paste the full JSON object for a single survey response from your old data file below.
                      Ensure required fields (id, name, email, position, submittedAt) are present.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 items-center gap-4">
                      <Textarea
                        id="migrate-json"
                        placeholder='{
  "id": "...",
  "submittedAt": "...",
  "name": "...",
  "email": "...",
  ...
}'
                        value={migrateJsonText}
                        onChange={(e) => setMigrateJsonText(e.target.value)}
                        className="col-span-3 min-h-[250px] font-mono text-xs"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline" disabled={isMigrating}>Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleMigrateSubmit} disabled={isMigrating}>
                       {isMigrating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                       Save Migrated Response
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button 
                variant="ghost"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </Button>
            </div>
          </div>

          {error && (
            <Alert className="mb-4 bg-red-50">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {responses.length === 0 ? (
            <p className="text-gray-500">No survey responses yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {responses.map((response) => (
                <Card key={response.id} className="h-full flex flex-col">
                  <CardHeader>
                    <Link href={`/survey/responses/${response.id}`}>
                      <CardTitle className="truncate hover:underline">{response.name}</CardTitle>
                    </Link>
                    <CardDescription>
                      {response.position}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm">{response.email}</p>
                    <p className="text-sm mt-2">
                      <strong>Primary OS:</strong> {response.primaryOS}
                    </p>
                    <p className="text-sm">
                      <strong>Primary Role:</strong> {response.primaryRole}
                    </p>
                  </CardContent>
                  <CardFooter className="text-xs text-gray-500 flex justify-between items-center pt-4 border-t">
                    <span>Submitted: {formatDate(response.submittedAt)}</span>
                    <div className="flex items-center gap-1">
                      <Link href={`/survey/responses/edit/${response.id}`} onClick={(e) => e.stopPropagation()}> 
                        <Button variant="ghost" size="icon" className="h-7 w-7" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 text-destructive hover:text-destructive" 
                            title="Delete" 
                            disabled={isDeleting === response.id}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {isDeleting === response.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent onClick={(e) => e.stopPropagation()}> 
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the survey response for <strong>{response.name}</strong>.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(response.id)} 
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Yes, delete response
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </ProtectedRoute>
  );
} 
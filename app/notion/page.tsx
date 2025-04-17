"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Archive, Clock, Trash, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Loader2, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type SyncEntity = "laptops" | "packages" | "accessories" | "people";

interface Checkpoint {
  id: string;
  timestamp: string;
  createdAt: string;
  files: string[];
  path: string;
}

export default function NotionPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [currentSyncEntity, setCurrentSyncEntity] = useState<string | null>(null);
  const [lastSyncResults, setLastSyncResults] = useState<Record<string, any> | null>(null);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [selectedEntities, setSelectedEntities] = useState<SyncEntity[]>([
    "laptops", "packages", "accessories", "people"
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch checkpoints on page load
  useEffect(() => {
    fetchCheckpoints();
  }, []);

  // Fetch checkpoints from API
  const fetchCheckpoints = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/notion/checkpoints");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch checkpoints: ${response.status}`);
      }
      
      const data = await response.json();
      setCheckpoints(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching checkpoints:", err);
      setError("Failed to load checkpoints");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async () => {
    if (isSyncing) return;

    setIsSyncing(true);
    setSyncProgress(0);
    
    try {
      // Calculate total entities to sync for progress tracking
      const totalEntities = selectedEntities.length;
      let completedEntities = 0;
      
      for (const entity of selectedEntities) {
        setCurrentSyncEntity(entity);
        
        // Show starting progress for this entity
        setSyncProgress(Math.floor((completedEntities / totalEntities) * 100));
        
        // Call the API for this specific entity
        const response = await fetch("/api/notion/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ entities: [entity] }),
        });

        if (!response.ok) {
          const error = await response.json();
          toast({
            title: `Sync Failed: ${entity}`,
            description: error.message || `Failed to sync ${entity} with Notion`
          });
          // Continue with next entity even if one fails
        } else {
          const data = await response.json();
          
          // Update progress
          completedEntities++;
          setSyncProgress(Math.floor((completedEntities / totalEntities) * 100));
          
          // Accumulate results
          if (!lastSyncResults) {
            setLastSyncResults(data.results);
          } else {
            setLastSyncResults(prev => ({
              ...prev,
              ...data.results
            }));
          }
        }
        
        // Small delay to make progress visible
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Final progress update
      setSyncProgress(100);
      
      toast({
        title: "Sync Complete",
        description: `Successfully synced ${selectedEntities.join(", ")} to Notion.`,
      });

      // Refresh checkpoints after sync
      fetchCheckpoints();
    } catch (error) {
      console.error("Error during sync:", error);
      toast({
        title: "Sync Failed",
        description: (error as Error).message || "An unexpected error occurred"
      });
    } finally {
      // Reset after a delay to show 100% completion
      setTimeout(() => {
        setIsSyncing(false);
        setCurrentSyncEntity(null);
      }, 1000);
    }
  };

  // Restore from checkpoint
  const handleRestore = async (checkpointId: string) => {
    if (!confirm(`Are you sure you want to restore from checkpoint ${checkpointId}? This will overwrite your current data.`)) {
      return;
    }
    
    try {
      const response = await fetch(`/api/notion/checkpoints/${checkpointId}/restore`, {
        method: "POST",
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || `Restore failed with status: ${response.status}`);
      }
      
      toast({
        title: "Restore Completed",
        description: `Successfully restored from checkpoint ${checkpointId}.`,
      });
    } catch (err) {
      console.error("Error during restore:", err);
      
      toast({
        title: "Restore Failed",
        description: (err as Error).message,
      });
    }
  };

  // Clean up old checkpoints
  const handleCleanup = async () => {
    try {
      const response = await fetch("/api/notion/checkpoints", {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || `Cleanup failed with status: ${response.status}`);
      }
      
      const result = await response.json();
      
      toast({
        title: "Cleanup Completed",
        description: `Removed ${result.deletedCount} old checkpoints.`,
      });
      
      // Refresh checkpoints list after cleanup
      fetchCheckpoints();
    } catch (err) {
      console.error("Error during cleanup:", err);
      
      toast({
        title: "Cleanup Failed",
        description: (err as Error).message,
      });
    }
  };

  const handleEntityToggle = (entity: SyncEntity) => {
    setSelectedEntities(prev => 
      prev.includes(entity)
        ? prev.filter(e => e !== entity)
        : [...prev, entity]
    );
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      // First check if the string is valid
      const timestamp = Date.parse(dateString);
      
      // If the timestamp is invalid, Date.parse returns NaN
      if (isNaN(timestamp)) {
        return "Invalid date";
      }
      
      const date = new Date(timestamp);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(date);
    } catch (err) {
      console.error("Error formatting date:", dateString, err);
      return "Invalid date format";
    }
  };

  // Handle deletion of individual checkpoint
  const handleDeleteCheckpoint = async (checkpointId: string) => {
    if (!confirm(`Are you sure you want to delete checkpoint ${checkpointId}? This action cannot be undone.`)) {
      return;
    }
    
    try {
      const response = await fetch(`/api/notion/checkpoints/${checkpointId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || `Delete failed with status: ${response.status}`);
      }
      
      toast({
        title: "Checkpoint Deleted",
        description: `Successfully deleted checkpoint ${checkpointId}.`,
      });
      
      // Refresh checkpoints list after deletion
      fetchCheckpoints();
    } catch (err) {
      console.error("Error deleting checkpoint:", err);
      
      toast({
        title: "Delete Failed",
        description: (err as Error).message,
      });
    }
  };

  return (
    <>
      {/* Progress overlay */}
      {isSyncing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-xl font-semibold">Syncing with Notion</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground capitalize">
                  {currentSyncEntity ? `Syncing ${currentSyncEntity}...` : "Starting sync..."}
                </span>
                <span className="font-medium">{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} className="h-2" />
            </div>
            
            <p className="text-sm text-muted-foreground">
              Please don't close this page. This may take a few minutes.
            </p>
          </div>
        </div>
      )}
    
      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Notion Sync</h1>
          <p className="text-muted-foreground">
            Synchronize your laptops, accessories, packages, and people with Notion.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sync Options</CardTitle>
            <CardDescription>Select the entities you want to sync</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Badge 
                className={cn(
                  "cursor-pointer hover:bg-primary/80",
                  selectedEntities.includes("laptops") 
                    ? "bg-primary" 
                    : "bg-muted text-muted-foreground"
                )}
                onClick={() => handleEntityToggle("laptops")}
              >
                Laptops
              </Badge>
              <Badge 
                className={cn(
                  "cursor-pointer hover:bg-primary/80",
                  selectedEntities.includes("accessories") 
                    ? "bg-primary" 
                    : "bg-muted text-muted-foreground"
                )}
                onClick={() => handleEntityToggle("accessories")}
              >
                Accessories
              </Badge>
              <Badge 
                className={cn(
                  "cursor-pointer hover:bg-primary/80",
                  selectedEntities.includes("packages") 
                    ? "bg-primary" 
                    : "bg-muted text-muted-foreground"
                )}
                onClick={() => handleEntityToggle("packages")}
              >
                Packages
              </Badge>
              <Badge 
                className={cn(
                  "cursor-pointer hover:bg-primary/80",
                  selectedEntities.includes("people") 
                    ? "bg-primary" 
                    : "bg-muted text-muted-foreground"
                )}
                onClick={() => handleEntityToggle("people")}
              >
                People
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button 
                onClick={handleSync} 
                disabled={isSyncing || selectedEntities.length === 0}
                className="flex items-center gap-2"
              >
                {isSyncing ? <><Loader2 className="h-4 w-4 animate-spin" /> Syncing...</> : <><Sparkles className="h-4 w-4" /> Sync to Notion</>}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCleanup}
                disabled={isSyncing}
              >
                Clean Old Checkpoints
              </Button>
            </div>

            {lastSyncResults && (
              <div className="rounded-md bg-muted p-4">
                <h3 className="font-medium mb-2">Last Sync Results</h3>
                <div className="space-y-2">
                  {Object.entries(lastSyncResults).map(([key, value]) => {
                    if (key === "checkpoint") return null;
                    
                    return (
                      <div key={key} className="flex items-center gap-2">
                        <div className="capitalize font-medium">{key}:</div>
                        <div className="text-sm text-muted-foreground">
                          {value && typeof value === "object" ? (
                            <span>
                              {value.created} created, {value.updated} updated, {value.errors} errors
                            </span>
                          ) : (
                            <span>{String(value)}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Checkpoints */}
        <Card>
          <CardHeader>
            <CardTitle>Checkpoints</CardTitle>
            <CardDescription>
              Restore your data from a previous checkpoint if needed
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center p-6">
                <Clock className="h-6 w-6 animate-spin text-muted-foreground" />
                <span className="ml-2">Loading checkpoints...</span>
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : checkpoints.length === 0 ? (
              <div className="text-center p-6 text-muted-foreground">
                <Archive className="h-8 w-8 mx-auto mb-2" />
                <p>No checkpoints available yet. Checkpoints are created automatically before each sync.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {checkpoints.slice(0, 10).map((checkpoint, index) => (
                  <div key={checkpoint.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <div className="font-medium">{formatDate(checkpoint.timestamp)}</div>
                      <div className="text-sm text-muted-foreground">
                        Files: {checkpoint.files ? checkpoint.files.join(", ") : "Unknown"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRestore(checkpoint.id)}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Restore
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteCheckpoint(checkpoint.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
                
                {checkpoints.length > 10 && (
                  <div className="text-center text-sm text-muted-foreground">
                    Showing 10 of {checkpoints.length} checkpoints
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
} 
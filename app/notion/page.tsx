"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Archive, Clock, Trash, RefreshCw, ArrowUp, ArrowDown, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Loader2, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SyncEntity = "laptops" | "packages" | "accessories" | "people";

interface Checkpoint {
  id: string;
  timestamp: string;
  createdAt: string;
  files: string[];
  path: string;
}

// Interface for the sync status summary
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

// DiffDialog Component for showing detailed comparison
interface DiffDialogProps {
  entityType: string;
  entityDetails: any;
  diffType: 'ahead' | 'behind' | 'modified';
}

function DiffDialog({ entityType, entityDetails, diffType }: DiffDialogProps) {
  const [open, setOpen] = useState(false);
  
  // Generate display name for an entity based on its type
  const getEntityName = (entity: any) => {
    if (!entity) return "Unknown";
    
    switch (entityType.toLowerCase()) {
      case 'laptops': 
        return `${entity.brand} ${entity.model}`;
      case 'accessories': 
        return entity.name || "Unnamed accessory";
      case 'packages': 
        return entity.name || "Unnamed package";
      case 'people': 
        return entity.name || "Unnamed person";
      case 'tools': 
        return entity.name || "Unnamed tool";
      case 'toolkits': 
        return entity.profileName || "Unnamed toolkit";
      default:
        return entity.id || "Unknown";
    }
  };
  
  // Get badge color based on diff type
  const getBadgeColor = () => {
    switch (diffType) {
      case 'ahead': return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'behind': return "bg-red-100 text-red-800 hover:bg-red-200";
      case 'modified': return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      default: return "";
    }
  };
  
  // Get icon based on diff type
  const getIcon = () => {
    switch (diffType) {
      case 'ahead': return <ArrowUp className="h-3 w-3 mr-1" />;
      case 'behind': return <ArrowDown className="h-3 w-3 mr-1" />;
      case 'modified': return <AlertCircle className="h-3 w-3 mr-1" />;
      default: return null;
    }
  };
  
  // Format value for display
  const formatValue = (value: any) => {
    if (value === undefined || value === null) return "—";
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Badge variant="outline" className={cn("cursor-pointer", getBadgeColor())}>
          {getIcon()} {diffType === 'modified' ? entityDetails.length : entityDetails.length} {diffType}
        </Badge>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="capitalize flex items-center gap-2">
            {getIcon()} {entityType} ({diffType})
          </DialogTitle>
          <DialogDescription>
            {diffType === 'ahead' && `${entityDetails.length} ${entityType} exist locally but not in Notion`}
            {diffType === 'behind' && `${entityDetails.length} ${entityType} exist in Notion but not locally`}
            {diffType === 'modified' && `${entityDetails.length} ${entityType} exist in both places but have differences`}
          </DialogDescription>
        </DialogHeader>
        
        {diffType === 'modified' ? (
          <Tabs defaultValue="changes" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="changes">Changes</TabsTrigger>
              <TabsTrigger value="comparison">Side by Side</TabsTrigger>
            </TabsList>
            
            <TabsContent value="changes" className="space-y-4">
              {entityDetails.map((item: any, index: number) => (
                <div key={index} className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">{getEntityName(item.local)}</h3>
                  <div className="text-sm text-muted-foreground mb-3">
                    Modified fields: {item.changes.join(', ')}
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Field</TableHead>
                        <TableHead>Local Value</TableHead>
                        <TableHead>Notion Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {item.changes.map((field: string) => (
                        <TableRow key={field}>
                          <TableCell className="font-medium">{field}</TableCell>
                          <TableCell>{formatValue(item.local[field])}</TableCell>
                          <TableCell>{formatValue(item.notion[field])}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="comparison">
              {entityDetails.map((item: any, index: number) => (
                <div key={index} className="border rounded-md p-4 mb-4">
                  <h3 className="font-medium mb-4">{getEntityName(item.local)}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Local Version</h4>
                      <pre className="bg-muted p-3 rounded-md text-xs overflow-auto">
                        {JSON.stringify(item.local, null, 2)}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Notion Version</h4>
                      <pre className="bg-muted p-3 rounded-md text-xs overflow-auto">
                        {JSON.stringify(item.notion, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-4">
            {entityDetails.map((item: any, index: number) => (
              <div key={index} className="border rounded-md p-4">
                <h3 className="font-medium mb-2">{getEntityName(item)}</h3>
                <pre className="bg-muted p-3 rounded-md text-xs overflow-auto">
                  {JSON.stringify(item, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// EntityStatusBadge component with tooltip
function EntityStatusBadge({ count, type, tooltipContent }: { count: number, type: 'ahead' | 'behind' | 'modified', tooltipContent: React.ReactNode }) {
  const getBadgeContent = () => {
    switch (type) {
      case 'ahead':
        return <><ArrowUp className="h-3 w-3 mr-1" /> {count} ahead</>;
      case 'behind':
        return <><ArrowDown className="h-3 w-3 mr-1" /> {count} behind</>;
      case 'modified':
        return <><AlertCircle className="h-3 w-3 mr-1" /> {count} modified</>;
      default:
        return null;
    }
  };
  
  const getBadgeColor = () => {
    switch (type) {
      case 'ahead': return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'behind': return "bg-red-100 text-red-800 hover:bg-red-200";
      case 'modified': return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      default: return "";
    }
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={cn(getBadgeColor())}>
            {getBadgeContent()}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs p-3">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Update the EntityStatusCard component
function EntityStatusCard({ entityName, status, details }: { entityName: string, status: EntitySummary, details?: any }) {
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">{entityName}</h3>
        <div className="flex gap-2">
          {status.ahead > 0 && details?.ahead && (
            <DiffDialog 
              entityType={entityName} 
              entityDetails={details.ahead} 
              diffType="ahead" 
            />
          )}
          {status.behind > 0 && details?.behind && (
            <DiffDialog 
              entityType={entityName} 
              entityDetails={details.behind} 
              diffType="behind" 
            />
          )}
          {status.modified > 0 && details?.modified && (
            <DiffDialog 
              entityType={entityName} 
              entityDetails={details.modified} 
              diffType="modified" 
            />
          )}
          {status.ahead === 0 && status.behind === 0 && status.modified === 0 && (
            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
              <CheckCircle className="h-3 w-3 mr-1" /> In sync
            </Badge>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {status.unchanged} {entityName.toLowerCase()} synchronized with Notion
      </p>
    </div>
  );
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
  const [syncStatus, setSyncStatus] = useState<SyncSummary | null>(null);
  const [syncDetails, setSyncDetails] = useState<any | null>(null);
  const [isFetchingStatus, setIsFetchingStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch checkpoints and sync status on page load
  useEffect(() => {
    fetchCheckpoints();
    fetchSyncStatus();
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

  // Fetch sync status between local and Notion
  const fetchSyncStatus = async () => {
    try {
      setIsFetchingStatus(true);
      const response = await fetch("/api/notion/status");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch sync status: ${response.status}`);
      }
      
      const data = await response.json();
      setSyncStatus(data.summary);
      setSyncDetails(data.details);
    } catch (err) {
      console.error("Error fetching sync status:", err);
      toast({
        title: "Error",
        description: "Failed to load sync status",
      });
    } finally {
      setIsFetchingStatus(false);
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

      // Refresh checkpoints and sync status after sync
      fetchCheckpoints();
      fetchSyncStatus();
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
      
      // Refresh sync status after restore
      fetchSyncStatus();
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

  // Format time from now (similar to GitHub's "last updated X minutes ago")
  const formatTimeFromNow = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      
      if (diffInSeconds < 60) {
        return 'just now';
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
      }
    } catch (err) {
      return 'unknown time ago';
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

        {/* GitHub-style Sync Status Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Sync Status</CardTitle>
                <CardDescription>
                  {syncStatus ? 
                    `Last checked ${formatTimeFromNow(syncStatus.lastChecked)}` : 
                    "Check the sync status between your local data and Notion"
                  }
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={fetchSyncStatus}
                disabled={isFetchingStatus}
                className="flex items-center gap-2"
              >
                {isFetchingStatus ? 
                  <Loader2 className="h-4 w-4 animate-spin" /> : 
                  <RefreshCw className="h-4 w-4" />
                }
                Refresh Status
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {isFetchingStatus ? (
              <div className="flex justify-center items-center py-6">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Checking sync status...</span>
              </div>
            ) : !syncStatus ? (
              <Alert>
                <AlertTitle>Status Unavailable</AlertTitle>
                <AlertDescription>
                  Unable to retrieve sync status. Please check your Notion connection.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                {/* Laptops status */}
                <EntityStatusCard 
                  entityName="Laptops" 
                  status={syncStatus.laptops} 
                  details={syncDetails?.laptops} 
                />

                {/* Accessories status */}
                <EntityStatusCard 
                  entityName="Accessories" 
                  status={syncStatus.accessories} 
                  details={syncDetails?.accessories} 
                />

                {/* Packages status */}
                <EntityStatusCard 
                  entityName="Packages" 
                  status={syncStatus.packages} 
                  details={syncDetails?.packages} 
                />

                {/* People status */}
                <EntityStatusCard 
                  entityName="People" 
                  status={syncStatus.people} 
                  details={syncDetails?.people} 
                />

                {/* Tools status (if implemented) */}
                {syncStatus.tools && (
                  <EntityStatusCard 
                    entityName="Tools" 
                    status={syncStatus.tools} 
                    details={syncDetails?.tools} 
                  />
                )}
                
                {/* Toolkits status (if implemented) */}
                {syncStatus.toolkits && (
                  <EntityStatusCard 
                    entityName="Toolkits" 
                    status={syncStatus.toolkits} 
                    details={syncDetails?.toolkits} 
                  />
                )}
              </div>
            )}
          </CardContent>
        </Card>

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
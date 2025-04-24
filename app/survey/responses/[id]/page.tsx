"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { SurveyResponse, Toolkit, Tool } from "@/types";
import { fetchToolkits } from "@/lib/api-client";
import { fetchTools } from "@/lib/api-client-tools";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, CheckCircle, Star, Wrench } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

export default function SurveyResponseDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [response, setResponse] = useState<SurveyResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // State for toolkits and tools data
  const [allToolkits, setAllToolkits] = useState<Toolkit[]>([]);
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [matchedToolkitDetails, setMatchedToolkitDetails] = useState<Toolkit | null>(null);
  const [matchedToolkitTools, setMatchedToolkitTools] = useState<Tool[]>([]);

  // --- Create a memoized map for tool names --- 
  const toolNameMap = useMemo(() => {
    if (!allTools) return {};
    return Object.fromEntries(allTools.map(tool => [tool.id, tool.name]));
  }, [allTools]);
  // ---------------------------------------------

  // --- Create a map for full tool objects by ID for easier lookup --- 
  const toolDetailsMap = useMemo(() => {
    if (!allTools) return {};
    return Object.fromEntries(allTools.map(tool => [tool.id, tool]));
  }, [allTools]);
  // -------------------------------------------------------------------

  useEffect(() => {
    const adminKey = localStorage.getItem("survey-admin-key");
    if (!adminKey) {
      setLoading(false);
      setIsAuthenticated(false);
      return;
    }
    
    // Load response and toolkit/tool data
    loadData(adminKey);
  }, [id]);

  // Combined function to load all necessary data
  async function loadData(adminKey: string) {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch response, all toolkits, and all tools in parallel
      const [responseResult, toolkitsResult, toolsResult] = await Promise.allSettled([
        fetch(`/api/survey/responses/${id}`, { headers: { 'x-api-key': adminKey } }),
        fetchToolkits(), // Use API client function
        fetchTools()     // Use API client function
      ]);

      // Process Response Result
      if (responseResult.status === 'fulfilled') {
        const res = responseResult.value;
        if (!res.ok) {
          if (res.status === 401) {
            setIsAuthenticated(false);
            localStorage.removeItem("survey-admin-key");
            throw new Error("Admin access required. Please login at the responses page.");
          } else if (res.status === 404) {
            throw new Error("Survey response not found.");
          } else {
            throw new Error("Failed to load survey response. Please try again later.");
          }
        }
        const responseData: SurveyResponse = await res.json();
        setResponse(responseData);
        setIsAuthenticated(true);
      } else {
        // Handle fetch rejection for response
        console.error("Failed to fetch response:", responseResult.reason);
        throw new Error("Failed to fetch survey response details.");
      }

      // Process Toolkits Result
      if (toolkitsResult.status === 'fulfilled') {
        setAllToolkits(toolkitsResult.value);
      } else {
        console.error("Failed to fetch toolkits:", toolkitsResult.reason);
        // Non-critical, maybe just warn or proceed without matching
      }

      // Process Tools Result
      if (toolsResult.status === 'fulfilled') {
        setAllTools(toolsResult.value);
      } else {
        console.error("Failed to fetch tools:", toolsResult.reason);
        // Non-critical for displaying basic match
      }

    } catch (err: any) {
      console.error("Failed to load data:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }
  
  // Effect to find matched toolkit details once data is loaded
  useEffect(() => {
    if (response && response.matchedToolkitId && allToolkits.length > 0) {
      const foundToolkit = allToolkits.find(tk => tk.id === response.matchedToolkitId);
      setMatchedToolkitDetails(foundToolkit || null);

      if (foundToolkit && foundToolkit.toolIds && allTools.length > 0) {
          const tools = foundToolkit.toolIds
              .map(toolId => allTools.find(tool => tool.id === toolId))
              .filter((tool): tool is Tool => tool !== undefined);
          setMatchedToolkitTools(tools);
      }
    }
  }, [response, allToolkits, allTools]); // Depend on response, allToolkits, allTools

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <p>Loading response...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-6 max-w-lg">
        <div className="flex items-center mb-6">
          <Link href="/survey/responses">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Admin Access Required</h1>
        </div>
        
        <Alert>
          <AlertDescription>
            You need to be authenticated to view this response. Please go to the{' '}
            <Link href="/survey/responses" className="underline">
              responses page
            </Link>{' '}
            and login.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (error || !response) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center mb-6">
          <Link href="/survey/responses">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Error</h1>
        </div>
        
        <Alert>
          <AlertDescription>
            {error || "Survey response not found."}
          </AlertDescription>
        </Alert>
        
        <div className="mt-4">
          <Link href="/survey/responses">
            <Button>Back to Responses</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Format category name for display (utility)
  const formatCategory = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link href="/survey/responses">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Survey Response Details</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{response.name}</CardTitle>
              <CardDescription className="text-sm mt-1">
                {response.email} • {response.position}
              </CardDescription>
            </div>
            <Badge variant="outline">
              Submitted: {formatDate(response.submittedAt)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="software">Software</TabsTrigger>
              <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-4 space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p>{response.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p>{response.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Position</p>
                    <p>{response.position}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Primary Role</p>
                    <p>{response.primaryRole}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Development Percentage</p>
                    <p>{response.developmentPercentage}%</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-4 space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2">OS Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Primary OS</p>
                    <p>{response.primaryOS}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Preferred OS</p>
                    <p>{response.preferredOS}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium">OS Preference Reason</p>
                    <p>{response.osPreferenceReason || "No reason provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Experience with other OS</p>
                    <p>{response.experienceWithOtherOS?.join(", ") || "None"}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="software" className="mt-4 space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2">Software Requirements</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm font-medium">Programming Languages</p>
                    <p>{response.programmingLanguages?.join(", ") || "None specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Development Type</p>
                    <p>{response.developmentType?.join(", ") || "None specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Selected Tools</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-1">
                      {response.selectedTools && response.selectedTools.length > 0 ? (
                        response.selectedTools.map(id => {
                          const tool = toolDetailsMap[id];
                          return (
                            <div key={id} className="flex items-center gap-2 text-sm py-0.5">
                              {tool?.icon && <img src={tool.icon} alt="" className="h-4 w-4 object-contain flex-shrink-0" />}
                              <span>{tool?.name || id}</span>
                            </div>
                          );
                        })
                      ) : (
                        <span className="text-sm text-muted-foreground italic">None selected</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Other Tools</p>
                    <p>{response.otherTools || "None specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Simultaneous Applications</p>
                    <p>{response.simultaneousApplications || "Not specified"}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="recommendation" className="mt-6 space-y-6">
              <h3 className="font-medium text-lg">Recommended Toolkit</h3>
              
              <p className="text-sm text-muted-foreground">
                Recommendation is based on factors like preferred OS ({response.preferredOS || response.primaryOS || 'N/A'}), 
                primary role ({response.primaryRole || 'N/A'}), and selected software tools.
              </p>

              {matchedToolkitDetails ? (
                <Card className="border bg-muted/30">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                       <CheckCircle className="h-6 w-6 text-green-600" />
                       <CardTitle>{matchedToolkitDetails.profileName}</CardTitle>
                    </div>
                    <CardDescription className="pt-1">
                      {matchedToolkitDetails.description || "Toolkit identified as the best match based on survey answers."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                       <span>OS: <Badge variant="secondary">{matchedToolkitDetails.operatingSystem}</Badge></span>
                       {response.matchScore !== undefined && response.matchScore !== null && (
                         <span>Match Score: <Badge variant="secondary">{response.matchScore}</Badge></span>
                       )}
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Included Tools ({matchedToolkitTools.length})</h4>
                      {matchedToolkitTools.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {matchedToolkitTools.map(tool => (
                            <div key={tool.id} className="border rounded-md p-3 bg-card/50">
                              <div className="font-medium text-sm flex items-center gap-2">
                                {tool.icon && <img src={tool.icon} alt="" className="h-4 w-4 object-contain flex-shrink-0" />}
                                <span>{tool.name}</span>
                                {response.selectedTools?.includes(tool.id) && (
                                  <span title="Also selected by user">
                                    <CheckCircle className="h-3.5 w-3.5 text-primary ml-0.5 flex-shrink-0" />
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground capitalize pl-6 pt-0.5">
                                {formatCategory(tool.category)}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No specific tools associated with this toolkit ID.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Alert variant="default">
                  <Star className="h-4 w-4" />
                  <AlertDescription>
                    No specific toolkit match found for this response (ID: {response.matchedToolkitId || 'N/A'}). The matching algorithm may need refinement, or the response predates the matching feature.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 
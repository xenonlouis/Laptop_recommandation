"use client";

import { useState, useEffect } from "react";
import { fetchSurveyResponses } from "@/lib/api-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, User, Calendar, Mail, Building, Briefcase, Monitor, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SurveyResponse } from "@/types";
import { format } from "date-fns";

export default function ResponsesPage() {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadResponses() {
      try {
        setLoading(true);
        const data = await fetchSurveyResponses();
        setResponses(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch survey responses:", err);
        setError("Failed to load survey responses. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadResponses();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading responses...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (responses.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Survey Responses</h1>
        <Card>
          <CardContent className="flex h-[30vh] items-center justify-center">
            <p className="text-lg text-muted-foreground">No survey responses found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Survey Responses ({responses.length})</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {responses.map((response) => (
          <ResponseCard key={response.id} response={response} />
        ))}
      </div>
    </div>
  );
}

function ResponseCard({ response }: { response: SurveyResponse }) {
  const submittedDate = response.submittedAt ? new Date(response.submittedAt) : new Date();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{response.name || "Anonymous User"}</CardTitle>
          <Badge variant="outline">
            {format(submittedDate, "MMM d, yyyy")}
          </Badge>
        </div>
        <CardDescription>
          <div className="flex items-center mt-1">
            <Mail className="h-3.5 w-3.5 mr-1" />
            {response.email || "No email provided"}
          </div>
          <div className="flex items-center mt-1">
            <Building className="h-3.5 w-3.5 mr-1" />
            {response.department || "No department"}
          </div>
          <div className="flex items-center mt-1">
            <Briefcase className="h-3.5 w-3.5 mr-1" />
            {response.position || "No position"}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preferences">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="preferences" className="flex-1">Preferences</TabsTrigger>
            <TabsTrigger value="software" className="flex-1">Software</TabsTrigger>
            <TabsTrigger value="hardware" className="flex-1">Hardware</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preferences">
            <div className="space-y-2">
              <div>
                <span className="font-medium">OS Preference:</span>{" "}
                {response.osPreference || "Not specified"}
              </div>
              <div>
                <span className="font-medium">OS Version:</span>{" "}
                {response.osVersion || "Not specified"}
              </div>
              <div>
                <span className="font-medium">OS Reason:</span>{" "}
                <p className="text-sm text-muted-foreground">
                  {response.osPreferenceReason || "No reason provided"}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="software">
            <div className="space-y-2">
              <div>
                <span className="font-medium">Required Software:</span>
                <ul className="mt-1 list-disc list-inside text-sm">
                  {response.requiredSoftware && response.requiredSoftware.length > 0 ? (
                    response.requiredSoftware.map((software, index) => (
                      <li key={index}>{software}</li>
                    ))
                  ) : (
                    <li className="text-muted-foreground">No required software specified</li>
                  )}
                </ul>
              </div>
              <div>
                <span className="font-medium">Additional Software:</span>
                <p className="text-sm text-muted-foreground">
                  {response.additionalSoftware || "None specified"}
                </p>
              </div>
              <div>
                <span className="font-medium">Simultaneous Apps:</span>{" "}
                {response.simultaneousApplications || "Not specified"}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hardware">
            <div className="space-y-2">
              <div>
                <span className="font-medium">CPU Preference:</span>{" "}
                {response.cpuPreference || "Not specified"}
              </div>
              <div>
                <span className="font-medium">RAM Needed:</span>{" "}
                {response.ramNeeded ? `${response.ramNeeded}GB` : "Not specified"}
              </div>
              <div>
                <span className="font-medium">Storage Needed:</span>{" "}
                {response.storageNeeded ? `${response.storageNeeded}GB` : "Not specified"}
              </div>
              <div>
                <span className="font-medium">External Displays:</span>{" "}
                {response.externalDisplaysNeeded || "None specified"}
              </div>
              <div>
                <span className="font-medium">Special Requirements:</span>
                <p className="text-sm text-muted-foreground">
                  {response.specialRequirements || "None specified"}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 
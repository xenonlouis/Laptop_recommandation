'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { SurveyResponse } from "@/types";
import { fetchSurveyResponseById, updateSurveyResponse } from "@/lib/api-client-survey";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

// Helper function to format dates (optional, might not be needed here)
// ...

export default function EditSurveyResponsePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();

  const [response, setResponse] = useState<Partial<SurveyResponse>>({}); // Use Partial for editable form state
  const [initialResponse, setInitialResponse] = useState<SurveyResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminKey = localStorage.getItem("survey-admin-key");
    if (!adminKey) {
      setLoading(false);
      setIsAuthenticated(false);
      setError("Admin access required. Please login.");
      return;
    }
    setIsAuthenticated(true);
    loadResponse(id);
  }, [id]);

  async function loadResponse(responseId: string) {
    try {
      setLoading(true);
      const data = await fetchSurveyResponseById(responseId);
      if (data) {
        setInitialResponse(data);
        setResponse(data); // Initialize form state
        setError(null);
      } else {
        setError("Survey response not found or failed to load.");
      }
    } catch (err: any) {
      console.error("Failed to fetch survey response:", err);
      setError(err.message || "Failed to load survey response.");
    } finally {
      setLoading(false);
    }
  }

  // Generic handler to update form state
  function handleInputChange(key: keyof SurveyResponse, value: any) {
    setResponse(prev => ({ ...prev, [key]: value }));
  }

  // --- Update Handler ---
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    
    setIsSaving(true);
    setError(null);

    try {
      // Only send changed fields? Or send the whole object?
      // Sending partial update is generally better if API supports it.
      // Assuming updateSurveyResponse sends the partial object `response`.
      const updatedData = await updateSurveyResponse(id, response);
      
      toast({
        title: "Success",
        description: "Survey response updated successfully.",
      });
      setInitialResponse(updatedData); // Update the initial state after save
      // Optionally redirect after save
      // router.push(`/survey/responses/${id}`);
    } catch (err: any) {
      console.error("Error updating response:", err);
      setError(err.message || "Failed to update response.");
      toast({
        title: "Error",
        description: err.message || "Failed to update response.",
      });
    } finally {
      setIsSaving(false);
    }
  }
  // ----------------------

  // --- Render Logic --- 
  if (loading) {
    return <div className="container p-6 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!isAuthenticated || error || !initialResponse) {
    return (
      <div className="container mx-auto p-6 max-w-lg">
         <div className="flex items-center mb-6">
          <Link href="/survey/responses">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Error Loading Response</h1>
        </div>
        <Alert variant="destructive">
          <AlertDescription>{error || "Survey response could not be loaded."}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // --- Form Rendering --- 
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
          <Link href={`/survey/responses/${id}`}> {/* Link back to detail view */}
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit Survey Response for {initialResponse.name}</h1>
        </div>

      <form onSubmit={handleUpdate}>
        <Card>
          <CardHeader>
            <CardTitle>Edit Details</CardTitle>
            <CardDescription>Modify the survey response details below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* --- Personal Info Section --- */}
            <h3 className="font-semibold border-b pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div><Label htmlFor="name">Full Name</Label><Input id="name" value={response.name || ''} onChange={(e) => handleInputChange('name', e.target.value)} /></div>
               <div><Label htmlFor="email">Email Address</Label><Input id="email" type="email" value={response.email || ''} onChange={(e) => handleInputChange('email', e.target.value)} /></div>
               <div><Label htmlFor="department">Department</Label><Input id="department" value={response.department || ''} onChange={(e) => handleInputChange('department', e.target.value)} /></div>
               <div><Label htmlFor="position">Position</Label><Input id="position" value={response.position || ''} onChange={(e) => handleInputChange('position', e.target.value)} /></div>
            </div>

            {/* --- Role Identification Section --- */}
            <h3 className="font-semibold border-b pb-2 pt-4">Role Identification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Primary Role</Label>
                <Select value={response.primaryRole || ''} onValueChange={(value) => handleInputChange('primaryRole', value)}>
                  <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="devPercent">Development Percentage</Label>
                {/* Assuming Slider is desired, could also be Input type number */}
                {/* <Input id="devPercent" type="number" min={0} max={100} value={response.developmentPercentage ?? 50} onChange={(e) => handleInputChange('developmentPercentage', parseInt(e.target.value, 10) || 0)} /> */}
                <Slider 
                  id="devPercent" 
                  defaultValue={[50]} 
                  value={[response.developmentPercentage ?? 50]} 
                  max={100} 
                  step={10} 
                  onValueChange={(value) => handleInputChange('developmentPercentage', value[0])} 
                  className="pt-2"
                />
                 <span className="text-sm text-muted-foreground">{response.developmentPercentage ?? 50}%</span>
              </div>
            </div>

            {/* --- OS Preferences Section --- */}
            <h3 className="font-semibold border-b pb-2 pt-4">OS Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <Label>Primary OS</Label>
                  <RadioGroup value={response.primaryOS || ''} onValueChange={(v) => handleInputChange('primaryOS', v)} className="flex space-x-4 pt-2">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="windows" id="edit-os-win" /><Label htmlFor="edit-os-win">Windows</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="macos" id="edit-os-mac" /><Label htmlFor="edit-os-mac">macOS</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="linux" id="edit-os-lin" /><Label htmlFor="edit-os-lin">Linux</Label></div>
                  </RadioGroup>
               </div>
               <div>
                  <Label>Preferred OS</Label>
                   <RadioGroup value={response.preferredOS || ''} onValueChange={(v) => handleInputChange('preferredOS', v)} className="flex space-x-4 pt-2">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="windows" id="edit-pos-win" /><Label htmlFor="edit-pos-win">Windows</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="macos" id="edit-pos-mac" /><Label htmlFor="edit-pos-mac">macOS</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="linux" id="edit-pos-lin" /><Label htmlFor="edit-pos-lin">Linux</Label></div>
                  </RadioGroup>
               </div>
               <div className="md:col-span-2">
                 <Label>Experience with Other OS (comma-separated)</Label>
                 <Input value={(response.experienceWithOtherOS || []).join(', ')} onChange={(e) => handleInputChange('experienceWithOtherOS', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} />
               </div>
               <div className="md:col-span-2">
                  <Label htmlFor="osReason">OS Preference Reason</Label>
                  <Textarea id="osReason" value={response.osPreferenceReason || ''} onChange={(e) => handleInputChange('osPreferenceReason', e.target.value)} />
               </div>
            </div>

            {/* --- Development Questions Section --- */}
            <h3 className="font-semibold border-b pb-2 pt-4">Development Questions</h3>
            <div className="space-y-4">
              <div><Label>Programming Languages (comma-separated)</Label><Input value={(response.programmingLanguages || []).join(', ')} onChange={(e) => handleInputChange('programmingLanguages', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} /></div>
              <div><Label htmlFor="otherLang">Other Languages</Label><Input id="otherLang" value={response.otherLanguages || ''} onChange={(e) => handleInputChange('otherLanguages', e.target.value)} /></div>
              <div><Label>Development Type (comma-separated)</Label><Input value={(response.developmentType || []).join(', ')} onChange={(e) => handleInputChange('developmentType', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} /></div>
              <div><Label htmlFor="otherDev">Other Development Type</Label><Input id="otherDev" value={response.otherDevelopmentType || ''} onChange={(e) => handleInputChange('otherDevelopmentType', e.target.value)} /></div>
              <div className="flex items-center space-x-2"><Checkbox id="resIntEnv" checked={response.resourceIntensiveEnvironments || false} onCheckedChange={(checked) => handleInputChange('resourceIntensiveEnvironments', checked === true)} /><Label htmlFor="resIntEnv">Resource Intensive Environments?</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="multiEnv" checked={response.multipleEnvironments || false} onCheckedChange={(checked) => handleInputChange('multipleEnvironments', checked === true)} /><Label htmlFor="multiEnv">Multiple Environments Simultaneously?</Label></div>
              {/* <div><Label>Terminal Importance</Label> Add Slider/Input for terminalImportance </div> */}
            </div>

             {/* --- Consultant Questions Section --- */}
            <h3 className="font-semibold border-b pb-2 pt-4">Consultant Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label htmlFor="presFreq">Client Presentation Frequency</Label><Input id="presFreq" value={response.clientPresentationFrequency || ''} onChange={(e) => handleInputChange('clientPresentationFrequency', e.target.value)} /></div>
              <div className="flex items-center space-x-2 pt-6"><Checkbox id="largeData" checked={response.largeDataModels || false} onCheckedChange={(checked) => handleInputChange('largeDataModels', checked === true)} /><Label htmlFor="largeData">Work with Large Data Models?</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="specSoft" checked={response.specializedSoftware || false} onCheckedChange={(checked) => handleInputChange('specializedSoftware', checked === true)} /><Label htmlFor="specSoft">Use Specialized Software?</Label></div>
              <div><Label htmlFor="specSoftList">Specialized Software List</Label><Input id="specSoftList" value={response.specializedSoftwareList || ''} onChange={(e) => handleInputChange('specializedSoftwareList', e.target.value)} /></div>
              {/* <div><Label>Battery Life Importance</Label> Add Slider/Input for batteryLifeImportance </div> */}
              <div><Label htmlFor="remoteFreq">Remote Work Frequency</Label><Input id="remoteFreq" value={response.remoteWorkFrequency || ''} onChange={(e) => handleInputChange('remoteWorkFrequency', e.target.value)} /></div>
            </div>
            
            {/* --- Software Tools Section --- */}
            <h3 className="font-semibold border-b pb-2 pt-4">Software Tools</h3>
            <div className="space-y-4">
               <div><Label>Selected Tools (IDs, comma-separated)</Label><Input value={(response.selectedTools || []).join(', ')} onChange={(e) => handleInputChange('selectedTools', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} /></div>
               <div><Label htmlFor="otherTools">Other Tools</Label><Textarea id="otherTools" value={response.otherTools || ''} onChange={(e) => handleInputChange('otherTools', e.target.value)} /></div>
               <div>
                  <Label>Simultaneous Applications</Label>
                  <Select value={response.simultaneousApplications || ''} onValueChange={(value) => handleInputChange('simultaneousApplications', value)}>
                    <SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">1-3 applications</SelectItem>
                      <SelectItem value="4-6">4-6 applications</SelectItem>
                      <SelectItem value="7-10">7-10 applications</SelectItem>
                      <SelectItem value="10+">More than 10 applications</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
            </div>

            {/* --- Hardware Requirements Section --- */}
            <h3 className="font-semibold border-b pb-2 pt-4">Hardware Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div><Label>Required Ports (comma-separated)</Label><Input value={(response.requiredPorts || []).join(', ')} onChange={(e) => handleInputChange('requiredPorts', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} /></div>
               <div><Label htmlFor="otherPorts">Other Ports</Label><Input id="otherPorts" value={response.otherPorts || ''} onChange={(e) => handleInputChange('otherPorts', e.target.value)} /></div>
               <div><Label htmlFor="screenSize">Screen Size Preference</Label><Input id="screenSize" value={response.screenSizePreference || ''} onChange={(e) => handleInputChange('screenSizePreference', e.target.value)} /></div>
               <div className="flex items-center space-x-2 pt-6"><Checkbox id="dediGraph" checked={response.dedicatedGraphicsNeeded || false} onCheckedChange={(checked) => handleInputChange('dedicatedGraphicsNeeded', checked === true)} /><Label htmlFor="dediGraph">Dedicated Graphics Needed?</Label></div>
               <div><Label htmlFor="storage">Storage Needed</Label><Input id="storage" value={response.storageNeeded || ''} onChange={(e) => handleInputChange('storageNeeded', e.target.value)} /></div>
            </div>
            
            {/* --- Workflow Patterns Section --- */}
            <h3 className="font-semibold border-b pb-2 pt-4">Workflow Patterns</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2"><Checkbox id="multiWork" checked={response.multipleWorkspaces || false} onCheckedChange={(checked) => handleInputChange('multipleWorkspaces', checked === true)} /><Label htmlFor="multiWork">Multiple Workspaces?</Label></div>
              <div><Label htmlFor="tabs">Typical Browser Tabs</Label><Input id="tabs" value={response.typicalBrowserTabs || ''} onChange={(e) => handleInputChange('typicalBrowserTabs', e.target.value)} /></div>
              <div><Label htmlFor="displays">External Displays</Label><Input id="displays" value={response.externalDisplays || ''} onChange={(e) => handleInputChange('externalDisplays', e.target.value)} /></div>
              <div className="flex items-center space-x-2"><Checkbox id="resIntApp" checked={response.resourceIntensiveApps || false} onCheckedChange={(checked) => handleInputChange('resourceIntensiveApps', checked === true)} /><Label htmlFor="resIntApp">Resource Intensive Apps?</Label></div>
              <div className="md:col-span-2"><Label htmlFor="resIntAppList">Resource Intensive Apps List</Label><Textarea id="resIntAppList" value={response.resourceIntensiveAppsList || ''} onChange={(e) => handleInputChange('resourceIntensiveAppsList', e.target.value)} /></div>
            </div>

            {/* --- Special Considerations Section --- */}
            <h3 className="font-semibold border-b pb-2 pt-4">Special Considerations</h3>
            <div className="space-y-4">
              <div><Label htmlFor="accessReq">Accessibility Requirements</Label><Textarea id="accessReq" value={response.accessibilityRequirements || ''} onChange={(e) => handleInputChange('accessibilityRequirements', e.target.value)} /></div>
              <div><Label htmlFor="secReq">Security Requirements</Label><Textarea id="secReq" value={response.securityRequirements || ''} onChange={(e) => handleInputChange('securityRequirements', e.target.value)} /></div>
              <div><Label htmlFor="legacyReq">Legacy Software Requirements</Label><Textarea id="legacyReq" value={response.legacySoftwareRequirements || ''} onChange={(e) => handleInputChange('legacySoftwareRequirements', e.target.value)} /></div>
            </div>
            
            {/* Display matched toolkit ID and score (read-only) */}
            <h3 className="font-semibold border-b pb-2 pt-4">Matching Results (Read-only)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Matched Toolkit ID</Label><Input value={response.matchedToolkitId || 'N/A'} readOnly disabled className="bg-muted/50" /></div>
              <div><Label>Match Score</Label><Input value={response.matchScore ?? 'N/A'} readOnly disabled className="bg-muted/50" /></div>
            </div>

          </CardContent>
          <CardFooter className="border-t pt-6">
             {error && (
                <p className="text-sm text-destructive mr-auto">Error: {error}</p>
             )}
             <Button type="submit" disabled={isSaving} className="ml-auto">
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />} 
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
} 
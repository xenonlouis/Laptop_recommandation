"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Laptop,
  Monitor,
  CheckCircle,
  Terminal,
  Database,
  Briefcase,
  Code,
  Box,
  PenTool,
  ChevronRight,
  ChevronLeft,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { OperatingSystem, UserProfile, ToolkitCategory, Tool, Toolkit } from "@/types";
import { fetchTools } from "@/lib/api-client-tools";
import { createSurveyResponse } from "@/lib/api-client-survey";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Define the sections of the survey (Added new sections)
type SurveySection = 
  | "personalInfo" 
  | "roleIdentification" 
  | "osPreference" 
  | "developmentQuestions" 
  | "consultantQuestions" 
  | "softwareTools" 
  | "hardwarePreferences"
  | "workflowPatterns"
  | "specialConsiderations";

// Define the shape of the survey data
interface SurveyData {
  // Personal Information
  name: string;
  email: string;
  department: string;
  position: string;
  
  // Role Identification
  primaryRole: UserProfile | null;
  developmentPercentage: number;

  // OS Preferences
  primaryOS: OperatingSystem | null;
  experienceWithOtherOS: OperatingSystem[];
  preferredOS: OperatingSystem | null;
  osPreferenceReason: string;

  // Development Questions (shown if they do development work)
  programmingLanguages: string[];
  otherLanguages: string;
  developmentType: string[];
  otherDevelopmentType: string;
  resourceIntensiveEnvironments: boolean;
  multipleEnvironments: boolean;
  terminalImportance: number;

  // Consultant Questions
  clientPresentationFrequency: string;
  largeDataModels: boolean;
  specializedSoftware: boolean;
  specializedSoftwareList: string;
  batteryLifeImportance: number;
  remoteWorkFrequency: string;

  // Software Tools Section
  selectedTools: string[];
  otherTools: string;
  simultaneousApplications: string;

  // Hardware Requirements
  requiredPorts: string[];
  otherPorts: string;
  screenSizePreference: string;
  dedicatedGraphicsNeeded: boolean;
  storageNeeded: string;

  // Workflow Patterns
  multipleWorkspaces: boolean;
  typicalBrowserTabs: string;
  externalDisplays: string;
  resourceIntensiveApps: boolean;
  resourceIntensiveAppsList: string;

  // Special Considerations
  accessibilityRequirements: string;
  securityRequirements: string;
  legacySoftwareRequirements: string;
}

// Initialize empty survey data
const initialSurveyData: SurveyData = {
  name: "",
  email: "",
  department: "",
  position: "",
  primaryRole: null,
  developmentPercentage: 50,
  primaryOS: null,
  experienceWithOtherOS: [],
  preferredOS: null,
  osPreferenceReason: "",
  programmingLanguages: [],
  otherLanguages: "",
  developmentType: [],
  otherDevelopmentType: "",
  resourceIntensiveEnvironments: false,
  multipleEnvironments: false,
  terminalImportance: 0,
  clientPresentationFrequency: "",
  largeDataModels: false,
  specializedSoftware: false,
  specializedSoftwareList: "",
  batteryLifeImportance: 0,
  remoteWorkFrequency: "",
  selectedTools: [],
  otherTools: "",
  simultaneousApplications: "",
  requiredPorts: [],
  otherPorts: "",
  screenSizePreference: "",
  dedicatedGraphicsNeeded: false,
  storageNeeded: "",
  multipleWorkspaces: false,
  typicalBrowserTabs: "",
  externalDisplays: "",
  resourceIntensiveApps: false,
  resourceIntensiveAppsList: "",
  accessibilityRequirements: "",
  securityRequirements: "",
  legacySoftwareRequirements: ""
};

export function SurveyContent() {
  const router = useRouter();
  const { toast } = useToast();
  
  // State for survey data
  const [surveyData, setSurveyData] = useState<SurveyData>(initialSurveyData);
  
  // Current section of the survey
  const [currentSection, setCurrentSection] = useState<SurveySection>("personalInfo");
  
  // Loading state for when we're processing the survey data
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for submission result
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  // State to hold validation errors for the current section
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof SurveyData, string>>>({});
  
  // Mock tool data - in a real implementation you would fetch this from your API
  const [availableTools, setAvailableTools] = useState<Tool[]>([]);
  const [isLoadingTools, setIsLoadingTools] = useState(false);
  
  // State to track if the user has already completed the survey
  const [hasCompletedSurvey, setHasCompletedSurvey] = useState<boolean>(false);
  const [emailChecked, setEmailChecked] = useState<boolean>(false);
  
  // Fetch available tools on component mount
  useEffect(() => {
    const loadTools = async () => {
      try {
        setIsLoadingTools(true);
        const tools = await fetchTools();
        setAvailableTools(tools);
      } catch (err) {
        console.error("Error loading tools:", err);
      } finally {
        setIsLoadingTools(false);
      }
    };
    
    loadTools();
  }, []);

  // Get all sections in order (Added new sections in logical order)
  const sections: SurveySection[] = [
    "personalInfo",
    "roleIdentification",
    "osPreference",
    "developmentQuestions",
    "consultantQuestions",
    "softwareTools",
    "hardwarePreferences",
    "workflowPatterns",
    "specialConsiderations",
  ];

  // Calculate progress percentage
  const currentSectionIndex = sections.indexOf(currentSection);
  const progress = Math.round(((currentSectionIndex + 1) / sections.length) * 100);

  // Helper to determine if development questions should be shown
  function isDeveloperFocused(): boolean {
    return surveyData.primaryRole === "developer" || 
           surveyData.developmentPercentage >= 30;
  }

  // Helper to determine if consultant questions should be shown
  function isConsultantFocused(): boolean {
    return surveyData.primaryRole === "consultant" || 
           (surveyData.primaryRole === "developer" && surveyData.developmentPercentage < 70);
  }

  // --- Validation Logic ---
  function validateSection(section: SurveySection): { isValid: boolean; errors: Partial<Record<keyof SurveyData, string>> } {
    const errors: Partial<Record<keyof SurveyData, string>> = {};

    if (section === "personalInfo") {
      if (!surveyData.name.trim()) errors.name = "Full Name is required.";
      if (!surveyData.email.trim()) errors.email = "Email Address is required.";
      else if (!/\S+@\S+\.\S+/.test(surveyData.email)) errors.email = "Email address is invalid.";
      if (!surveyData.department.trim()) errors.department = "Department is required.";
      if (!surveyData.position.trim()) errors.position = "Position is required.";
      
      // Check if email has already been used (if checked)
      if (emailChecked && hasCompletedSurvey) {
          errors.email = "This email has already submitted a survey.";
      }
    }
    
    // Add validation for other sections here if needed
    // Example:
    // if (section === "osPreference") {
    //   if (!surveyData.primaryOS) errors.primaryOS = "Please select your primary OS.";
    // }

    setValidationErrors(errors); // Update state with current errors
    return { isValid: Object.keys(errors).length === 0, errors };
  }
  // -----------------------

  // Navigation functions
  function goToNextSection() {
    // Validate current section before proceeding
    const { isValid } = validateSection(currentSection);
    if (!isValid) {
      toast({ title: "Missing Information", description: "Please fill in all required fields before proceeding." });
      return; // Stop navigation
    }
    
    // Clear errors if section is valid
    setValidationErrors({});
    
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
      window.scrollTo(0, 0); // Scroll to top when changing sections
    }
  }

  function goToPreviousSection() {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
      window.scrollTo(0, 0); // Scroll to top when changing sections
    }
  }

  // Check if user has already completed a survey when they enter their email
  const checkEmailCompletion = async (email: string) => {
    if (!email || email.trim() === '' || !email.includes('@')) return;
    
    try {
      const { hasCompletedSurvey } = await import('@/lib/api-client-survey');
      const completed = await hasCompletedSurvey(email);
      
      setHasCompletedSurvey(completed);
      setEmailChecked(true);
    } catch (error) {
      console.error('Error checking survey completion status:', error);
    }
  };

  // Handle form submission
  async function handleSubmit() {
    console.log(">>> handleSubmit: Function called");
    
    // Validate the final section before submitting
    const { isValid } = validateSection("hardwarePreferences"); // Assuming hardware is the last input section
    if (!isValid) {
      toast({ title: "Missing Information", description: "Please ensure all required fields in the final section are filled." });
      return; // Stop submission
    }
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      console.log(">>> handleSubmit: Entering try block");
      
      // Clean up comma-separated fields before submission
      const cleanedSurveyData = {
        ...surveyData,
        programmingLanguages: surveyData.programmingLanguages.filter(Boolean),
        developmentType: surveyData.developmentType.filter(Boolean),
        requiredPorts: surveyData.requiredPorts.filter(Boolean),
        // Also clean experienceWithOtherOS just in case, though it uses checkboxes
        experienceWithOtherOS: surveyData.experienceWithOtherOS.filter(Boolean),
      };
      
      // Create a cleaned version of the data for submission
      const submissionData = {
        ...cleanedSurveyData, // Use the cleaned data
        submittedAt: new Date().toISOString()
      };
      
      console.log("Survey data prepared for submission:", submissionData);
      
      // Submit the data using the updated API client function
      const responseData = await createSurveyResponse(submissionData);
      // console.log("Survey submission response data:", responseData); // We get SurveyResponse back now
      
      // Show success message
      setSubmissionResult({
        success: true,
        message: "Thank you for completing the survey. Your response has been recorded."
      });
      
      toast({
        title: "Survey Submitted",
        description: "Thank you for completing the survey!",
      });
      
      // Redirect to the Thank You page after delay
      setTimeout(() => {
        router.push("/survey/thank-you"); // Changed redirect target
      }, 1500); // Shortened delay a bit

      console.log(">>> handleSubmit: Try block finished successfully");
      
    } catch (error) {
      console.error(">>> handleSubmit: Entering catch block", error);
      console.error("Error submitting survey:", error);
      
      // Show error message
      setSubmissionResult({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred while submitting your survey."
      });
      
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your survey. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Update survey data helper function
  function updateSurveyData<K extends keyof SurveyData>(
    key: K,
    value: SurveyData[K]
  ) {
    setSurveyData(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Check email completion if the email is being updated
    if (key === 'email' && typeof value === 'string') {
      checkEmailCompletion(value);
    }
  }

  // Fix all onCheckedChange handlers with the same pattern
  function fixedCheckHandler(key: keyof SurveyData, checked: boolean | "indeterminate") {
    updateSurveyData(key, checked === true);
  }

  // Determine which section to render
  function renderCurrentSection() {
    switch (currentSection) {
      case "personalInfo":
        return renderPersonalInfoSection();
      case "roleIdentification":
        return renderRoleIdentificationSection();
      case "osPreference":
        return renderOsPreferenceSection();
      case "developmentQuestions":
        return isDeveloperFocused() ? renderDevelopmentQuestionsSection() : null;
      case "consultantQuestions":
        return isConsultantFocused() ? renderConsultantQuestionsSection() : null;
      case "softwareTools":
        return renderSoftwareToolsSection();
      case "hardwarePreferences":
        return renderHardwareRequirementsSection();
      case "workflowPatterns":
        return renderWorkflowPatternsSection();
      case "specialConsiderations":
        return renderSpecialConsiderationsSection();
      default:
        return <div>Loading section...</div>;
    }
  }

  function renderPersonalInfoSection() {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Personal Information</h3>
          <p className="text-sm text-muted-foreground">
            Please provide your details so we can personalize recommendations.
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={surveyData.name}
              onChange={(e) => updateSurveyData("name", e.target.value)}
              className="mt-2"
              placeholder="Enter your full name"
            />
            {validationErrors.name && <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>}
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={surveyData.email}
              onChange={(e) => updateSurveyData("email", e.target.value)}
              className="mt-2"
              placeholder="Enter your email address"
            />
            {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
          </div>
          
          <div>
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={surveyData.department}
              onChange={(e) => updateSurveyData("department", e.target.value)}
              className="mt-2"
              placeholder="Enter your department"
            />
            {validationErrors.department && <p className="text-red-500 text-xs mt-1">{validationErrors.department}</p>}
          </div>
          
          <div>
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={surveyData.position}
              onChange={(e) => updateSurveyData("position", e.target.value)}
              className="mt-2"
              placeholder="Enter your position/job title"
            />
            {validationErrors.position && <p className="text-red-500 text-xs mt-1">{validationErrors.position}</p>}
          </div>
          
          {emailChecked && hasCompletedSurvey && (
            <div className="text-red-500 text-sm mt-1">
              You have already completed this survey. You cannot submit multiple responses with the same email.
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderOsPreferenceSection() {
    // Implementation will follow
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Operating System Preferences</h2>
        
        <div className="space-y-4">
          <div>
            <Label className="text-base">Which operating system do you currently use most frequently?</Label>
            <RadioGroup 
              value={surveyData.primaryOS || ""} 
              onValueChange={(value) => updateSurveyData("primaryOS", value as OperatingSystem)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="windows" id="windows" />
                <Label htmlFor="windows">Windows</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="macos" id="macos" />
                <Label htmlFor="macos">macOS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="linux" id="linux" />
                <Label htmlFor="linux">Linux</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label className="text-base block mb-3">Do you have experience with multiple operating systems?</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="exp-windows" 
                  checked={surveyData.experienceWithOtherOS.includes("windows")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateSurveyData("experienceWithOtherOS", [...surveyData.experienceWithOtherOS, "windows"]);
                    } else {
                      updateSurveyData("experienceWithOtherOS", 
                        surveyData.experienceWithOtherOS.filter(os => os !== "windows")
                      );
                    }
                  }}
                />
                <Label htmlFor="exp-windows">Windows</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="exp-macos" 
                  checked={surveyData.experienceWithOtherOS.includes("macos")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateSurveyData("experienceWithOtherOS", [...surveyData.experienceWithOtherOS, "macos"]);
                    } else {
                      updateSurveyData("experienceWithOtherOS", 
                        surveyData.experienceWithOtherOS.filter(os => os !== "macos")
                      );
                    }
                  }}
                />
                <Label htmlFor="exp-macos">macOS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="exp-linux" 
                  checked={surveyData.experienceWithOtherOS.includes("linux")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateSurveyData("experienceWithOtherOS", [...surveyData.experienceWithOtherOS, "linux"]);
                    } else {
                      updateSurveyData("experienceWithOtherOS", 
                        surveyData.experienceWithOtherOS.filter(os => os !== "linux")
                      );
                    }
                  }}
                />
                <Label htmlFor="exp-linux">Linux</Label>
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-base">If you could choose any OS for your work, which would you prefer?</Label>
            <RadioGroup 
              value={surveyData.preferredOS || ""} 
              onValueChange={(value) => updateSurveyData("preferredOS", value as OperatingSystem)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="windows" id="pref-windows" />
                <Label htmlFor="pref-windows">Windows</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="macos" id="pref-macos" />
                <Label htmlFor="pref-macos">macOS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="linux" id="pref-linux" />
                <Label htmlFor="pref-linux">Linux</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="osReason">Why do you prefer this operating system?</Label>
            <Textarea 
              id="osReason" 
              value={surveyData.osPreferenceReason} 
              onChange={(e) => updateSurveyData("osPreferenceReason", e.target.value)}
              className="mt-2"
              placeholder="e.g. software compatibility, familiarity, specific features..."
            />
          </div>
        </div>
      </div>
    );
  }

  function renderSoftwareToolsSection() {
    // Group tools by category for better organization
    const toolsByCategory: Record<string, Tool[]> = {};
    
    availableTools.forEach(tool => {
      if (!toolsByCategory[tool.category]) {
        toolsByCategory[tool.category] = [];
      }
      toolsByCategory[tool.category].push(tool);
    });
    
    // Format category name for display
    const formatCategory = (category: string) => {
      return category.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    };
    
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Software Tools</h3>
          <p className="text-sm text-muted-foreground">
            Select the tools you currently use or would need for your work.
          </p>
        </div>
        
        {isLoadingTools ? (
          <div className="py-8 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <span className="ml-2">Loading available tools...</span>
          </div>
        ) : availableTools.length === 0 ? (
          <div className="py-4">
            <p className="text-muted-foreground">No predefined tools found. Please specify the tools you use below.</p>
            <div className="mt-4">
              <Label htmlFor="otherTools">Please list the tools you use</Label>
              <Textarea
                id="otherTools"
                placeholder="List the software tools you regularly use, separated by commas"
                value={surveyData.otherTools}
                onChange={(e) => updateSurveyData("otherTools", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Display tools by category */}
            {Object.entries(toolsByCategory).map(([category, tools]) => (
              <div key={category} className="space-y-4">
                <h4 className="font-medium">{formatCategory(category)}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {tools.map(tool => (
                    <div key={tool.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={`tool-${tool.id}`}
                        checked={surveyData.selectedTools.includes(tool.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateSurveyData("selectedTools", [...surveyData.selectedTools, tool.id]);
                          } else {
                            updateSurveyData(
                              "selectedTools",
                              surveyData.selectedTools.filter(id => id !== tool.id)
                            );
                          }
                        }}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={`tool-${tool.id}`}
                          className="text-sm font-medium leading-none cursor-pointer flex items-center gap-2"
                        >
                          {tool.icon && (
                            <img 
                              src={tool.icon} 
                              alt={`${tool.name} icon`} 
                              className="h-4 w-4 object-contain"
                            />
                          )}
                          {tool.name}
                        </label>
                        {tool.description && (
                          <p className="text-xs text-muted-foreground pl-6">{tool.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t">
              <Label htmlFor="otherTools">Other tools not listed above</Label>
              <Textarea
                id="otherTools"
                placeholder="List any additional software tools you regularly use that aren't listed above"
                value={surveyData.otherTools}
                onChange={(e) => updateSurveyData("otherTools", e.target.value)}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="simultaneousApplications">
                How many applications do you typically run simultaneously?
              </Label>
              <Select
                value={surveyData.simultaneousApplications}
                onValueChange={(value) => updateSurveyData("simultaneousApplications", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3">1-3 applications</SelectItem>
                  <SelectItem value="4-6">4-6 applications</SelectItem>
                  <SelectItem value="7-10">7-10 applications</SelectItem>
                  <SelectItem value="10+">More than 10 applications</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderHardwareRequirementsSection() {
    // Implementation will follow
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Hardware Requirements</h2>
        
        <div className="space-y-4">
          <div>
            <Label className="text-base">Required Ports</Label>
            <Input 
              id="requiredPorts" 
              placeholder="e.g., HDMI, USB-C, Ethernet"
              value={surveyData.requiredPorts.join(", ")} 
              onChange={(e) => updateSurveyData("requiredPorts", e.target.value.split(",").map(port => port.trim()))}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label className="text-base">Other Ports</Label>
            <Input 
              id="otherPorts" 
              value={surveyData.otherPorts} 
              onChange={(e) => updateSurveyData("otherPorts", e.target.value)}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label className="text-base">Screen Size Preference</Label>
            <Input 
              id="screenSizePreference" 
              value={surveyData.screenSizePreference} 
              onChange={(e) => updateSurveyData("screenSizePreference", e.target.value)}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label className="text-base">Dedicated Graphics Needed</Label>
            <Checkbox 
              id="dedicatedGraphicsNeeded" 
              checked={surveyData.dedicatedGraphicsNeeded}
              onCheckedChange={(checked) => fixedCheckHandler("dedicatedGraphicsNeeded", checked)}
            />
          </div>
          
          <div>
            <Label className="text-base">Storage Needed</Label>
            <Input 
              id="storageNeeded" 
              value={surveyData.storageNeeded} 
              onChange={(e) => updateSurveyData("storageNeeded", e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
      </div>
    );
  }

  function renderRoleIdentificationSection() {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Role Identification</h3>
          <p className="text-sm text-muted-foreground">
            Help us understand your primary function.
          </p>
        </div>
        <div className="space-y-4">
          <div>
             <Label>What is your primary role?</Label>
             <RadioGroup 
                value={surveyData.primaryRole || ""} 
                onValueChange={(value) => updateSurveyData("primaryRole", value as UserProfile)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="developer" id="role-dev" />
                  <Label htmlFor="role-dev">Developer / Engineer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="consultant" id="role-consultant" />
                  <Label htmlFor="role-consultant">Consultant / Analyst</Label>
                </div>
                {/* Add other roles if applicable */}
              </RadioGroup>
          </div>
          <div>
            <Label htmlFor="devPercent">Approximately what percentage of your time involves software development or technical configuration?</Label>
            <Slider 
              id="devPercent" 
              defaultValue={[50]} 
              value={[surveyData.developmentPercentage ?? 50]} 
              max={100} 
              step={10} 
              onValueChange={(value) => updateSurveyData('developmentPercentage', value[0])} 
              className="pt-4"
            />
            <span className="text-sm text-muted-foreground pt-2 block text-center">{surveyData.developmentPercentage ?? 50}%</span>
          </div>
        </div>
      </div>
    );
  }

  function renderDevelopmentQuestionsSection() {
    // This section is only shown if isDeveloperFocused() is true
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Development Profile Questions</h3>
          <p className="text-sm text-muted-foreground">
            Please provide details about your development work.
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <Label>Programming Languages (comma-separated)</Label>
            <Input 
              placeholder="e.g., Java, Python, JavaScript, Apex" 
              value={(surveyData.programmingLanguages || []).join(', ')} 
              onChange={(e) => updateSurveyData('programmingLanguages', e.target.value.split(',').map(s=>s.trim()))} 
            />
          </div>
          <div>
            <Label htmlFor="otherLang">Other Languages/Frameworks</Label>
            <Input 
              id="otherLang" 
              placeholder="Any other significant languages or frameworks?"
              value={surveyData.otherLanguages || ''} 
              onChange={(e) => updateSurveyData('otherLanguages', e.target.value)} 
            />
          </div>
          <div>
            <Label>Primary Development Type (comma-separated)</Label>
            <Input 
              placeholder="e.g., Web Development, Backend Services, Data Science, Mobile"
              value={(surveyData.developmentType || []).join(', ')} 
              onChange={(e) => updateSurveyData('developmentType', e.target.value.split(',').map(s=>s.trim()))} 
            />
          </div>
           <div>
            <Label htmlFor="otherDevType">Other Development Types</Label>
            <Input 
              id="otherDevType" 
              placeholder="Any other specific types of development?"
              value={surveyData.otherDevelopmentType || ''} 
              onChange={(e) => updateSurveyData('otherDevelopmentType', e.target.value)} 
            />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="resIntEnv" 
              checked={surveyData.resourceIntensiveEnvironments || false} 
              onCheckedChange={(checked) => updateSurveyData('resourceIntensiveEnvironments', checked === true)} 
            />
            <Label htmlFor="resIntEnv">Do you work with resource-intensive development environments (e.g., large local databases, VMs, containers)?</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="multiEnv" 
              checked={surveyData.multipleEnvironments || false} 
              onCheckedChange={(checked) => updateSurveyData('multipleEnvironments', checked === true)} 
            />
            <Label htmlFor="multiEnv">Do you need to run multiple development environments simultaneously?</Label>
          </div>
          <div>
            <Label htmlFor="terminalImportance">How important is a powerful and customizable terminal/command-line environment?</Label>
            <Slider 
              id="terminalImportance"
              defaultValue={[5]} 
              value={[surveyData.terminalImportance ?? 5]} 
              max={10} 
              step={1} 
              onValueChange={(value) => updateSurveyData('terminalImportance', value[0])} 
              className="pt-4"
            />
            <span className="text-sm text-muted-foreground pt-2 block text-center">
              {surveyData.terminalImportance ?? 5} / 10 (Higher is more important)
            </span>
          </div>
        </div>
      </div>
    );
  }

  function renderConsultantQuestionsSection() {
    // This section is only shown if isConsultantFocused() is true
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Consultant Profile Questions</h3>
          <p className="text-sm text-muted-foreground">
            Please provide details about your consulting activities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
              <Label htmlFor="presFreq">How often do you present to clients?</Label>
              <Select value={surveyData.clientPresentationFrequency || ''} onValueChange={(value) => updateSurveyData('clientPresentationFrequency', value)}>
                <SelectTrigger id="presFreq"><SelectValue placeholder="Select frequency" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="rarely">Rarely</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="remoteFreq">How often do you work remotely or travel?</Label>
               <Select value={surveyData.remoteWorkFrequency || ''} onValueChange={(value) => updateSurveyData('remoteWorkFrequency', value)}>
                <SelectTrigger id="remoteFreq"><SelectValue placeholder="Select frequency" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mostly_remote">Mostly Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid (Office/Remote)</SelectItem>
                  <SelectItem value="frequent_travel">Frequent Travel</SelectItem>
                  <SelectItem value="mostly_office">Mostly Office</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="flex items-center space-x-2 pt-2 md:pt-6">
              <Checkbox 
                id="largeData" 
                checked={surveyData.largeDataModels || false} 
                onCheckedChange={(checked) => updateSurveyData('largeDataModels', checked === true)} 
              />
              <Label htmlFor="largeData">Do you work with large data models or datasets (e.g., complex Excel, BI tools)?</Label>
            </div>
            <div className="flex items-center space-x-2 pt-2 md:pt-6">
              <Checkbox 
                id="specSoft" 
                checked={surveyData.specializedSoftware || false} 
                onCheckedChange={(checked) => updateSurveyData('specializedSoftware', checked === true)} 
              />
              <Label htmlFor="specSoft">Do you use specialized software (e.g., Salesforce, SAP, specific analytics tools)?</Label>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="specSoftList">List specialized software used:</Label>
              <Input 
                id="specSoftList" 
                value={surveyData.specializedSoftwareList || ''} 
                onChange={(e) => updateSurveyData('specializedSoftwareList', e.target.value)} 
                placeholder="e.g., Salesforce CRM, Tableau, PowerBI"
              />
            </div>
             <div className="md:col-span-2">
              <Label htmlFor="batteryImportance">How important is long battery life (e.g., for working away from power outlets)?</Label>
              <Slider 
                id="batteryImportance"
                defaultValue={[5]} 
                value={[surveyData.batteryLifeImportance ?? 5]} 
                max={10} 
                step={1} 
                onValueChange={(value) => updateSurveyData('batteryLifeImportance', value[0])} 
                className="pt-4"
              />
              <span className="text-sm text-muted-foreground pt-2 block text-center">
                {surveyData.batteryLifeImportance ?? 5} / 10 (Higher is more important)
              </span>
            </div>
        </div>
      </div>
    );
  }

  function renderWorkflowPatternsSection() {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Workflow & Usage Patterns</h3>
          <p className="text-sm text-muted-foreground">
            How do you typically work?
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="flex items-center space-x-2">
            <Checkbox 
              id="multiWork" 
              checked={surveyData.multipleWorkspaces || false} 
              onCheckedChange={(checked) => updateSurveyData('multipleWorkspaces', checked === true)} 
            />
            <Label htmlFor="multiWork">Do you frequently use multiple virtual desktops or workspaces?</Label>
          </div>
           <div className="flex items-center space-x-2">
             <Checkbox 
              id="resIntApp" 
              checked={surveyData.resourceIntensiveApps || false} 
              onCheckedChange={(checked) => updateSurveyData('resourceIntensiveApps', checked === true)} 
            />
            <Label htmlFor="resIntApp">Do you regularly run resource-intensive applications (besides development tools)?</Label>
          </div>
          <div>
            <Label htmlFor="tabs">Typically, how many browser tabs do you keep open?</Label>
            <Select value={surveyData.typicalBrowserTabs || ''} onValueChange={(value) => updateSurveyData('typicalBrowserTabs', value)}>
              <SelectTrigger id="tabs"><SelectValue placeholder="Select estimate" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="few">Few (1-10)</SelectItem>
                <SelectItem value="moderate">Moderate (11-30)</SelectItem>
                <SelectItem value="many">Many (31-50)</SelectItem>
                <SelectItem value="very_many">Very Many (50+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="displays">How many external displays do you typically use?</Label>
             <Select value={surveyData.externalDisplays || ''} onValueChange={(value) => updateSurveyData('externalDisplays', value)}>
              <SelectTrigger id="displays"><SelectValue placeholder="Select number" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3+">3 or more</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="resIntAppList">If yes to resource-intensive apps, please list them:</Label>
            <Textarea 
              id="resIntAppList" 
              value={surveyData.resourceIntensiveAppsList || ''} 
              onChange={(e) => updateSurveyData('resourceIntensiveAppsList', e.target.value)} 
              placeholder="e.g., Video editing software, CAD software, data analysis tools..."
            />
          </div>
        </div>
      </div>
    );
  }

  function renderSpecialConsiderationsSection() {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Special Considerations</h3>
          <p className="text-sm text-muted-foreground">
            Any other requirements or constraints we should be aware of?
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="accessReq">Accessibility Requirements</Label>
            <Textarea 
              id="accessReq" 
              value={surveyData.accessibilityRequirements || ''} 
              onChange={(e) => updateSurveyData('accessibilityRequirements', e.target.value)} 
              placeholder="e.g., Screen reader compatibility, specific keyboard/mouse needs..."
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="secReq">Security Requirements</Label>
             <Textarea 
              id="secReq" 
              value={surveyData.securityRequirements || ''} 
              onChange={(e) => updateSurveyData('securityRequirements', e.target.value)} 
              placeholder="e.g., Need for encrypted storage, specific VPN software..."
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="legacyReq">Legacy Software Requirements</Label>
             <Textarea 
              id="legacyReq" 
              value={surveyData.legacySoftwareRequirements || ''} 
              onChange={(e) => updateSurveyData('legacySoftwareRequirements', e.target.value)} 
              placeholder="e.g., Need to run specific older applications, compatibility needs..."
              className="mt-2"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">Section {currentSectionIndex + 1} of {sections.length}</span>
          <span className="text-sm font-medium">{progress}% completed</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {/* Current section content */}
      <div className="bg-card p-6 rounded-md border">
        {renderCurrentSection()}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={goToPreviousSection}
          disabled={currentSectionIndex === 0}
          className="flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button
          onClick={() => {
            const { isValid } = validateSection(currentSection);
            if (!isValid) {
              toast({ title: "Missing Information", description: "Please fill in all required fields." });
              return;
            }
            setValidationErrors({}); // Clear errors if valid
            
            // Last section index is now sections.length - 1
            if (currentSectionIndex === sections.length - 1) {
              handleSubmit();
            } else {
              goToNextSection();
            }
          }}
          disabled={isSubmitting}
          className="flex items-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          // Condition for "Complete Survey" is now last section index
          ) : currentSectionIndex === sections.length - 1 ? (
            <>
              Complete Survey
              <CheckCircle className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
} 
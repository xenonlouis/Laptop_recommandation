"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { v4 as uuidv4 } from "uuid"
import { Toolkit, ToolkitItem, OperatingSystem } from "@/types"
import { addToolkit } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { ArrowLeft, Plus, Trash } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function AddToolkitPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [profileName, setProfileName] = useState("")
  const [description, setDescription] = useState("")
  const [operatingSystem, setOperatingSystem] = useState<OperatingSystem>("windows")
  const [tools, setTools] = useState<ToolkitItem[]>([])

  // Create a new empty tool
  const createNewTool = (): ToolkitItem => ({
    id: uuidv4(),
    name: "",
    description: "",
    category: "development",
    isRequired: false,
    downloadUrl: "",
    installationNotes: "",
    alternatives: []
  })

  // Add a new empty tool to the list
  const addNewTool = () => {
    setTools([...tools, createNewTool()])
  }

  // Remove a tool from the list
  const removeTool = (id: string) => {
    setTools(tools.filter(tool => tool.id !== id))
  }

  // Update tool properties
  const updateTool = (id: string, field: keyof ToolkitItem, value: any) => {
    setTools(tools.map(tool => {
      if (tool.id === id) {
        return { ...tool, [field]: value }
      }
      return tool
    }))
  }

  // Update alternatives (comma-separated string to array)
  const updateAlternatives = (id: string, value: string) => {
    const alternatives = value.split(',').map(alt => alt.trim()).filter(Boolean)
    updateTool(id, 'alternatives', alternatives)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!profileName.trim()) {
      setError("Profile name is required")
      return
    }
    
    if (tools.length === 0) {
      setError("At least one tool is required")
      return
    }

    // Validate tools
    const invalidTools = tools.filter(tool => !tool.name.trim() || !tool.description.trim())
    if (invalidTools.length > 0) {
      setError("All tools must have a name and description")
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const newToolkit: Omit<Toolkit, 'id'> = {
        profileName,
        description,
        operatingSystem,
        tools
      }
      
      const result = await addToolkit(newToolkit)
      
      toast({
        title: "Success",
        description: `Toolkit for ${profileName} (${operatingSystem}) has been created`,
      })
      
      router.push('/toolkits')
    } catch (err) {
      console.error("Error adding toolkit:", err)
      setError("Failed to add toolkit. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/toolkits">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to toolkits</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Add New Toolkit</h1>
          </div>
        </div>
      </header>

      <main className="container py-6">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profileName">Profile Name*</Label>
                  <Input
                    id="profileName"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="e.g., Frontend Developer, Data Analyst"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the role and toolkit purpose"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Operating System*</Label>
                  <RadioGroup 
                    value={operatingSystem} 
                    onValueChange={(value) => setOperatingSystem(value as OperatingSystem)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="windows" id="windows" />
                      <Label htmlFor="windows">Windows</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="macos" id="macos" />
                      <Label htmlFor="macos">macOS</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Tools</CardTitle>
              <Button 
                type="button" 
                onClick={addNewTool} 
                variant="outline"
                size="sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Tool
              </Button>
            </CardHeader>
            <CardContent>
              {tools.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No tools added yet. Click "Add Tool" to start building your toolkit.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {tools.map((tool, index) => (
                    <div key={tool.id} className="border rounded-md p-6 relative">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeTool(tool.id)}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                      
                      <h3 className="font-medium mb-4">Tool #{index + 1}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`tool-name-${tool.id}`}>Name*</Label>
                          <Input
                            id={`tool-name-${tool.id}`}
                            value={tool.name}
                            onChange={(e) => updateTool(tool.id, 'name', e.target.value)}
                            placeholder="e.g., Visual Studio Code"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`tool-category-${tool.id}`}>Category*</Label>
                          <Select 
                            value={tool.category} 
                            onValueChange={(value) => updateTool(tool.id, 'category', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="development">Development</SelectItem>
                              <SelectItem value="productivity">Productivity</SelectItem>
                              <SelectItem value="communication">Communication</SelectItem>
                              <SelectItem value="specialized">Specialized</SelectItem>
                              <SelectItem value="security">Security</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor={`tool-description-${tool.id}`}>Description*</Label>
                          <Textarea
                            id={`tool-description-${tool.id}`}
                            value={tool.description}
                            onChange={(e) => updateTool(tool.id, 'description', e.target.value)}
                            placeholder="Describe what this tool does and why it's needed"
                            rows={2}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`tool-download-${tool.id}`}>Download URL</Label>
                          <Input
                            id={`tool-download-${tool.id}`}
                            value={tool.downloadUrl}
                            onChange={(e) => updateTool(tool.id, 'downloadUrl', e.target.value)}
                            placeholder="https://..."
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`tool-alternatives-${tool.id}`}>Alternatives</Label>
                          <Input
                            id={`tool-alternatives-${tool.id}`}
                            value={tool.alternatives?.join(', ') || ""}
                            onChange={(e) => updateAlternatives(tool.id, e.target.value)}
                            placeholder="Alternative tools, comma separated"
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor={`tool-notes-${tool.id}`}>Installation Notes</Label>
                          <Textarea
                            id={`tool-notes-${tool.id}`}
                            value={tool.installationNotes}
                            onChange={(e) => updateTool(tool.id, 'installationNotes', e.target.value)}
                            placeholder="Special instructions for installation or configuration"
                            rows={2}
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`required-${tool.id}`}
                            checked={tool.isRequired}
                            onCheckedChange={(checked) => updateTool(tool.id, 'isRequired', checked)}
                          />
                          <Label htmlFor={`required-${tool.id}`}>Required Tool</Label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {tools.length > 0 && (
              <CardFooter>
                <Button 
                  type="button" 
                  onClick={addNewTool} 
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Tool
                </Button>
              </CardFooter>
            )}
          </Card>

          <div className="flex justify-end space-x-4">
            <Link href="/toolkits">
              <Button variant="outline" type="button">Cancel</Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Create Toolkit"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
} 
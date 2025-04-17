"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { v4 as uuidv4 } from "uuid"
import { Toolkit, ToolkitItem, OperatingSystem } from "@/types"
import { fetchToolkitById, updateToolkit } from "@/lib/api-client"
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
import { ArrowLeft, Plus, Trash, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default async function EditToolkitPage({ params }: { params: { id: string } }) {
  // We need to await params first since it's now a Promise in Next.js 15.1.0
  const resolvedParams = await params;
  
  return <EditToolkitContent id={resolvedParams.id} />;
}

// Client component that handles the actual editing
function EditToolkitContent({ id }: { id: string }) {
  const router = useRouter()
  const { toast } = useToast()
  
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [toolkit, setToolkit] = useState<Toolkit | null>(null)
  const [profileName, setProfileName] = useState("")
  const [description, setDescription] = useState("")
  const [operatingSystem, setOperatingSystem] = useState<OperatingSystem>("windows")
  const [tools, setTools] = useState<ToolkitItem[]>([])
  
  // Fetch the toolkit data on component mount
  useEffect(() => {
    const loadToolkit = async () => {
      try {
        setLoading(true)
        const toolkit = await fetchToolkitById(id)
        
        if (toolkit) {
          setToolkit(toolkit)
          setProfileName(toolkit.profileName)
          setDescription(toolkit.description || "")
          setOperatingSystem(toolkit.operatingSystem || "windows")
          setTools(toolkit.tools || [])
        } else {
          setError("Toolkit not found")
        }
      } catch (err) {
        console.error(err)
        setError("Failed to load toolkit")
      } finally {
        setLoading(false)
      }
    }
    
    loadToolkit()
  }, [id])
  
  const addTool = () => {
    setTools([
      ...tools,
      {
        id: uuidv4(),
        name: "",
        alternatives: [],
        required: false,
        category: "general",
      }
    ])
  }
  
  const updateTool = (index: number, field: keyof ToolkitItem, value: any) => {
    const newTools = [...tools]
    newTools[index] = {
      ...newTools[index],
      [field]: value
    }
    setTools(newTools)
  }
  
  const updateToolAlternatives = (index: number, value: string) => {
    const newTools = [...tools]
    newTools[index] = {
      ...newTools[index],
      alternatives: value.split(',').map(item => item.trim()).filter(Boolean)
    }
    setTools(newTools)
  }
  
  const removeTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!profileName) {
      toast({
        title: "Error",
        description: "Profile name is required",
        variant: "destructive",
      })
      return
    }
    
    // Validate tools
    for (const tool of tools) {
      if (!tool.name) {
        toast({
          title: "Error",
          description: "All tools must have a name",
          variant: "destructive",
        })
        return
      }
    }
    
    const updatedToolkit: Toolkit = {
      id,
      profileName,
      description,
      operatingSystem,
      tools,
    }
    
    setSubmitting(true)
    
    try {
      await updateToolkit(updatedToolkit)
      
      toast({
        title: "Success",
        description: "Toolkit updated successfully",
      })
      
      router.push("/toolkits")
    } catch (err) {
      console.error(err)
      toast({
        title: "Error",
        description: "Failed to update toolkit",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }
  
  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="container py-8">
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button asChild>
          <Link href="/toolkits">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolkits
          </Link>
        </Button>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" asChild>
          <Link href="/toolkits">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolkits
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Toolkit</h1>
        <div className="w-[100px]"></div>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Toolkit Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profileName">Profile Name *</Label>
              <Input
                id="profileName"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Operating System</Label>
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
                  <RadioGroupItem value="mac" id="mac" />
                  <Label htmlFor="mac">Mac</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="linux" id="linux" />
                  <Label htmlFor="linux">Linux</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cross-platform" id="cross-platform" />
                  <Label htmlFor="cross-platform">Cross-Platform</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Tools</Label>
                <Button type="button" variant="outline" size="sm" onClick={addTool}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Tool
                </Button>
              </div>
              
              {tools.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No tools added yet. Click "Add Tool" to get started.
                </div>
              ) : (
                <div className="space-y-4">
                  {tools.map((tool, index) => (
                    <Card key={tool.id} className="relative">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeTool(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      
                      <CardContent className="pt-6 grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Tool Name *</Label>
                            <Input
                              value={tool.name}
                              onChange={(e) => updateTool(index, "name", e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Category</Label>
                            <Select
                              value={tool.category}
                              onValueChange={(value) => updateTool(index, "category", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="general">General</SelectItem>
                                <SelectItem value="productivity">Productivity</SelectItem>
                                <SelectItem value="development">Development</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="security">Security</SelectItem>
                                <SelectItem value="utility">Utility</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Alternatives (comma-separated)</Label>
                          <Input
                            value={tool.alternatives?.join(', ') || ""}
                            onChange={(e) => updateToolAlternatives(index, e.target.value)}
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`required-${tool.id}`}
                            checked={tool.required}
                            onCheckedChange={(checked) => updateTool(index, "required", checked)}
                          />
                          <Label htmlFor={`required-${tool.id}`}>Required</Label>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" asChild>
              <Link href="/toolkits">Cancel</Link>
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 
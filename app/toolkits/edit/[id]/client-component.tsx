"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Toolkit, OperatingSystem } from "@/types"
import { fetchToolkitById, updateToolkit } from "@/lib/api-client"
import { fetchTools } from "@/lib/api-client-tools"
import { Tool } from "@/lib/api-client-tools"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { ArrowLeft, Plus, Trash, Loader2, Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Client component that handles the actual editing
export function EditToolkitContent({ id }: { id: string }) {
  const router = useRouter()
  const { toast } = useToast()
  
  const [loading, setLoading] = useState(true)
  const [loadingTools, setLoadingTools] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [toolkit, setToolkit] = useState<Toolkit | null>(null)
  const [profileName, setProfileName] = useState("")
  const [description, setDescription] = useState("")
  const [operatingSystem, setOperatingSystem] = useState<OperatingSystem>("windows")
  const [toolIds, setToolIds] = useState<string[]>([])
  const [availableTools, setAvailableTools] = useState<Tool[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  
  // Fetch the toolkit data and available tools on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setLoadingTools(true)
        
        // Fetch toolkit and available tools in parallel
        const [toolkit, tools] = await Promise.all([
          fetchToolkitById(id),
          fetchTools()
        ])
        
        if (toolkit) {
          setToolkit(toolkit)
          setProfileName(toolkit.profileName)
          setDescription(toolkit.description || "")
          setOperatingSystem(toolkit.operatingSystem || "windows")
          // Use toolIds if available, otherwise derive them from embedded tools
          setToolIds(toolkit.toolIds || (toolkit.tools?.map(tool => tool.id) || []))
          setAvailableTools(tools)
        } else {
          setError("Toolkit not found")
        }
      } catch (err) {
        console.error(err)
        setError("Failed to load toolkit data")
      } finally {
        setLoading(false)
        setLoadingTools(false)
      }
    }
    
    loadData()
  }, [id])
  
  // Filter tools based on search term
  const filteredTools = availableTools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Check if a tool is selected
  const isToolSelected = (id: string) => toolIds.includes(id)

  // Toggle tool selection
  const toggleToolSelection = (id: string) => {
    if (isToolSelected(id)) {
      setToolIds(toolIds.filter(toolId => toolId !== id))
    } else {
      setToolIds([...toolIds, id])
    }
  }
  
  // Format category name for display
  const formatCategory = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!profileName) {
      toast({
        title: "Error",
        description: "Profile name is required",
      })
      return
    }
    
    if (toolIds.length === 0) {
      toast({
        title: "Error",
        description: "At least one tool must be selected",
      })
      return
    }
    
    const updatedToolkit: Toolkit = {
      id,
      profileName,
      description,
      operatingSystem,
      toolIds,
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
            <h1 className="text-2xl font-bold tracking-tight">Edit Toolkit</h1>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <form onSubmit={handleSubmit}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profileName">Profile Name*</Label>
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
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="linux" id="linux" />
                    <Label htmlFor="linux">Linux</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Select Tools</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent>
              {loadingTools ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Loading available tools...</span>
                </div>
              ) : filteredTools.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>
                    {searchTerm 
                      ? `No tools found matching "${searchTerm}"` 
                      : "No tools available. Add tools from the Tools Management page first."}
                  </p>
                  <Link href="/manage/tools" className="inline-block mt-2">
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Tools
                    </Button>
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">Select</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTools.map((tool) => (
                          <TableRow key={tool.id} className={isToolSelected(tool.id) ? "bg-muted/20" : ""}>
                            <TableCell>
                              <Checkbox 
                                checked={isToolSelected(tool.id)} 
                                onCheckedChange={() => toggleToolSelection(tool.id)}
                                id={`tool-${tool.id}`}
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {tool.icon ? (
                                  <img 
                                    src={tool.icon} 
                                    alt={`${tool.name} logo`} 
                                    className="w-6 h-6 object-contain"
                                  />
                                ) : (
                                  <div className="w-6 h-6 bg-muted rounded-sm flex items-center justify-center text-xs">
                                    {tool.name.charAt(0)}
                                  </div>
                                )}
                                <label 
                                  htmlFor={`tool-${tool.id}`} 
                                  className="cursor-pointer"
                                >
                                  {tool.name}
                                </label>
                              </div>
                            </TableCell>
                            <TableCell>{formatCategory(tool.category)}</TableCell>
                            <TableCell className="max-w-[300px] truncate">{tool.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium">Selected: {toolIds.length} tools</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/toolkits')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting || toolIds.length === 0}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Update Toolkit"
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
} 
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Pencil, Trash2, MoreVertical, Search, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { fetchTools, createTool, updateTool, deleteTool, ToolDetails } from "@/lib/api-client-tools"
import { ToolkitCategory } from "@/types"

interface ToolFormData {
  name: string;
  description: string;
  category: string;
  isRequired: boolean;
  downloadUrl: string;
  installationNotes: string;
  alternatives: string | string[];
  icon: string;
}

export default function ManageTools() {
  const [tools, setTools] = useState<ToolDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentTool, setCurrentTool] = useState<ToolDetails | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newTool, setNewTool] = useState<ToolFormData>({
    name: "",
    description: "",
    category: "development",
    isRequired: false,
    downloadUrl: "",
    installationNotes: "",
    alternatives: [],
    icon: "",
  })

  const { toast } = useToast()

  // Fetch tools data
  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await fetchTools()
      setTools(data)
      setError(null)
    } catch (err) {
      console.error("Error fetching tools:", err)
      setError("Failed to load tools. Please try again later.")
      toast({
        title: "Error",
        description: "Failed to load tools. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddTool = async () => {
    try {
      setIsSubmitting(true)

      // Validate required fields
      if (!newTool.name || !newTool.description || !newTool.category) {
        toast({
          title: "Validation Error",
          description: "Name, description, and category are required fields.",
          variant: "destructive",
        })
        return
      }

      // Convert alternatives string to array if needed
      let processedAlternatives: string[] = [];
      if (typeof newTool.alternatives === 'string') {
        processedAlternatives = (newTool.alternatives as string)
          .split(',')
          .map(alt => alt.trim())
          .filter(Boolean);
      } else if (Array.isArray(newTool.alternatives)) {
        processedAlternatives = newTool.alternatives;
      }

      // Prepare new tool data
      const toolData = {
        name: newTool.name,
        description: newTool.description,
        category: newTool.category as ToolkitCategory,
        downloadUrl: newTool.downloadUrl || undefined,
        installationNotes: newTool.installationNotes || undefined,
        isRequired: newTool.isRequired,
        alternatives: processedAlternatives,
        icon: newTool.icon || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        usageCount: 0,
        popularity: 5.0
      };

      await createTool(toolData)

      // Refresh the tool list
      await fetchData()

      setIsAddDialogOpen(false)
      setNewTool({
        name: "",
        description: "",
        category: "development",
        isRequired: false,
        downloadUrl: "",
        installationNotes: "",
        alternatives: [],
        icon: "",
      })

      toast({
        title: "Tool Added",
        description: `${toolData.name} has been added to the database.`,
      })
    } catch (err) {
      console.error("Error adding tool:", err)
      toast({
        title: "Error",
        description: "Failed to add tool. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditTool = async () => {
    if (!currentTool) return

    try {
      setIsSubmitting(true)

      // Convert alternatives string to array if needed
      let processedAlternatives: string[] = [];
      if (typeof currentTool.alternatives === 'string') {
        processedAlternatives = (currentTool.alternatives as string)
          .split(',')
          .map(alt => alt.trim())
          .filter(Boolean);
      } else if (Array.isArray(currentTool.alternatives)) {
        processedAlternatives = currentTool.alternatives;
      }
      
      // Prepare updated tool
      const updatedTool = {
        ...currentTool,
        alternatives: processedAlternatives,
        icon: currentTool.icon || undefined,
      } as ToolDetails;

      await updateTool(updatedTool.id, updatedTool)

      // Refresh the tool list
      await fetchData()

      setIsEditDialogOpen(false)
      setCurrentTool(null)

      toast({
        title: "Tool Updated",
        description: `${currentTool.name} has been updated.`,
      })
    } catch (err) {
      console.error("Error updating tool:", err)
      toast({
        title: "Error",
        description: "Failed to update tool. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteTool = async () => {
    if (!currentTool) return

    try {
      setIsSubmitting(true)

      await deleteTool(currentTool.id)

      // Refresh the tool list
      await fetchData()

      setIsDeleteDialogOpen(false)

      toast({
        title: "Tool Deleted",
        description: `${currentTool.name} has been removed.`,
      })

      setCurrentTool(null)
    } catch (err) {
      console.error("Error deleting tool:", err)
      toast({
        title: "Error",
        description: "Failed to delete tool. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format category name for display
  const formatCategory = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/manage">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to manage</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Manage Tools</h1>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Tool
          </Button>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tools Database</CardTitle>
            <CardDescription>Manage software tools for different toolkits</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading tools...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-destructive">
                <p>{error}</p>
                <Button variant="outline" className="mt-4" onClick={fetchData}>
                  Try Again
                </Button>
              </div>
            ) : filteredTools.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? (
                  <p>No tools found matching "{searchTerm}"</p>
                ) : (
                  <p>No tools in the database yet. Add your first tool!</p>
                )}
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead>Download URL</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTools.map((tool) => (
                      <TableRow key={tool.id}>
                        <TableCell>
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
                            <span className="font-medium">{tool.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatCategory(tool.category)}</TableCell>
                        <TableCell>{tool.isRequired ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          {tool.downloadUrl ? (
                            <a 
                              href={tool.downloadUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline truncate block"
                            >
                              {new URL(tool.downloadUrl).hostname}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentTool(tool as any)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentTool(tool as any)
                                  setIsDeleteDialogOpen(true)
                                }}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Add Tool Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Tool</DialogTitle>
            <DialogDescription>
              Add a new software tool to the database. This tool can be added to any toolkit.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name*</Label>
              <Input
                id="name"
                value={newTool.name}
                onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                placeholder="e.g., Visual Studio Code"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                value={newTool.description}
                onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                placeholder="Brief description of the tool"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category*</Label>
              <Select
                value={newTool.category}
                onValueChange={(value) => setNewTool({ ...newTool, category: value as ToolkitCategory })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="connectivity">Connectivity</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="specialized">Specialized</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                  <SelectItem value="project_management">Project Management</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="downloadUrl">Download URL</Label>
              <Input
                id="downloadUrl"
                value={newTool.downloadUrl}
                onChange={(e) => setNewTool({ ...newTool, downloadUrl: e.target.value })}
                placeholder="https://example.com/download"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="icon">Icon URL</Label>
              <Input
                id="icon"
                value={newTool.icon}
                onChange={(e) => setNewTool({ ...newTool, icon: e.target.value })}
                placeholder="https://example.com/icon.png"
              />
              <p className="text-xs text-muted-foreground">URL to the tool's logo/icon</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="installationNotes">Installation Notes</Label>
              <Textarea
                id="installationNotes"
                value={newTool.installationNotes}
                onChange={(e) => setNewTool({ ...newTool, installationNotes: e.target.value })}
                placeholder="Notes about installation or configuration"
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="alternatives">Alternatives</Label>
              <Input
                id="alternatives"
                value={Array.isArray(newTool.alternatives) ? newTool.alternatives.join(', ') : newTool.alternatives || ''}
                onChange={(e) => setNewTool({ ...newTool, alternatives: e.target.value })}
                placeholder="Comma-separated list of alternatives"
              />
              <p className="text-xs text-muted-foreground">Separate alternatives with commas</p>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="isRequired" className="cursor-pointer">Required by default</Label>
              <Switch
                id="isRequired"
                checked={newTool.isRequired}
                onCheckedChange={(checked) => setNewTool({ ...newTool, isRequired: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTool} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Tool"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Tool Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Tool</DialogTitle>
            <DialogDescription>
              Make changes to the selected tool.
            </DialogDescription>
          </DialogHeader>

          {currentTool && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name*</Label>
                <Input
                  id="edit-name"
                  value={currentTool.name}
                  onChange={(e) => setCurrentTool({ ...currentTool, name: e.target.value } as any)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description*</Label>
                <Textarea
                  id="edit-description"
                  value={currentTool.description}
                  onChange={(e) => setCurrentTool({ ...currentTool, description: e.target.value } as any)}
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category*</Label>
                <Select
                  value={currentTool.category}
                  onValueChange={(value) => setCurrentTool({ ...currentTool, category: value as ToolkitCategory } as any)}
                >
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="connectivity">Connectivity</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="specialized">Specialized</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="testing">Testing</SelectItem>
                    <SelectItem value="project_management">Project Management</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="productivity">Productivity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-downloadUrl">Download URL</Label>
                <Input
                  id="edit-downloadUrl"
                  value={currentTool.downloadUrl}
                  onChange={(e) => setCurrentTool({ ...currentTool, downloadUrl: e.target.value } as any)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-icon">Icon URL</Label>
                <Input
                  id="edit-icon"
                  value={currentTool.icon}
                  onChange={(e) => setCurrentTool({ ...currentTool, icon: e.target.value } as any)}
                  placeholder="https://example.com/icon.png"
                />
                <p className="text-xs text-muted-foreground">URL to the tool's logo/icon</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-installationNotes">Installation Notes</Label>
                <Textarea
                  id="edit-installationNotes"
                  value={currentTool.installationNotes}
                  onChange={(e) => setCurrentTool({ ...currentTool, installationNotes: e.target.value } as any)}
                  rows={2}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-alternatives">Alternatives</Label>
                <Input
                  id="edit-alternatives"
                  value={Array.isArray(currentTool.alternatives) ? currentTool.alternatives.join(', ') : currentTool.alternatives || ''}
                  onChange={(e) => setCurrentTool({ ...currentTool, alternatives: e.target.value } as any)}
                />
                <p className="text-xs text-muted-foreground">Separate alternatives with commas</p>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="edit-isRequired" className="cursor-pointer">Required by default</Label>
                <Switch
                  id="edit-isRequired"
                  checked={currentTool.isRequired}
                  onCheckedChange={(checked) => setCurrentTool({ ...currentTool, isRequired: checked } as any)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTool} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Tool Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Delete Tool</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this tool? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {currentTool && (
            <div className="py-4">
              <p>
                You are about to delete <strong>{currentTool.name}</strong>.
              </p>
              <p className="mt-2 text-amber-500">
                Warning: This may impact any toolkits that use this tool.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTool} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Tool"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
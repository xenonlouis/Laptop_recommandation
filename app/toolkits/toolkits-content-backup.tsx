"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { fetchToolkits } from "@/lib/api-client"
import { Toolkit, ToolkitItem, OperatingSystem } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Download, Info, Code, Database, Monitor, MessageSquare, Briefcase, PenTool, FileText } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { ToolkitUsageChart } from "./components/toolkit-usage-chart"
import { CategoryDistributionChart } from "./components/category-distribution-chart"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BarChart } from "lucide-react"

export function ToolkitsContent() {
  const [toolkits, setToolkits] = useState<Toolkit[]>([])
  const [filteredToolkits, setFilteredToolkits] = useState<Toolkit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedOperatingSystem, setSelectedOperatingSystem] = useState<OperatingSystem>("windows")
  const [uniqueProfiles, setUniqueProfiles] = useState<string[]>([])

  const searchParams = useSearchParams()
  const profileParam = searchParams.get('profile')

  useEffect(() => {
    const getToolkits = async () => {
      try {
        setLoading(true)
        const data = await fetchToolkits()
        setToolkits(data)
        
        // Extract unique profile names
        const profiles = Array.from(new Set(data.map(toolkit => toolkit.profileName)))
        setUniqueProfiles(profiles)
        
        setError(null)
      } catch (err) {
        console.error("Error fetching toolkits:", err)
        setError("Failed to load toolkits. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    getToolkits()
  }, [])

  // Filter toolkits based on OS and profile
  useEffect(() => {
    if (toolkits.length === 0) return

    let filtered = toolkits
    
    // Filter by OS
    filtered = filtered.filter(toolkit => toolkit.operatingSystem === selectedOperatingSystem)
    
    // Filter by profile if specified in URL
    if (profileParam) {
      filtered = filtered.filter(toolkit => 
        toolkit.profileName.toLowerCase() === profileParam.toLowerCase()
      )
    }
    
    setFilteredToolkits(filtered)
  }, [toolkits, selectedOperatingSystem, profileParam])

  // Group tools by category for a better display
  const groupToolsByCategory = (tools: ToolkitItem[]) => {
    const grouped: Record<string, ToolkitItem[]> = {}
    
    tools.forEach(tool => {
      if (!grouped[tool.category]) {
        grouped[tool.category] = []
      }
      grouped[tool.category].push(tool)
    })
    
    return grouped
  }

  // Format category name for display
  const formatCategory = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  // Render category icon based on category name
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'development':
        return <Code className="h-4 w-4" />
      case 'specialized':
        return <Info className="h-4 w-4" />
      case 'connectivity':
        return <Monitor className="h-4 w-4" />
      case 'communication': 
        return <MessageSquare className="h-4 w-4" />
      case 'database':
        return <Database className="h-4 w-4" />
      case 'project_management':
        return <Briefcase className="h-4 w-4" />
      case 'design':
        return <PenTool className="h-4 w-4" />
      case 'productivity':
        return <FileText className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div>
        <p>Loading toolkits...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      {/* OS Tabs */}
      <div className="mb-8">
        <Tabs 
          defaultValue="windows" 
          value={selectedOperatingSystem}
          onValueChange={(value) => setSelectedOperatingSystem(value as OperatingSystem)}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-card">
            <TabsTrigger value="windows" className="data-[state=active]:bg-muted">Windows</TabsTrigger>
            <TabsTrigger value="macos" className="data-[state=active]:bg-muted">macOS</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredToolkits.length === 0 ? (
        <Alert>
          <AlertTitle>No toolkits found</AlertTitle>
          <AlertDescription>
            No toolkits available for the selected operating system{profileParam ? ` and profile "${profileParam}"` : ''}. 
            Try selecting a different operating system or profile.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {filteredToolkits.map(toolkit => {
            const toolsByCategory = groupToolsByCategory(toolkit.tools)
            
            // Find the dominant category for this toolkit
            const categoryCounts: Record<string, number> = {};
            toolkit.tools.forEach(tool => {
              categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
            });
            
            const dominantCategory = Object.entries(categoryCounts)
              .sort((a, b) => b[1] - a[1])
              .map(entry => entry[0])[0] || 'development';
              
            return (
              <Card 
                key={toolkit.id} 
                className="overflow-hidden border bg-card"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{toolkit.profileName}</CardTitle>
                      <CardDescription>{toolkit.description}</CardDescription>
                    </div>
                    <Link href={`/toolkits/edit/${toolkit.id}`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="mb-4 flex gap-2 flex-wrap">
                    <Badge variant="outline">{toolkit.operatingSystem}</Badge>
                    <Badge variant="outline">{toolkit.tools.length} tools</Badge>
                  </div>
                  
                  {/* Statistics Dialog button */}
                  <div className="mb-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <BarChart className="h-4 w-4" />
                          Toolkit Statistics
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[700px] p-0 gap-0">
                        <DialogHeader className="px-6 pt-6 pb-2">
                          <DialogTitle>{toolkit.profileName} Statistics</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 pt-2">
                          <CategoryDistributionChart toolkit={toolkit} />
                          <ToolkitUsageChart toolkit={toolkit} />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Categories with tool cards */}
                  {Object.entries(toolsByCategory).map(([category, tools]) => (
                    <div key={category} className="mb-6">
                      {/* Category heading */}
                      <div className="flex items-center gap-2 mb-3">
                        {getCategoryIcon(category)}
                        <h3 className="font-medium">{formatCategory(category)}</h3>
                        <Badge variant="secondary">{tools.length}</Badge>
                      </div>
                      
                      {/* Tool cards grid */}
                      <div className="grid grid-cols-1 gap-3">
                        {tools.map(tool => (
                          <div key={tool.id} className="border rounded-lg bg-card/50 p-4 hover:bg-muted/30 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium flex items-center">
                                {tool.name}
                                {tool.isRequired && (
                                  <Badge className="ml-2" variant="outline">Required</Badge>
                                )}
                              </h4>
                              {tool.downloadUrl && (
                                <a href={tool.downloadUrl} target="_blank" rel="noopener noreferrer">
                                  <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </Button>
                                </a>
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                            
                            <div className="space-y-2 text-sm">
                              {tool.installationNotes && (
                                <div className="pt-2 border-t border-border">
                                  <p className="font-medium">Installation:</p>
                                  <p className="text-muted-foreground">{tool.installationNotes}</p>
                                </div>
                              )}
                              
                              {tool.alternatives && tool.alternatives.length > 0 && (
                                <div className="pt-2 border-t border-border">
                                  <p className="font-medium">Alternatives:</p>
                                  <p className="text-muted-foreground">{tool.alternatives.join(', ')}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </>
  )
} 
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
import { Package, Download, Info } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
        return <Package className="h-4 w-4" />
      case 'specialized':
        return <Info className="h-4 w-4" />
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
      <Tabs 
        defaultValue="windows" 
        value={selectedOperatingSystem}
        onValueChange={(value) => setSelectedOperatingSystem(value as OperatingSystem)}
        className="mb-8"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="windows">Windows</TabsTrigger>
          <TabsTrigger value="macos">macOS</TabsTrigger>
        </TabsList>
      </Tabs>

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
            
            return (
              <Card key={toolkit.id} className="overflow-hidden">
                <CardHeader className="bg-muted/30">
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
                  <div className="mb-4">
                    <Badge variant="outline">{toolkit.operatingSystem}</Badge>
                    <Badge variant="outline" className="ml-2">{toolkit.tools.length} tools</Badge>
                  </div>
                  
                  <Accordion type="multiple" className="w-full">
                    {Object.entries(toolsByCategory).map(([category, tools]) => (
                      <AccordionItem key={category} value={category}>
                        <AccordionTrigger className="py-2">
                          <div className="flex items-center">
                            {getCategoryIcon(category)}
                            <span className="ml-2">{formatCategory(category)}</span>
                            <Badge variant="outline" className="ml-2">{tools.length}</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            {tools.map(tool => (
                              <div key={tool.id} className="border rounded-md p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-medium flex items-center">
                                    {tool.name}
                                    {tool.isRequired && (
                                      <Badge className="ml-2" variant="secondary">Required</Badge>
                                    )}
                                  </h3>
                                  {tool.downloadUrl && (
                                    <a href={tool.downloadUrl} target="_blank" rel="noopener noreferrer">
                                      <Button variant="outline" size="sm">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                      </Button>
                                    </a>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                                {tool.installationNotes && (
                                  <div className="text-sm mt-2 border-t pt-2">
                                    <p className="font-medium">Installation:</p>
                                    <p className="text-muted-foreground">{tool.installationNotes}</p>
                                  </div>
                                )}
                                {tool.alternatives && tool.alternatives.length > 0 && (
                                  <div className="text-sm mt-2 border-t pt-2">
                                    <p className="font-medium">Alternatives:</p>
                                    <p className="text-muted-foreground">{tool.alternatives.join(', ')}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </>
  )
} 
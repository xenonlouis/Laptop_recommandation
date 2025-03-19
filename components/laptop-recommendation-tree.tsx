"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import type { Laptop, RecommendationNode, UserProfile, SortingCriteria, OperatingSystem } from "@/types"
import { LaptopCard } from "@/components/laptop-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { fetchLaptops } from "@/lib/api-client"

export function LaptopRecommendationTree() {
  const searchParams = useSearchParams()
  const profile = searchParams.get("profile") as UserProfile | null
  const criteria = searchParams.get("criteria") as SortingCriteria | null
  const os = searchParams.get("os") as OperatingSystem | null

  // State for laptops data
  const [laptops, setLaptops] = useState<Laptop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize with all nodes expanded
  const [expandedNodes, setExpandedNodes] = useState<string[]>(["root"])

  // Fetch laptops data
  useEffect(() => {
    const getLaptops = async () => {
      try {
        setLoading(true)
        const data = await fetchLaptops()
        setLaptops(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching laptops:", err)
        setError("Failed to load laptops. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    getLaptops()
  }, [])

  // Auto-expand all nodes when profile or criteria changes
  useEffect(() => {
    if (profile && criteria) {
      // Expand all nodes by default
      setExpandedNodes(["root", "windows", "macos", "linux"])
    }
  }, [profile, criteria])

  if (loading) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Loading laptop recommendations...</AlertDescription>
      </Alert>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!profile || !criteria) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Please select a user profile and sorting criteria to view recommendations.</AlertDescription>
      </Alert>
    )
  }

  // Filter laptops based on profile
  let filteredLaptops = laptops.filter((laptop) => laptop.supportedProfiles.includes(profile))

  // Further filter by OS if selected
  if (os) {
    filteredLaptops = filteredLaptops.filter((laptop) => laptop.supportedOS.includes(os))
  }

  // Sort laptops based on criteria
  filteredLaptops.sort((a, b) => {
    if (criteria === "price") {
      return a.price - b.price
    } else if (criteria === "performance") {
      return b.performanceScore - a.performanceScore
    } else {
      return b.batteryLife - a.batteryLife
    }
  })

  // Group laptops by OS for the decision tree
  const osGroups: Record<OperatingSystem, Laptop[]> = {
    windows: filteredLaptops.filter((l) => l.supportedOS.includes("windows")),
    macos: filteredLaptops.filter((l) => l.supportedOS.includes("macos")),
    linux: filteredLaptops.filter((l) => l.supportedOS.includes("linux")),
  }

  // Build the recommendation tree
  const tree: RecommendationNode = {
    id: "root",
    label: `${profile.charAt(0).toUpperCase() + profile.slice(1)} Recommendations`,
    children: Object.entries(osGroups)
      .filter(([_, laptops]) => laptops.length > 0)
      .map(([osName, laptops]) => ({
        id: osName,
        label: osName === "macos" ? "macOS" : osName.charAt(0).toUpperCase() + osName.slice(1),
        laptops: laptops.slice(0, 3), // Show top 3 laptops per OS
      })),
  }

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => (prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]))
  }

  const renderNode = (node: RecommendationNode, level = 0) => {
    const isExpanded = expandedNodes.includes(node.id)
    const hasChildren = node.children && node.children.length > 0
    const hasLaptops = node.laptops && node.laptops.length > 0

    const profileColors: Record<UserProfile, string> = {
      consultant: "bg-primary/10 dark:bg-primary/20 border-primary/20 dark:border-primary/30",
      webDeveloper: "bg-primary/10 dark:bg-primary/20 border-primary/20 dark:border-primary/30",
      intensiveDeployment: "bg-primary/10 dark:bg-primary/20 border-primary/20 dark:border-primary/30",
    }

    const colorClass = level === 0 ? profileColors[profile] : ""

    return (
      <div key={node.id} className={`mb-8 ${level > 0 ? "ml-6" : ""}`}>
        <Card className={`${colorClass} border-2`}>
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              <span>{node.label}</span>
              {hasChildren && (
                <button
                  onClick={() => toggleNode(node.id)}
                  className="text-sm bg-primary/10 hover:bg-primary/20 rounded-full w-6 h-6 flex items-center justify-center"
                >
                  {isExpanded ? "-" : "+"}
                </button>
              )}
            </CardTitle>
          </CardHeader>
          {hasLaptops && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {node.laptops.map((laptop) => (
                  <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
              </div>
            </CardContent>
          )}
        </Card>

        {hasChildren && isExpanded && (
          <div className="mt-6">{node.children!.map((child) => renderNode(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {renderNode(tree)}

      {filteredLaptops.length === 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>No laptops found matching your criteria. Try adjusting your filters.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}


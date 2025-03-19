"use client"

import { Suspense } from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import type { Laptop, RecommendationNode, UserProfile, SortingCriteria, OperatingSystem } from "@/types"
import { LaptopCard } from "@/components/laptop-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { fetchLaptops } from "@/lib/api-client"
import { Skeleton } from "@/components/ui/skeleton"

function LaptopRecommendationTreeContent() {
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

  // Filter laptops based on selected criteria
  const filteredLaptops = laptops.filter((laptop) => {
    // Filter by profile
    if (!laptop.supportedProfiles.includes(profile)) {
      return false
    }

    // Filter by OS if specified
    if (os && !laptop.supportedOS.includes(os)) {
      return false
    }

    return true
  })

  // Sort laptops based on selected criteria
  const sortedLaptops = [...filteredLaptops].sort((a, b) => {
    switch (criteria) {
      case "price":
        return a.price - b.price
      case "performance":
        return b.performanceScore - a.performanceScore
      case "battery":
        return b.batteryLife - a.batteryLife
      default:
        return 0
    }
  })

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended Laptops</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedLaptops.map((laptop) => (
            <LaptopCard key={laptop.id} laptop={laptop} />
          ))}
        </div>
      </div>
    </div>
  )
}

function LaptopRecommendationTreeSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function LaptopRecommendationTree() {
  return (
    <Suspense fallback={<LaptopRecommendationTreeSkeleton />}>
      <LaptopRecommendationTreeContent />
    </Suspense>
  )
}


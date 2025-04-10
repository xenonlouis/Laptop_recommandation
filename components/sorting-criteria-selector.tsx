"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import type { SortingCriteria, SortingDirection, OperatingSystem } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react"

function SortingCriteriaSelectorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCriteria = searchParams.get("criteria") as SortingCriteria | null
  const currentDirection = searchParams.get("direction") as SortingDirection || "asc"
  const currentOS = searchParams.get("os") as OperatingSystem | null
  const currentProfile = searchParams.get("profile")

  const handleCriteriaChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("criteria", value)
    router.push(`?${params.toString()}`)
  }

  const handleDirectionChange = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("direction", currentDirection === "asc" ? "desc" : "asc")
    router.push(`?${params.toString()}`)
  }

  const handleOSChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete("os")
    } else {
      params.set("os", value)
    }
    router.push(`?${params.toString()}`)
  }

  // Determine which OS options to show based on the selected profile
  const getOSOptions = () => {
    switch (currentProfile) {
      case "consultant":
        return [
          { value: "windows", label: "Windows" },
          { value: "macos", label: "macOS" },
        ]
      case "developer":
        return [
          { value: "windows", label: "Windows" },
          { value: "macos", label: "macOS" },
          { value: "linux", label: "Linux" },
        ]
      default:
        return [
          { value: "windows", label: "Windows" },
          { value: "macos", label: "macOS" },
          { value: "linux", label: "Linux" },
        ]
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sorting Criteria</CardTitle>
        <CardDescription>Choose how to sort and filter the laptop recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Sort By</Label>
            {currentCriteria && (
              <Button
                variant="outline" 
                size="sm" 
                onClick={handleDirectionChange}
                className="flex items-center gap-1"
              >
                {currentDirection === "asc" ? (
                  <>
                    <ArrowUpAZ className="h-4 w-4" />
                    <span className="text-xs">Ascending</span>
                  </>
                ) : (
                  <>
                    <ArrowDownAZ className="h-4 w-4" />
                    <span className="text-xs">Descending</span>
                  </>
                )}
              </Button>
            )}
          </div>
          <RadioGroup value={currentCriteria || ""} onValueChange={handleCriteriaChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price" id="price" />
              <Label htmlFor="price">Price</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="performance" id="performance" />
              <Label htmlFor="performance">Performance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="batteryLife" id="battery" />
              <Label htmlFor="battery">Battery Life</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>Operating System</Label>
          <Tabs value={currentOS || "all"} onValueChange={handleOSChange}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              {getOSOptions().map((os) => (
                <TabsTrigger key={os.value} value={os.value}>
                  {os.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

function SortingCriteriaSelectorSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-16" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

export function SortingCriteriaSelector() {
  return (
    <Suspense fallback={<SortingCriteriaSelectorSkeleton />}>
      <SortingCriteriaSelectorContent />
    </Suspense>
  )
}


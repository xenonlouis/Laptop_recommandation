"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SortingCriteria, OperatingSystem } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"

function SortingCriteriaSelectorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCriteria = searchParams.get("criteria") as SortingCriteria | null
  const currentOS = searchParams.get("os") as OperatingSystem | null
  const currentProfile = searchParams.get("profile")

  const handleCriteriaChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("criteria", value)
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
      case "webDeveloper":
        return [
          { value: "windows", label: "Windows" },
          { value: "macos", label: "macOS" },
          { value: "linux", label: "Linux" },
        ]
      case "intensiveDeployment":
        return [
          { value: "windows", label: "Windows" },
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
          <Label>Sort By</Label>
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
              <RadioGroupItem value="battery" id="battery" />
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


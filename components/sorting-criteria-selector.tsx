"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SortingCriteria, OperatingSystem } from "@/types"

export function SortingCriteriaSelector() {
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
        <CardTitle>Sorting & Filtering</CardTitle>
        <CardDescription>Choose how you want to sort and filter laptop recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Sort By:</h3>
          <RadioGroup value={currentCriteria || undefined} onValueChange={handleCriteriaChange} className="space-y-4">
            <div className="flex items-start space-x-3 space-y-0">
              <RadioGroupItem value="price" id="price" />
              <div className="grid gap-1.5">
                <Label htmlFor="price" className="font-medium">
                  Price
                </Label>
                <p className="text-sm text-muted-foreground">Budget-friendly options first</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 space-y-0">
              <RadioGroupItem value="performance" id="performance" />
              <div className="grid gap-1.5">
                <Label htmlFor="performance" className="font-medium">
                  Performance
                </Label>
                <p className="text-sm text-muted-foreground">High-end specs and capabilities first</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 space-y-0">
              <RadioGroupItem value="batteryLife" id="batteryLife" />
              <div className="grid gap-1.5">
                <Label htmlFor="batteryLife" className="font-medium">
                  Battery Life
                </Label>
                <p className="text-sm text-muted-foreground">Long-lasting battery options first</p>
              </div>
            </div>
          </RadioGroup>
        </div>

        {currentProfile && (
          <div>
            <h3 className="text-sm font-medium mb-3">Operating System:</h3>
            <Tabs value={currentOS || "all"} onValueChange={handleOSChange} className="w-full">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                {getOSOptions().map((option) => (
                  <TabsTrigger key={option.value} value={option.value}>
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


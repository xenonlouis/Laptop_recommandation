"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { UserProfile } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"

function UserProfileSelectorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentProfile = searchParams.get("profile") as UserProfile | null

  const handleProfileChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("profile", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Select your user profile to get tailored recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={currentProfile || ""} onValueChange={handleProfileChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="consultant" id="consultant" />
            <Label htmlFor="consultant">Consultant</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="webDeveloper" id="webDeveloper" />
            <Label htmlFor="webDeveloper">Web Developer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="intensiveDeployment" id="intensiveDeployment" />
            <Label htmlFor="intensiveDeployment">Intensive Deployment</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

function UserProfileSelectorSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function UserProfileSelector() {
  return (
    <Suspense fallback={<UserProfileSelectorSkeleton />}>
      <UserProfileSelectorContent />
    </Suspense>
  )
}


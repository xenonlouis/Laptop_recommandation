"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { UserProfile } from "@/types"

export function UserProfileSelector() {
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
        <RadioGroup value={currentProfile || undefined} onValueChange={handleProfileChange} className="space-y-4">
          <div className="flex items-start space-x-3 space-y-0">
            <RadioGroupItem value="consultant" id="consultant" />
            <div className="grid gap-1.5">
              <Label htmlFor="consultant" className="font-medium">
                Consultant
              </Label>
              <p className="text-sm text-muted-foreground">Business-focused laptops with Windows or macOS support</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 space-y-0">
            <RadioGroupItem value="webDeveloper" id="webDeveloper" />
            <div className="grid gap-1.5">
              <Label htmlFor="webDeveloper" className="font-medium">
                Web Developer
              </Label>
              <p className="text-sm text-muted-foreground">
                Development-optimized laptops with Windows, macOS, or Linux support
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 space-y-0">
            <RadioGroupItem value="intensiveDeployment" id="intensiveDeployment" />
            <div className="grid gap-1.5">
              <Label htmlFor="intensiveDeployment" className="font-medium">
                Intensive Deployment
              </Label>
              <p className="text-sm text-muted-foreground">High-performance laptops with Windows or Linux support</p>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}


"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SurveyContent } from "./survey-content";

export default function SurveyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to home</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Laptop Recommendation Questionnaire</h1>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Help Us Find Your Perfect Setup</CardTitle>
            <CardDescription>
              Answer a few questions to help us determine the best laptop and toolkit configuration for your needs.
              This will take approximately 5 minutes to complete.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SurveyContent />
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 
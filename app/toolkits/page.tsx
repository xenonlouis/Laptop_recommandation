import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import { ToolkitsContent } from "./toolkits-content"

export default function ToolkitsPage() {
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
            <h1 className="text-2xl font-bold tracking-tight">Consultant Toolkits</h1>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Toolkit Management</h2>
            <p className="text-muted-foreground">
              Manage software toolkits for different profiles and operating systems.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/toolkits/add">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Toolkit
              </Button>
            </Link>
            <Link href="/manage/tools">
              <Button variant="outline">
                Manage Tools
              </Button>
            </Link>
          </div>
        </div>

        <Suspense fallback={<div>Loading toolkits...</div>}>
          <ToolkitsContent />
        </Suspense>
      </main>
    </div>
  )
} 
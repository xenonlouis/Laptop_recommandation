import { Suspense } from "react"
import Link from "next/link"
import { LaptopRecommendationTree } from "@/components/laptop-recommendation-tree"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { UserProfileSelector } from "@/components/user-profile-selector"
import { SortingCriteriaSelector } from "@/components/sorting-criteria-selector"
import { CompareProvider } from "@/hooks/use-compare"
import { LaptopComparison } from "@/components/laptop-comparison"

export default function Home() {
  return (
    <CompareProvider>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between py-4">
            <h1 className="text-2xl font-bold tracking-tight">Laptop Finder</h1>
            <div className="flex items-center gap-4">
              <Link href="/survey">
                <Button variant="default">Take Questionnaire</Button>
              </Link>
              <Link href="/packages">
                <Button variant="outline">Packages</Button>
              </Link>
              <Link href="/people">
                <Button variant="outline">People</Button>
              </Link>
              <Link href="/manage">
                <Button variant="outline">Manage Laptops</Button>
              </Link>
              <Link href="/toolkits">
                <Button variant="outline">Toolkits</Button>
              </Link>
              <Link href="/notion">
                <Button variant="outline">Notion Sync</Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="container py-8 space-y-8">
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Find Your Perfect Laptop</h2>
            <p className="text-muted-foreground">
              Select your user profile and sorting criteria to get personalized laptop recommendations.
            </p>
          </section>

          <div className="grid gap-8 md:grid-cols-2">
            <UserProfileSelector />
            <SortingCriteriaSelector />
          </div>

          <Suspense fallback={<ComparisonSkeleton />}>
            <LaptopComparison />
          </Suspense>

          <Tabs defaultValue="tree" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="tree">Decision Tree</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <TabsContent value="tree" className="pt-6">
              <Suspense fallback={<TreeSkeleton />}>
                <LaptopRecommendationTree />
              </Suspense>
            </TabsContent>
            <TabsContent value="list" className="pt-6">
              <Suspense fallback={<ListSkeleton />}>
                <LaptopList />
              </Suspense>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </CompareProvider>
  )
}

function ThemeToggle() {
  return (
    <Button variant="outline" size="icon" className="h-9 w-9">
      <span className="sr-only">Toggle theme</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 dark:hidden"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 hidden dark:block"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        />
      </svg>
    </Button>
  )
}

function TreeSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

function ListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-lg" />
      ))}
    </div>
  )
}

function ComparisonSkeleton() {
  return <Skeleton className="h-64 w-full rounded-lg" />
}

function LaptopList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* This component will be implemented separately */}
      <p className="col-span-full text-muted-foreground">
        Select a user profile and sorting criteria to view recommendations
      </p>
    </div>
  )
}


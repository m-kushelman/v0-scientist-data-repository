"use client"

import Link from "next/link"
import { TestTube, Users, Database, Search, TrendingUp, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function HomePage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<{
    firstName: string
    lastName: string
  } | null>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [advancedFilters, setAdvancedFilters] = useState({
    organisms: "",
    methods: "",
    publicationDate: "",
    author: "",
    institution: "",
    keywords: "",
  })

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      const user = JSON.parse(userData)
      if (user.isLoggedIn) {
        setCurrentUser(user)
      }
    }
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.append("q", searchQuery)
    router.push(`/browse?${params.toString()}`)
  }

  const handleAdvancedSearch = () => {
    const params = new URLSearchParams()
    if (advancedFilters.organisms) params.append("organism", advancedFilters.organisms)
    if (advancedFilters.methods) params.append("method", advancedFilters.methods)
    if (advancedFilters.publicationDate) params.append("date", advancedFilters.publicationDate)
    if (advancedFilters.author) params.append("author", advancedFilters.author)
    if (advancedFilters.institution) params.append("institution", advancedFilters.institution)
    if (advancedFilters.keywords) params.append("keywords", advancedFilters.keywords)
    if (searchQuery) params.append("q", searchQuery)
    router.push(`/browse?${params.toString()}`)
  }

  const featuredDatasets = [
    {
      id: 1,
      title: "Failed CRISPR Knockout of daf-2 in C. elegans Shows No Lifespan Extension",
      author: "Dr. Sarah Johnson, Stanford University",
      description:
        "Despite successful CRISPR-mediated knockout of daf-2 confirmed by sequencing, we observed no significant increase in lifespan across three independent replication attempts.",
      organisms: ["Caenorhabditis elegans"],
      methods: ["CRISPR/Cas9", "Genotyping PCR", "Sanger Sequencing", "Lifespan Assay"],
      saves: 12,
      date: "March 2024",
      impact: [
        { type: "Used in publication", count: 3 },
        { type: "Prevented redundant experiment", count: 8 },
      ],
    },
    {
      id: 2,
      title: "Resveratrol Supplementation Shows No Cognitive Benefits in Healthy Adults",
      author: "Dr. Amanda Lee, Johns Hopkins University",
      description:
        "A double-blind, placebo-controlled trial of resveratrol supplementation in 120 healthy adults showed no improvements in cognitive function or brain activity patterns after 6 months.",
      organisms: ["Homo sapiens"],
      methods: ["fMRI", "Cognitive Testing Battery", "ELISA", "LC-MS/MS"],
      saves: 15,
      date: "February 2024",
      impact: [
        { type: "Used in grant application", count: 5 },
        { type: "Prevented redundant experiment", count: 12 },
      ],
    },
    {
      id: 3,
      title: "Metformin Does Not Enhance Exercise Performance in Non-Diabetic Athletes",
      author: "Dr. James Wilson, University of Texas",
      description:
        "Despite confirmed biochemical changes, no improvements in VO2 max or time trial performance were observed across four separate cohorts.",
      organisms: ["Homo sapiens"],
      methods: ["VO2 Max Testing", "Lactate Threshold Analysis", "Metabolomics", "Western Blot"],
      saves: 18,
      date: "January 2024",
      impact: [
        { type: "Used in publication", count: 2 },
        { type: "Used in grant application", count: 4 },
        { type: "Prevented redundant experiment", count: 15 },
      ],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-section-warm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Parallax Database
                </h1>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-spin-orange/10 border border-spin-orange/30 rounded-full text-sm text-spin-orange">
                  <AlertCircle className="h-3 w-3" />
                  <span className="font-medium">Pre-Alpha Version</span>
                </div>
                {currentUser && (
                  <p className="text-lg text-spin-navy font-medium">Welcome back, {currentUser.firstName}!</p>
                )}
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">The missing half of science</p>
              </div>
              <div className="w-full max-w-2xl space-y-2">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Search for null results, methods, organisms..."
                    className="h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch()
                    }}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-12 w-12 bg-spin-navy hover:bg-spin-navy/90"
                    onClick={handleSearch}
                  >
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
                <div>
                  <Button
                    variant="link"
                    className="text-sm flex items-center"
                    onClick={() => document.getElementById("advanced-search")?.classList.toggle("hidden")}
                  >
                    <TestTube className="mr-2 h-4 w-4" />
                    Advanced Search
                  </Button>
                  <div id="advanced-search" className="hidden mt-4 p-4 border rounded-lg bg-white shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="organisms">Organisms (Latin names)</Label>
                        <Input
                          id="organisms"
                          placeholder="e.g., Escherichia coli, Drosophila melanogaster"
                          value={advancedFilters.organisms}
                          onChange={(e) => setAdvancedFilters((prev) => ({ ...prev, organisms: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="methods">Methods (Be specific)</Label>
                        <Input
                          id="methods"
                          placeholder="e.g., fMRI, CRISPR/Cas9, RT-qPCR"
                          value={advancedFilters.methods}
                          onChange={(e) => setAdvancedFilters((prev) => ({ ...prev, methods: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="publication-date">Publication Date</Label>
                        <Select
                          value={advancedFilters.publicationDate}
                          onValueChange={(value) => setAdvancedFilters((prev) => ({ ...prev, publicationDate: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Any time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any time</SelectItem>
                            <SelectItem value="last-week">Last week</SelectItem>
                            <SelectItem value="last-month">Last month</SelectItem>
                            <SelectItem value="last-year">Last year</SelectItem>
                            <SelectItem value="custom">Custom range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="author">Author</Label>
                        <Input
                          id="author"
                          placeholder="Author name"
                          value={advancedFilters.author}
                          onChange={(e) => setAdvancedFilters((prev) => ({ ...prev, author: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution</Label>
                        <Input
                          id="institution"
                          placeholder="e.g., MIT, Stanford University"
                          value={advancedFilters.institution}
                          onChange={(e) => setAdvancedFilters((prev) => ({ ...prev, institution: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="keywords">Keywords</Label>
                        <Input
                          id="keywords"
                          placeholder="Enter keywords separated by commas"
                          value={advancedFilters.keywords}
                          onChange={(e) => setAdvancedFilters((prev) => ({ ...prev, keywords: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button className="bg-spin-navy hover:bg-spin-navy/90" onClick={handleAdvancedSearch}>
                        Search
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A platform designed to capture the crucial negative data that often goes unpublished.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                <Card className="text-center">
                  <CardHeader className="flex flex-col items-center">
                    <Database className="h-12 w-12 text-spin-orange mx-auto mb-4" />
                    <CardTitle>Share Negative Results</CardTitle>
                    <CardDescription>
                      Document null experiments, failed replications, and optimization attempts that didn't work.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Help the scientific community learn from what didn't work, preventing wasted effort and resources.
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader className="flex flex-col items-center">
                    <TestTube className="h-12 w-12 text-spin-coral mx-auto mb-4" />
                    <CardTitle>Search by Methods</CardTitle>
                    <CardDescription>
                      Find data by experimental methods, organisms, and types of negative outcomes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Use powerful filters to discover if others have tried similar approaches and what they learned.
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader className="flex flex-col items-center">
                    <Users className="h-12 w-12 text-spin-orange mx-auto mb-4" />
                    <CardTitle>Learn & Collaborate</CardTitle>
                    <CardDescription>Connect with researchers who faced similar challenges.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Build on collective knowledge, avoiding dead ends and accelerating scientific progress.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-section-cool">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">High-Impact Datasets</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore impactful negative data that's helping researchers avoid costly mistakes.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
                {featuredDatasets.map((dataset) => (
                  <Link key={dataset.id} href={`/dataset/${dataset.id}`} className="group h-full">
                    <Card className="overflow-hidden h-full transition-shadow hover:shadow-lg cursor-pointer flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg group-hover:text-spin-navy transition-colors">
                          {dataset.title}
                        </CardTitle>
                        <CardDescription>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help">{dataset.author}</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <span className="text-xs">Demo profile - not a real person</span>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-sm">{dataset.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {/* Organism tags */}
                          {dataset.organisms.map((organism, j) => (
                            <button
                              key={j}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                router.push(`/browse?organism=${encodeURIComponent(organism)}`)
                              }}
                              className="inline-flex items-center rounded-md bg-spin-coral/20 px-2 py-1 text-xs font-medium text-spin-coral hover:bg-spin-coral/30 transition-colors"
                            >
                              {organism}
                            </button>
                          ))}
                          {/* Method tags - show first 3 */}
                          {dataset.methods.slice(0, 3).map((method, j) => (
                            <button
                              key={j}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                router.push(`/browse?method=${encodeURIComponent(method)}`)
                              }}
                              className="inline-flex items-center rounded-md bg-spin-orange/20 px-2 py-1 text-xs font-medium text-spin-orange hover:bg-spin-orange/30 transition-colors"
                            >
                              {method}
                            </button>
                          ))}
                          {dataset.methods.length > 3 && (
                            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                              +{dataset.methods.length - 3} more
                            </span>
                          )}
                        </div>
                        {dataset.impact && dataset.impact.length > 0 && (
                          <div className="mt-auto pt-4 border-t">
                            <div className="flex items-center gap-1 mb-2 text-xs text-muted-foreground">
                              <TrendingUp className="h-3 w-3" />
                              <span className="font-medium">Impact</span>
                            </div>
                            <div className="space-y-1">
                              {dataset.impact.map((item, idx) => (
                                <button
                                  key={idx}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    console.log(`Clicked impact: ${item.type}`)
                                  }}
                                  className="flex items-center justify-between w-full text-xs hover:bg-muted/50 rounded px-2 py-1 transition-colors"
                                >
                                  <span className="text-muted-foreground">{item.type}</span>
                                  <span className="font-medium text-spin-navy">{item.count}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="border-t bg-card-footer px-6 py-3 mt-auto">
                        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                          <span>Published: {dataset.date}</span>
                          <span>Saves: {dataset.saves}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
              <Link href="/browse">
                <Button className="mt-4 bg-spin-navy hover:bg-spin-navy/90">Browse All Datasets</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} parallax. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

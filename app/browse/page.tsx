"use client"

import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Search, ChevronDown, X, TrendingUp, ArrowUpDown } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [activeFilters, setActiveFilters] = useState<{
    organisms: string[]
    methods: string[]
    date?: string
    searchQuery?: string
    author?: string
    institution?: string
  }>(() => {
    const organismsParam = searchParams.get("organism")
    const methodsParam = searchParams.get("method")
    return {
      organisms: organismsParam ? [organismsParam] : [],
      methods: methodsParam ? [methodsParam] : [],
      date: searchParams.get("date") || undefined,
      searchQuery: searchParams.get("q") || undefined,
      author: searchParams.get("author") || undefined,
      institution: searchParams.get("institution") || undefined,
    }
  })

  const [organismInput, setOrganismInput] = useState("")
  const [methodInput, setMethodInput] = useState("")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState<"date" | "impact" | "saves">("date")

  const clearFilter = (
    filterType: "organisms" | "methods" | "date" | "searchQuery" | "author" | "institution",
    value?: string,
  ) => {
    setActiveFilters((prev) => {
      const updated = { ...prev }
      if (filterType === "organisms" || filterType === "methods") {
        if (value) {
          updated[filterType] = updated[filterType].filter((item) => item !== value)
        } else {
          updated[filterType] = []
        }
      } else {
        delete updated[filterType as keyof typeof updated]
      }
      return updated
    })

    updateURL({
      ...activeFilters,
      [filterType]:
        filterType === "organisms" || filterType === "methods"
          ? value
            ? activeFilters[filterType].filter((item) => item !== value)
            : []
          : undefined,
    })
  }

  const addOrganism = () => {
    if (organismInput.trim() && !activeFilters.organisms.includes(organismInput.trim())) {
      const updated = [...activeFilters.organisms, organismInput.trim()]
      setActiveFilters((prev) => ({ ...prev, organisms: updated }))
      setOrganismInput("")
    }
  }

  const addMethod = () => {
    if (methodInput.trim() && !activeFilters.methods.includes(methodInput.trim())) {
      const updated = [...activeFilters.methods, methodInput.trim()]
      setActiveFilters((prev) => ({ ...prev, methods: updated }))
      setMethodInput("")
    }
  }

  const updateURL = (filters: typeof activeFilters) => {
    const params = new URLSearchParams()
    if (filters.searchQuery) params.append("q", filters.searchQuery)
    if (filters.author) params.append("author", filters.author)
    if (filters.institution) params.append("institution", filters.institution)
    if (filters.date) params.append("date", filters.date)
    filters.organisms.forEach((org) => params.append("organism", org))
    filters.methods.forEach((method) => params.append("method", method))
    router.push(`/browse?${params.toString()}`)
  }

  const applyFilters = () => {
    updateURL(activeFilters)
  }

  const allDatasets = [
    {
      id: 1,
      title: "Failed CRISPR Knockout of daf-2 in C. elegans Shows No Lifespan Extension",
      author: "Dr. Sarah Johnson, Stanford University",
      description:
        "Despite successful CRISPR-mediated knockout of daf-2 confirmed by sequencing, we observed no significant increase in lifespan across three independent replication attempts.",
      date: "March 2024",
      dateSort: new Date("2024-03-15"),
      saves: 12,
      organisms: ["Caenorhabditis elegans"],
      methods: ["CRISPR/Cas9", "Genotyping PCR", "Sanger Sequencing", "Lifespan Assay"],
      impact: [
        { type: "Used in publication", count: 3 },
        { type: "Prevented redundant experiment", count: 8 },
      ],
      impactScore: 11,
    },
    {
      id: 2,
      title: "Resveratrol Supplementation Shows No Cognitive Benefits in Healthy Adults",
      author: "Dr. Amanda Lee, Johns Hopkins University",
      description:
        "A double-blind, placebo-controlled trial of resveratrol supplementation in 120 healthy adults showed no improvements in cognitive function or brain activity patterns after 6 months.",
      date: "February 2024",
      dateSort: new Date("2024-02-28"),
      saves: 15,
      organisms: ["Homo sapiens"],
      methods: ["fMRI", "Cognitive Testing Battery", "ELISA", "LC-MS/MS"],
      impact: [
        { type: "Used in grant application", count: 5 },
        { type: "Prevented redundant experiment", count: 12 },
      ],
      impactScore: 17,
    },
    {
      id: 3,
      title: "Metformin Does Not Enhance Exercise Performance in Non-Diabetic Athletes",
      author: "Dr. James Wilson, University of Texas",
      description:
        "Despite confirmed biochemical changes, no improvements in VO2 max or time trial performance were observed across four separate cohorts.",
      date: "January 2024",
      dateSort: new Date("2024-01-10"),
      saves: 18,
      organisms: ["Homo sapiens"],
      methods: ["VO2 Max Testing", "Lactate Threshold Analysis", "Metabolomics", "Western Blot"],
      impact: [
        { type: "Used in publication", count: 2 },
        { type: "Used in grant application", count: 4 },
        { type: "Prevented redundant experiment", count: 15 },
      ],
      impactScore: 21,
    },
    {
      id: 4,
      title: "RNA Interference Against α-synuclein Shows No Therapeutic Effect in Parkinson's Model",
      author: "Maria Rodriguez, MIT",
      description:
        "AAV-mediated delivery of shRNA targeting α-synuclein in a mouse model of Parkinson's disease failed to improve motor symptoms or reduce protein aggregation despite successful gene knockdown.",
      date: "December 2023",
      dateSort: new Date("2023-12-05"),
      saves: 23,
      organisms: ["Mus musculus"],
      methods: ["Stereotaxic Injection", "Behavioral Testing", "Immunohistochemistry", "RT-qPCR"],
      impactScore: 0,
    },
    {
      id: 5,
      title: "Ketogenic Diet Fails to Improve Seizure Control in Drug-Resistant Epilepsy Patients",
      author: "Dr. David Kim, Harvard Medical School",
      description:
        "A 6-month trial of ketogenic diet in 45 patients with drug-resistant epilepsy showed no significant reduction in seizure frequency despite achieving therapeutic ketosis.",
      date: "November 2023",
      dateSort: new Date("2023-11-18"),
      saves: 31,
      organisms: ["Homo sapiens"],
      methods: ["EEG Monitoring", "Ketone Body Measurement", "Seizure Diary", "Dietary Analysis"],
      impact: [
        { type: "Used in publication", count: 1 },
        { type: "Prevented redundant experiment", count: 9 },
      ],
      impactScore: 10,
    },
    {
      id: 6,
      title: "Oxytocin Nasal Spray Shows No Effect on Social Cognition in Autism Spectrum Disorder",
      author: "Lisa Patel, Oxford University",
      description:
        "Despite successful elevation of salivary oxytocin levels, intranasal oxytocin administration showed no improvements in social cognition tasks or brain activation patterns.",
      date: "October 2023",
      dateSort: new Date("2023-10-22"),
      saves: 28,
      organisms: ["Homo sapiens"],
      methods: ["Behavioral Assessment", "Eye Tracking", "fMRI", "Salivary Oxytocin ELISA"],
      impactScore: 0,
    },
  ]

  const filteredDatasets = allDatasets.filter((dataset) => {
    if (activeFilters.searchQuery) {
      const query = activeFilters.searchQuery.toLowerCase()
      const matchesTitle = dataset.title.toLowerCase().includes(query)
      const matchesDescription = dataset.description.toLowerCase().includes(query)
      const matchesMethods = dataset.methods.some((m) => m.toLowerCase().includes(query))
      const matchesOrganisms = dataset.organisms.some((o) => o.toLowerCase().includes(query))

      if (!matchesTitle && !matchesDescription && !matchesMethods && !matchesOrganisms) {
        return false
      }
    }

    if (activeFilters.organisms.length > 0) {
      const hasMatchingOrganism = activeFilters.organisms.some((filterOrg) =>
        dataset.organisms.some((org) => org.toLowerCase().includes(filterOrg.toLowerCase())),
      )
      if (!hasMatchingOrganism) return false
    }

    if (activeFilters.methods.length > 0) {
      const hasMatchingMethod = activeFilters.methods.some((filterMethod) =>
        dataset.methods.some((method) => method.toLowerCase().includes(filterMethod.toLowerCase())),
      )
      if (!hasMatchingMethod) return false
    }

    if (activeFilters.author && !dataset.author.toLowerCase().includes(activeFilters.author.toLowerCase())) {
      return false
    }

    if (activeFilters.institution && !dataset.author.toLowerCase().includes(activeFilters.institution.toLowerCase())) {
      return false
    }

    if (activeFilters.date) {
      const now = new Date()
      const datasetDate = dataset.dateSort

      switch (activeFilters.date) {
        case "last-week":
        case "week":
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          if (datasetDate < oneWeekAgo) return false
          break
        case "last-month":
        case "month":
          const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          if (datasetDate < oneMonthAgo) return false
          break
        case "last-year":
        case "year":
          const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
          if (datasetDate < oneYearAgo) return false
          break
      }
    }

    return true
  })

  const sortedDatasets = [...filteredDatasets].sort((a, b) => {
    if (sortBy === "date") {
      return b.dateSort.getTime() - a.dateSort.getTime()
    } else if (sortBy === "impact") {
      return b.impactScore - a.impactScore
    } else if (sortBy === "saves") {
      return b.saves - a.saves
    }
    return 0
  })

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 bg-muted border-b">
          <div className="container px-4 md:px-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Browse Datasets</h1>
              <p className="text-muted-foreground max-w-[700px]">
                Discover negative scientific data that helps advance research through transparency.
              </p>
            </div>
          </div>
        </section>

        {(activeFilters.organisms.length > 0 ||
          activeFilters.methods.length > 0 ||
          activeFilters.searchQuery ||
          activeFilters.author ||
          activeFilters.institution ||
          activeFilters.date) && (
          <div className="border-b bg-muted/50">
            <div className="container px-4 md:px-6 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {activeFilters.searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {activeFilters.searchQuery}
                    <button
                      onClick={() => clearFilter("searchQuery")}
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {activeFilters.organisms.map((organism) => (
                  <Badge
                    key={organism}
                    variant="secondary"
                    className="gap-1 bg-spin-coral/20 text-spin-coral hover:bg-spin-coral/30"
                  >
                    {organism}
                    <button
                      onClick={() => clearFilter("organisms", organism)}
                      className="ml-1 hover:bg-spin-coral/40 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {activeFilters.methods.map((method) => (
                  <Badge
                    key={method}
                    variant="secondary"
                    className="gap-1 bg-spin-orange/20 text-spin-orange hover:bg-spin-orange/30"
                  >
                    {method}
                    <button
                      onClick={() => clearFilter("methods", method)}
                      className="ml-1 hover:bg-spin-orange/40 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {activeFilters.author && (
                  <Badge variant="secondary" className="gap-1">
                    Author: {activeFilters.author}
                    <button onClick={() => clearFilter("author")} className="ml-1 hover:bg-muted rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {activeFilters.institution && (
                  <Badge variant="secondary" className="gap-1">
                    Institution: {activeFilters.institution}
                    <button
                      onClick={() => clearFilter("institution")}
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {activeFilters.date && (
                  <Badge variant="secondary" className="gap-1">
                    Date: {activeFilters.date}
                    <button onClick={() => clearFilter("date")} className="ml-1 hover:bg-muted rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1 space-y-6">
              <div className="sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setFiltersOpen(!filtersOpen)}>
                    <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
                  </Button>
                </div>

                <div className={`space-y-4 ${filtersOpen ? "block" : "hidden lg:block"}`}>
                  <div className="space-y-2">
                    <Label>Search</Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search datasets..."
                        className="pl-8"
                        value={activeFilters.searchQuery || ""}
                        onChange={(e) =>
                          setActiveFilters((prev) => ({ ...prev, searchQuery: e.target.value || undefined }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") applyFilters()
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organism-filter">Organisms</Label>
                    <div className="flex gap-2">
                      <Input
                        id="organism-filter"
                        placeholder="e.g., Caenorhabditis elegans"
                        value={organismInput}
                        onChange={(e) => setOrganismInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addOrganism()
                          }
                        }}
                      />
                      <Button size="sm" onClick={addOrganism} className="bg-spin-coral hover:bg-spin-coral/90">
                        Add
                      </Button>
                    </div>
                    {activeFilters.organisms.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {activeFilters.organisms.map((organism) => (
                          <Badge key={organism} variant="secondary" className="gap-1 bg-spin-coral/20 text-spin-coral">
                            {organism}
                            <button
                              onClick={() => clearFilter("organisms", organism)}
                              className="hover:bg-spin-coral/30 rounded-full"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="method-filter">Methods</Label>
                    <div className="flex gap-2">
                      <Input
                        id="method-filter"
                        placeholder="e.g., CRISPR/Cas9, fMRI"
                        value={methodInput}
                        onChange={(e) => setMethodInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addMethod()
                          }
                        }}
                      />
                      <Button size="sm" onClick={addMethod} className="bg-spin-orange hover:bg-spin-orange/90">
                        Add
                      </Button>
                    </div>
                    {activeFilters.methods.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {activeFilters.methods.map((method) => (
                          <Badge key={method} variant="secondary" className="gap-1 bg-spin-orange/20 text-spin-orange">
                            {method}
                            <button
                              onClick={() => clearFilter("methods", method)}
                              className="hover:bg-spin-orange/30 rounded-full"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Publication Date</Label>
                    <Select
                      value={activeFilters.date || "all"}
                      onValueChange={(value) =>
                        setActiveFilters((prev) => ({ ...prev, date: value === "all" ? undefined : value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any time</SelectItem>
                        <SelectItem value="week">Last week</SelectItem>
                        <SelectItem value="month">Last month</SelectItem>
                        <SelectItem value="year">Last year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-spin-navy hover:bg-spin-navy/90" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-2xl font-bold">All Datasets</h2>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Publication Date</SelectItem>
                      <SelectItem value="impact">Impact Score</SelectItem>
                      <SelectItem value="saves">Number of Saves</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {sortedDatasets.length > 0 ? (
                <div className="space-y-4">
                  {sortedDatasets.map((dataset) => (
                    <Link key={dataset.id} href={`/dataset/${dataset.id}`} className="block group">
                      <Card className="transition-shadow hover:shadow-lg cursor-pointer">
                        <CardHeader>
                          <CardTitle className="group-hover:text-spin-navy transition-colors">
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
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{dataset.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
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
                            <div className="mt-4 pt-4 border-t">
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
                                      console.log(`[v0] Clicked impact: ${item.type}`)
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
                        <CardFooter className="border-t bg-muted/50 px-6 py-3">
                          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                            <span>Published: {dataset.date}</span>
                            <span>Saves: {dataset.saves}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="p-12">
                  <div className="text-center space-y-2">
                    <p className="text-lg font-semibold">No datasets found</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your filters or search criteria to find more results.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

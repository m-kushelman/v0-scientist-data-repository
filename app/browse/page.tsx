import { Search, Filter, Download, Share2, BookmarkPlus, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"

export default function BrowsePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container mx-auto p-4 md:p-6 flex-1">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-spin-navy hover:text-spin-orange mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mb-2">Browse Scientific Data</h1>
          <p className="text-muted-foreground">Search and filter through thousands of scientific datasets</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Filters sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Field of Study</h3>
                  <div className="space-y-2">
                    {["Physics", "Chemistry", "Biology", "Medicine", "Earth Science"].map((field) => (
                      <div key={field} className="flex items-center space-x-2">
                        <Checkbox id={`field-${field.toLowerCase()}`} />
                        <Label htmlFor={`field-${field.toLowerCase()}`}>{field}</Label>
                      </div>
                    ))}
                    <Button variant="link" className="p-0 h-auto text-xs">
                      Show more
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Publication Date</h3>
                  <Select>
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

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {["climate", "genomics", "neuroscience", "quantum", "materials"].map((tag) => (
                      <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted">
                        {tag}
                      </Badge>
                    ))}
                    <Button variant="link" className="p-0 h-auto text-xs">
                      Show more
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Verification Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified" defaultChecked />
                      <Label htmlFor="verified">Verified</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="peer-reviewed" />
                      <Label htmlFor="peer-reviewed">Peer Reviewed</Label>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-spin-navy hover:bg-spin-navy/90 text-white">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="space-y-6">
            {/* Search bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search datasets, methods, or keywords..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Advanced
              </Button>
            </div>

            {/* Featured Articles of the Month */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-spin-navy">Featured Articles of the Month</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="overflow-hidden border-t-4 border-t-spin-orange">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-spin-orange hover:bg-spin-orange/90 text-white">Editor's Choice</Badge>
                      <span className="text-xs text-muted-foreground">April 2025</span>
                    </div>
                    <CardTitle className="mt-2 text-lg hover:text-spin-orange cursor-pointer">
                      Quantum Computing Breakthrough in Error Correction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-3">
                      A novel approach to quantum error correction that increases qubit stability by an order of
                      magnitude, potentially accelerating the development of practical quantum computers.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        quantum-computing
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        error-correction
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/30 text-xs text-muted-foreground">
                    By Dr. Hiroshi Tanaka, Quantum Research Institute
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden border-t-4 border-t-spin-coral">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-spin-coral hover:bg-spin-coral/90 text-white">Most Cited</Badge>
                      <span className="text-xs text-muted-foreground">April 2025</span>
                    </div>
                    <CardTitle className="mt-2 text-lg hover:text-spin-coral cursor-pointer">
                      CRISPR-Based Therapeutic for Neurodegenerative Diseases
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-3">
                      A groundbreaking application of CRISPR technology that targets specific genetic markers associated
                      with Alzheimer's and Parkinson's diseases, showing promising results in early clinical trials.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        crispr
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        neuroscience
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/30 text-xs text-muted-foreground">
                    By Dr. Maria Gonzalez, Medical Genomics Center
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden border-t-4 border-t-spin-orange">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gradient-to-r from-spin-gradient-from to-spin-gradient-to text-white">
                        Trending
                      </Badge>
                      <span className="text-xs text-muted-foreground">April 2025</span>
                    </div>
                    <CardTitle className="mt-2 text-lg hover:text-spin-orange cursor-pointer">
                      Machine Learning Model Predicts Climate Tipping Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-3">
                      An innovative machine learning approach that analyzes historical climate data to identify
                      potential tipping points in Earth's climate system with unprecedented accuracy.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        climate-science
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        machine-learning
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/30 text-xs text-muted-foreground">
                    By Dr. James Chen, Climate Research Institute
                  </CardFooter>
                </Card>
              </div>
            </div>

            {/* Results tabs */}
            <Tabs defaultValue="all">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Results</TabsTrigger>
                  <TabsTrigger value="datasets">Datasets</TabsTrigger>
                  <TabsTrigger value="methods">Methods</TabsTrigger>
                  <TabsTrigger value="researchers">Researchers</TabsTrigger>
                </TabsList>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="date-new">Newest first</SelectItem>
                    <SelectItem value="date-old">Oldest first</SelectItem>
                    <SelectItem value="citations">Most cited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="all" className="mt-6 space-y-6">
                <p className="text-sm text-muted-foreground">Showing 1-10 of 1,245 results</p>

                {/* Results list */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl hover:text-primary cursor-pointer">
                            Genomic Analysis of Marine Microbiomes in Changing Ocean Environments
                          </CardTitle>
                          <div className="text-sm text-muted-foreground mt-1">
                            By Dr. Elena Rodriguez, Marine Biology Institute • Published April {i}, 2024
                          </div>
                        </div>
                        <Badge variant={i % 2 === 0 ? "outline" : "secondary"}>
                          {i % 2 === 0 ? "Dataset" : "Method"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p>
                          A comprehensive genomic analysis of marine microbiomes collected from various ocean depths and
                          locations, examining how these communities respond to changing ocean temperatures,
                          acidification, and other environmental factors.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">genomics</Badge>
                          <Badge variant="outline">marine-biology</Badge>
                          <Badge variant="outline">climate-change</Badge>
                          <Badge variant="outline">microbiome</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/30 flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Citations: {i * 12} • Downloads: {i * 89}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <BookmarkPlus className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}

                <div className="flex justify-center mt-8">
                  <Button variant="outline" className="mx-1">
                    Previous
                  </Button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <Button key={page} variant={page === 1 ? "default" : "outline"} className="mx-1 w-10">
                      {page}
                    </Button>
                  ))}
                  <Button variant="outline" className="mx-1">
                    Next
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

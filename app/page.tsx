"use client"

import Link from "next/link"
import { Filter, Users, Database } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<{
    firstName: string
    lastName: string
  } | null>(null)

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

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Spin: Scientific Data Repository
                </h1>
                {currentUser && (
                  <p className="text-lg text-spin-navy font-medium">Welcome back, {currentUser.firstName}!</p>
                )}
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Share, discover, and collaborate on scientific research data with researchers worldwide.
                </p>
              </div>
              <div className="w-full max-w-2xl space-y-2">
                <div className="flex w-full items-center space-x-2">
                  <Input type="search" placeholder="Search for datasets, methods, or topics..." className="h-12" />
                  <Button type="submit" size="icon" className="h-12 w-12 bg-spin-navy hover:bg-spin-navy/90">
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
                <div>
                  <Button
                    variant="link"
                    className="text-sm flex items-center"
                    onClick={() => document.getElementById("advanced-search")?.classList.toggle("hidden")}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Advanced Search
                  </Button>
                  <div id="advanced-search" className="hidden mt-4 p-4 border rounded-lg bg-white shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="field">Field of Study</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="physics">Physics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                            <SelectItem value="biology">Biology</SelectItem>
                            <SelectItem value="medicine">Medicine</SelectItem>
                            <SelectItem value="earth-science">Earth Science</SelectItem>
                            <SelectItem value="computer-science">Computer Science</SelectItem>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subtopic">Subtopic</Label>
                        <Input id="subtopic" placeholder="e.g., Quantum Physics, Genomics" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="publication-date">Publication Date</Label>
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
                      <div className="space-y-2">
                        <Label htmlFor="author">Author</Label>
                        <Input id="author" placeholder="Author name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution</Label>
                        <Input id="institution" placeholder="e.g., MIT, Stanford University" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="organisms">Organisms</Label>
                        <Input id="organisms" placeholder="e.g., E. coli, Drosophila" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="methods">Methods</Label>
                        <Input id="methods" placeholder="e.g., PCR, CRISPR, Machine Learning" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="keywords">Keywords</Label>
                        <Input id="keywords" placeholder="Enter keywords separated by commas" />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button className="bg-spin-navy hover:bg-spin-navy/90">Search</Button>
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
                  A platform designed for scientists to share and discover research data.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <Database className="h-12 w-12 text-spin-orange" />
                    <CardTitle>Share Your Data</CardTitle>
                    <CardDescription>
                      Upload your research data, methods, and descriptions in a structured format.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Create verified entries with your research findings, methodologies, and key insights.
                    </p>
                  </CardContent>
                </Card>
                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <Filter className="h-12 w-12 text-spin-coral" />
                    <CardTitle>Discover Research</CardTitle>
                    <CardDescription>
                      Find relevant data through our powerful search and filtering system.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Use tags, keywords, and advanced search to find exactly what you're looking for.
                    </p>
                  </CardContent>
                </Card>
                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <Users className="h-12 w-12 text-spin-orange" />
                    <CardTitle>Collaborate</CardTitle>
                    <CardDescription>Connect with other researchers and build on existing work.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Comment on entries, follow researchers, and receive updates on new relevant data.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Datasets</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore some of the most impactful research data shared on our platform.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>Climate Change Impact Dataset {i}</CardTitle>
                      <CardDescription>By Dr. Jane Smith, Environmental Science Institute</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        A comprehensive dataset on climate change impacts across different ecosystems, including
                        temperature variations, biodiversity changes, and ecological responses.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          climate
                        </span>
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                          ecology
                        </span>
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10">
                          biodiversity
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 px-6 py-3">
                      <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                        <span>Published: March 15, 2024</span>
                        <span>Citations: 42</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <Button className="mt-4">Browse All Datasets</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} spin. All rights reserved.
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

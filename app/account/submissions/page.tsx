"use client"

import Link from "next/link"
import { ArrowLeft, Plus, Edit, Trash2, Eye, Download, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"

export default function SubmissionsPage() {
  // Mock data for submissions
  const submissions = [
    {
      id: 1,
      title: "Marine Microbiome Analysis Dataset",
      status: "published",
      submittedDate: "2024-03-15",
      views: 187,
      downloads: 42,
      citations: 3,
    },
    {
      id: 2,
      title: "Climate Change Impact on Coral Reefs",
      status: "under-review",
      submittedDate: "2024-04-02",
      views: 23,
      downloads: 0,
      citations: 0,
    },
    {
      id: 3,
      title: "Quantum Computing Error Correction Methods",
      status: "draft",
      submittedDate: "2024-04-10",
      views: 0,
      downloads: 0,
      citations: 0,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>
      case "under-review":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Under Review</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container mx-auto p-4 md:p-6 max-w-6xl flex-1">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-spin-navy hover:text-spin-orange mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Submissions</h1>
              <p className="text-muted-foreground">Manage your research data submissions</p>
            </div>
            <Link href="/submit">
              <Button className="bg-spin-navy hover:bg-spin-navy/90">
                <Plus className="mr-2 h-4 w-4" />
                New Submission
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Submissions</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="under-review">Under Review</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {submissions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <Plus className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">No submissions yet</h3>
                      <p className="text-muted-foreground">Start sharing your research data with the community</p>
                    </div>
                    <Link href="/submit">
                      <Button className="bg-spin-navy hover:bg-spin-navy/90">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Submission
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-xl">{submission.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Submitted: {submission.submittedDate}</span>
                            <span>•</span>
                            <span>{submission.views} views</span>
                            <span>•</span>
                            <span>{submission.downloads} downloads</span>
                            <span>•</span>
                            <span>{submission.citations} citations</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">{getStatusBadge(submission.status)}</div>
                      </div>
                    </CardHeader>
                    <CardFooter className="border-t bg-muted/30 flex justify-between">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        {submission.status === "published" && (
                          <>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-600">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="published" className="space-y-6">
            <div className="space-y-4">
              {submissions
                .filter((s) => s.status === "published")
                .map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-xl">{submission.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Published: {submission.submittedDate}</span>
                            <span>•</span>
                            <span>{submission.views} views</span>
                            <span>•</span>
                            <span>{submission.downloads} downloads</span>
                            <span>•</span>
                            <span>{submission.citations} citations</span>
                          </div>
                        </div>
                        {getStatusBadge(submission.status)}
                      </div>
                    </CardHeader>
                    <CardFooter className="border-t bg-muted/30 flex justify-between">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
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
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-600">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="under-review" className="space-y-6">
            <div className="space-y-4">
              {submissions
                .filter((s) => s.status === "under-review")
                .map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-xl">{submission.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Submitted: {submission.submittedDate}</span>
                            <span>•</span>
                            <span>Under review by editorial team</span>
                          </div>
                        </div>
                        {getStatusBadge(submission.status)}
                      </div>
                    </CardHeader>
                    <CardFooter className="border-t bg-muted/30 flex justify-between">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-600">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Withdraw
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="draft" className="space-y-6">
            <div className="space-y-4">
              {submissions
                .filter((s) => s.status === "draft")
                .map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-xl">{submission.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Last saved: {submission.submittedDate}</span>
                            <span>•</span>
                            <span>Draft not submitted</span>
                          </div>
                        </div>
                        {getStatusBadge(submission.status)}
                      </div>
                    </CardHeader>
                    <CardFooter className="border-t bg-muted/30 flex justify-between">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Continue Editing
                        </Button>
                        <Button size="sm" className="bg-spin-navy hover:bg-spin-navy/90">
                          Submit for Review
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-600">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete Draft
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

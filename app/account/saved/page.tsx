"use client"

import Link from "next/link"
import { ArrowLeft, Bookmark, Download, Share2, Trash2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"

export default function SavedPage() {
  // Mock data for saved posts
  const savedPosts = [
    {
      id: 1,
      title: "Genomic Analysis of Marine Microbiomes in Changing Ocean Environments",
      author: "Dr. Elena Rodriguez",
      institution: "Marine Biology Institute",
      savedDate: "2024-04-15",
      type: "Dataset",
      tags: ["genomics", "marine-biology", "climate-change"],
      citations: 42,
      downloads: 187,
    },
    {
      id: 2,
      title: "CRISPR-Based Therapeutic for Neurodegenerative Diseases",
      author: "Dr. Maria Gonzalez",
      institution: "Medical Genomics Center",
      savedDate: "2024-04-12",
      type: "Method",
      tags: ["crispr", "neuroscience", "therapeutics"],
      citations: 128,
      downloads: 89,
    },
    {
      id: 3,
      title: "Machine Learning Model Predicts Climate Tipping Points",
      author: "Dr. James Chen",
      institution: "Climate Research Institute",
      savedDate: "2024-04-08",
      type: "Dataset",
      tags: ["climate-science", "machine-learning", "prediction"],
      citations: 67,
      downloads: 234,
    },
  ]

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
              <h1 className="text-3xl font-bold mb-2">Saved Posts</h1>
              <p className="text-muted-foreground">Your bookmarked research data and methods</p>
            </div>
            <div className="text-sm text-muted-foreground">
              {savedPosts.length} saved {savedPosts.length === 1 ? "item" : "items"}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search your saved posts..." className="pl-10" />
          </div>
        </div>

        {savedPosts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Bookmark className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">No saved posts yet</h3>
                  <p className="text-muted-foreground">
                    Start bookmarking interesting research data and methods to access them later
                  </p>
                </div>
                <Link href="/browse">
                  <Button className="bg-spin-navy hover:bg-spin-navy/90">Browse Research Data</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {savedPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl hover:text-spin-navy cursor-pointer">{post.title}</CardTitle>
                        <Badge variant={post.type === "Dataset" ? "default" : "secondary"}>{post.type}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        By {post.author}, {post.institution}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">Saved {post.savedDate}</div>
                  </div>
                </CardHeader>
                <CardFooter className="border-t bg-muted/30 flex justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Citations: {post.citations}</span>
                    <span>•</span>
                    <span>Downloads: {post.downloads}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
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
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-600">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

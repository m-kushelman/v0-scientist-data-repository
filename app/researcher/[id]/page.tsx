"use client"

import Link from "next/link"
import { ArrowLeft, Mail, FileText, TrendingUp, Calendar, AlertCircle } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function ResearcherPage({ params }: { params: { id: string } }) {
  const [contactOpen, setContactOpen] = useState(false)

  const researchers: Record<string, any> = {
    "sarah-johnson": {
      name: "Dr. Sarah Johnson",
      position: "Postdoctoral Researcher",
      institution: "Stanford University",
      department: "Department of Genetics",
      joinedDate: "January 2023",
      bio: "Researching longevity mechanisms in model organisms with a focus on genetic interventions and metabolic pathways.",
      stats: {
        datasets: 3,
        totalImpact: 24,
        citations: 8,
      },
      publishedDatasets: [
        {
          id: 1,
          title: "Failed CRISPR Knockout of daf-2 in C. elegans Shows No Lifespan Extension",
          date: "March 2024",
        },
        { id: 7, title: "RNAi Knockdown of hsf-1 Does Not Affect Heat Shock Response", date: "January 2024" },
      ],
    },
    "amanda-lee": {
      name: "Dr. Amanda Lee",
      position: "Postdoctoral Researcher",
      institution: "Johns Hopkins University",
      department: "Department of Neuroscience",
      joinedDate: "September 2022",
      bio: "Investigating cognitive enhancement strategies and nutritional interventions in aging populations.",
      stats: {
        datasets: 5,
        totalImpact: 42,
        citations: 15,
      },
      publishedDatasets: [
        {
          id: 2,
          title: "Resveratrol Supplementation Shows No Cognitive Benefits in Healthy Adults",
          date: "March 2024",
        },
      ],
    },
    "michael-chen": {
      name: "Michael Chen",
      position: "Graduate Student",
      institution: "Johns Hopkins University",
      department: "Department of Biomedical Engineering",
      joinedDate: "August 2023",
      bio: "Developing novel neuroimaging analysis methods and studying brain connectivity patterns.",
      stats: {
        datasets: 2,
        totalImpact: 18,
        citations: 5,
      },
      publishedDatasets: [
        {
          id: 2,
          title: "Resveratrol Supplementation Shows No Cognitive Benefits in Healthy Adults",
          date: "March 2024",
        },
      ],
    },
    "james-wilson": {
      name: "Dr. James Wilson",
      position: "Postdoctoral Fellow",
      institution: "University of Texas",
      department: "Department of Kinesiology",
      joinedDate: "June 2022",
      bio: "Exploring metabolic interventions for athletic performance enhancement and exercise physiology.",
      stats: {
        datasets: 4,
        totalImpact: 38,
        citations: 12,
      },
      publishedDatasets: [
        {
          id: 3,
          title: "Metformin Does Not Enhance Exercise Performance in Non-Diabetic Athletes",
          date: "March 2024",
        },
      ],
    },
    "maria-rodriguez": {
      name: "Maria Rodriguez",
      position: "PhD Candidate",
      institution: "MIT",
      department: "Department of Biology",
      joinedDate: "September 2021",
      bio: "Studying stem cell differentiation and regenerative medicine approaches in tissue engineering.",
      stats: {
        datasets: 3,
        totalImpact: 19,
        citations: 7,
      },
      publishedDatasets: [
        {
          id: 4,
          title: "Induced Pluripotent Stem Cells Show No Enhanced Cardiac Differentiation with BMP4",
          date: "February 2024",
        },
      ],
    },
    "david-kim": {
      name: "Dr. David Kim",
      position: "Postdoctoral Researcher",
      institution: "Harvard Medical School",
      department: "Department of Systems Biology",
      joinedDate: "March 2023",
      bio: "Investigating metabolic reprogramming in cancer cells and developing targeted therapeutic strategies.",
      stats: {
        datasets: 6,
        totalImpact: 45,
        citations: 18,
      },
      publishedDatasets: [
        {
          id: 5,
          title: "Ketogenic Diet Does Not Suppress Tumor Growth in Mouse Xenograft Model",
          date: "February 2024",
        },
      ],
    },
    "lisa-patel": {
      name: "Lisa Patel",
      position: "Undergraduate Researcher",
      institution: "Oxford University",
      department: "Department of Biochemistry",
      joinedDate: "October 2023",
      bio: "Exploring protein folding dynamics and investigating therapeutic targets for neurodegenerative diseases.",
      stats: {
        datasets: 1,
        totalImpact: 4,
        citations: 2,
      },
      publishedDatasets: [
        {
          id: 6,
          title: "Molecular Chaperone Overexpression Fails to Reduce Alpha-Synuclein Aggregation",
          date: "January 2024",
        },
      ],
    },
  }

  const researcher = researchers[params.id]

  if (!researcher) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <div className="container py-8">
            <p>Researcher not found</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          {/* Disclaimer Notice */}
          <div className="mb-4 flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <p>
              <strong>Note:</strong> This is a demonstration profile. Any resemblance to real persons is purely
              coincidental.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Profile Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" />
                      <AvatarFallback className="text-lg">
                        {researcher.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{researcher.name}</CardTitle>
                      <div className="text-base mt-1 text-muted-foreground">
                        <div className="space-y-1">
                          <div className="font-medium text-foreground">{researcher.position}</div>
                          <div>{researcher.institution}</div>
                          <div className="text-sm">{researcher.department}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          Joined {researcher.joinedDate}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{researcher.bio}</p>
                </CardContent>
              </Card>

              {/* Published Datasets */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Published Datasets
                  </CardTitle>
                  <CardDescription>Negative data contributions to the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {researcher.publishedDatasets.map((dataset: any) => (
                      <Link key={dataset.id} href={`/dataset/${dataset.id}`}>
                        <div className="p-4 border rounded-lg hover:bg-muted/50 hover:border-spin-orange/50 transition-all cursor-pointer">
                          <h3 className="font-medium text-sm mb-1 hover:text-spin-navy">{dataset.title}</h3>
                          <p className="text-xs text-muted-foreground">{dataset.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Datasets Published</span>
                    <span className="text-2xl font-bold text-spin-navy">{researcher.stats.datasets}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Impact Score</span>
                    <span className="text-2xl font-bold text-spin-orange">{researcher.stats.totalImpact}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Community Citations</span>
                    <span className="text-2xl font-bold text-spin-coral">{researcher.stats.citations}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                  <CardDescription>Get in touch via relay message</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={contactOpen} onOpenChange={setContactOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-spin-navy hover:bg-spin-navy/90">
                        <Mail className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contact {researcher.name}</DialogTitle>
                        <DialogDescription>
                          Your message will be relayed to the researcher. They will respond to your registered email if
                          interested.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input id="subject" placeholder="Research collaboration opportunity" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Hi, I'm interested in your work on..."
                            className="min-h-[150px]"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setContactOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          className="bg-spin-navy hover:bg-spin-navy/90"
                          onClick={() => {
                            // Handle message send
                            console.log("Message sent")
                            setContactOpen(false)
                          }}
                        >
                          Send Message
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <p className="text-xs text-muted-foreground mt-2 text-center">Messages are relayed for privacy</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

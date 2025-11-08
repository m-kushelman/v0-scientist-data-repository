import Link from "next/link"
import {
  Download,
  Share2,
  BookmarkPlus,
  MessageSquare,
  ThumbsUp,
  User,
  Calendar,
  FileText,
  Database,
  Tag,
  ArrowLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"

export default function DatasetPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container mx-auto p-4 md:p-6 max-w-5xl flex-1">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link href="/browse" className="hover:underline">
              Browse
            </Link>
            <span>/</span>
            <span>Dataset</span>
          </div>

          <Link href="/" className="inline-flex items-center text-spin-navy hover:text-spin-orange mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Genomic Analysis of Marine Microbiomes in Changing Ocean Environments
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge>Dataset</Badge>
                <Badge variant="outline">Verified</Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                  Open Access
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <BookmarkPlus className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button size="sm" className="bg-spin-navy hover:bg-spin-navy/90">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="methods">Methods</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Abstract</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      This study presents a comprehensive genomic analysis of marine microbiomes collected from various
                      ocean depths and locations across the Pacific Ocean. Using next-generation sequencing techniques,
                      we examined how these microbial communities respond to changing ocean temperatures, acidification,
                      and other environmental factors associated with climate change.
                    </p>
                    <p className="mt-4">
                      Our findings reveal significant shifts in microbial community composition and functional gene
                      abundance in response to environmental stressors, with potential implications for ocean ecosystem
                      health and biogeochemical cycling. The dataset includes raw sequencing data, processed taxonomic
                      and functional profiles, and associated environmental metadata.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Findings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium">1. Taxonomic Shifts</h3>
                      <p className="text-sm mt-1">
                        Significant changes in microbial community composition were observed along temperature and pH
                        gradients, with certain taxa showing strong correlations with specific environmental parameters.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">2. Functional Adaptations</h3>
                      <p className="text-sm mt-1">
                        Genes involved in carbon fixation, nitrogen cycling, and stress response showed differential
                        abundance patterns across sampling sites, suggesting functional adaptations to changing
                        conditions.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">3. Novel Diversity</h3>
                      <p className="text-sm mt-1">
                        Discovery of previously uncharacterized microbial lineages in deep ocean samples, expanding our
                        understanding of marine microbial diversity.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Citation Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Rodriguez, E., Johnson, M., & Smith, J. (2024). Genomic Analysis of Marine Microbiomes in Changing
                      Ocean Environments. Spin Data Repository. https://doi.org/10.1234/spin.2024.001
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        Copy Citation
                      </Button>
                      <Button variant="outline" size="sm">
                        Download BibTeX
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dataset Files</CardTitle>
                    <CardDescription>The complete dataset includes the following files</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-md border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <Database className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="font-medium">raw_sequencing_data.tar.gz</p>
                              <p className="text-xs text-muted-foreground">Raw sequencing reads (FASTQ format)</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">4.2 GB</span>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="font-medium">taxonomic_profiles.csv</p>
                              <p className="text-xs text-muted-foreground">Processed taxonomic abundance data</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">15.7 MB</span>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="font-medium">functional_profiles.csv</p>
                              <p className="text-xs text-muted-foreground">Functional gene abundance data</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">22.3 MB</span>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-yellow-500" />
                            <div>
                              <p className="font-medium">environmental_metadata.xlsx</p>
                              <p className="text-xs text-muted-foreground">
                                Sample metadata and environmental parameters
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">1.2 MB</span>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-red-500" />
                            <div>
                              <p className="font-medium">README.md</p>
                              <p className="text-xs text-muted-foreground">
                                Dataset documentation and usage instructions
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">45 KB</span>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full mt-4 bg-spin-navy hover:bg-spin-navy/90">
                      <Download className="mr-2 h-4 w-4" />
                      Download Complete Dataset (4.3 GB)
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="methods" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Research Methods</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium">Sample Collection</h3>
                      <p className="text-sm mt-1">
                        Samples were collected from 15 locations across the Pacific Ocean at varying depths (0-1000m)
                        during research cruises conducted between June 2022 and August 2023. Water samples were filtered
                        through 0.22μm filters to capture microbial biomass, and filters were preserved at -80°C until
                        processing.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">DNA Extraction and Sequencing</h3>
                      <p className="text-sm mt-1">
                        Genomic DNA was extracted using the DNeasy PowerWater Kit (QIAGEN) following the manufacturer's
                        protocol. Metagenomic libraries were prepared using the Illumina Nextera XT DNA Library Prep Kit
                        and sequenced on an Illumina NovaSeq 6000 platform with 2×150 bp paired-end reads, generating
                        approximately 20 Gb of data per sample.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">Bioinformatic Analysis</h3>
                      <p className="text-sm mt-1">
                        Raw sequencing reads were quality-filtered using Trimmomatic v0.39. Taxonomic profiling was
                        performed using MetaPhlAn3, and functional annotation was conducted using the HUMAnN3 pipeline
                        with the UniRef90 and MetaCyc databases. Statistical analyses were performed in R v4.2.0 using
                        the vegan, DESeq2, and phyloseq packages.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">Environmental Parameters</h3>
                      <p className="text-sm mt-1">
                        Temperature, salinity, pH, dissolved oxygen, and nutrient concentrations (nitrate, phosphate,
                        silicate) were measured at each sampling location using a CTD rosette equipped with a SeaBird
                        SBE 911plus system and additional sensors. Chlorophyll a concentrations were determined
                        fluorometrically.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussion" className="mt-6 space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Discussion</CardTitle>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Start New Thread
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>MJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Dr. Michael Johnson</span>
                              <span className="text-xs text-muted-foreground">2 days ago</span>
                            </div>
                            <p className="text-sm mt-1">
                              Fascinating dataset! I'm particularly interested in the functional gene changes related to
                              nitrogen cycling. Have you looked at correlations between these genes and specific
                              oceanographic features like upwelling zones?
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                <span className="text-xs">12</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <MessageSquare className="h-3.5 w-3.5 mr-1" />
                                <span className="text-xs">Reply</span>
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 pl-12 mt-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>ER</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Dr. Elena Rodriguez</span>
                              <Badge variant="outline" className="text-xs">
                                Author
                              </Badge>
                              <span className="text-xs text-muted-foreground">1 day ago</span>
                            </div>
                            <p className="text-sm mt-1">
                              Thanks for your interest, Michael! Yes, we did observe strong correlations between
                              nitrogen cycling genes (particularly those involved in nitrification and denitrification)
                              and upwelling zones. I've added a supplementary file with these specific analyses that you
                              might find interesting.
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                <span className="text-xs">8</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <MessageSquare className="h-3.5 w-3.5 mr-1" />
                                <span className="text-xs">Reply</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>SL</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Dr. Sarah Lee</span>
                              <span className="text-xs text-muted-foreground">5 days ago</span>
                            </div>
                            <p className="text-sm mt-1">
                              Have you considered how these microbial community shifts might impact higher trophic
                              levels in the marine food web? I'm working on zooplankton responses to changing ocean
                              conditions and would be interested in potential collaborations.
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                <span className="text-xs">5</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <MessageSquare className="h-3.5 w-3.5 mr-1" />
                                <span className="text-xs">Reply</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h4 className="text-sm font-medium mb-2">Add to the discussion</h4>
                      <Textarea placeholder="Share your thoughts or questions..." rows={3} />
                      <Button className="mt-2 bg-spin-navy hover:bg-spin-navy/90">Post Comment</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Authors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Dr. Elena Rodriguez</p>
                    <p className="text-xs text-muted-foreground">Marine Biology Institute</p>
                    <Button variant="link" className="h-auto p-0 text-xs">
                      View Profile
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Dr. Mark Johnson</p>
                    <p className="text-xs text-muted-foreground">Oceanographic Research Center</p>
                    <Button variant="link" className="h-auto p-0 text-xs">
                      View Profile
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Dr. James Smith</p>
                    <p className="text-xs text-muted-foreground">University of California</p>
                    <Button variant="link" className="h-auto p-0 text-xs">
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dataset Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Published</p>
                    <p className="text-xs text-muted-foreground">March 15, 2024</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Citations</p>
                    <p className="text-xs text-muted-foreground">42</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Downloads</p>
                    <p className="text-xs text-muted-foreground">187</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">DOI</p>
                    <p className="text-xs text-blue-600 hover:underline">
                      <a href="#">10.1234/spin.2024.001</a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    <Tag className="h-3 w-3 mr-1" />
                    genomics
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    <Tag className="h-3 w-3 mr-1" />
                    marine-biology
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    <Tag className="h-3 w-3 mr-1" />
                    climate-change
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    <Tag className="h-3 w-3 mr-1" />
                    microbiome
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    <Tag className="h-3 w-3 mr-1" />
                    ocean-acidification
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    <Tag className="h-3 w-3 mr-1" />
                    metagenomics
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related Datasets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Link href="#" className="text-sm font-medium hover:underline">
                    Temporal Dynamics of Coral Reef Microbiomes Under Heat Stress
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">By Dr. Sarah Chen • 45 citations</p>
                </div>

                <div>
                  <Link href="#" className="text-sm font-medium hover:underline">
                    Global Ocean Microbiome Project: Baseline Survey 2020-2023
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">By Dr. Robert Williams • 128 citations</p>
                </div>

                <div>
                  <Link href="#" className="text-sm font-medium hover:underline">
                    Metagenomic Analysis of Arctic Ocean Sediments
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">By Dr. Anna Petrov • 37 citations</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

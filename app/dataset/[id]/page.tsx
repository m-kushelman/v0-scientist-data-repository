"use client"
import Link from "next/link"
import { useState } from "react"
import {
  Download,
  Share2,
  Bookmark,
  BookmarkCheck,
  FileText,
  Calendar,
  Tag,
  User,
  MessageSquare,
  ThumbsUp,
  TrendingUp,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const licenseInfo: Record<string, { name: string; description: string }> = {
  CC0: {
    name: "CC0 (Public Domain)",
    description:
      "No rights reserved. You can copy, modify, distribute and use the work, even for commercial purposes, without asking permission.",
  },
  "CC-BY": {
    name: "CC BY (Attribution)",
    description:
      "You can use, share, and adapt the work, even commercially, as long as you give appropriate credit to the creator.",
  },
  "CC-BY-NC": {
    name: "CC BY-NC (Attribution-NonCommercial)",
    description:
      "You can use, share, and adapt the work for non-commercial purposes only, with attribution to the creator.",
  },
  "CC-BY-ND": {
    name: "CC BY-ND (Attribution-NoDerivs)",
    description: "You can share the work as-is with attribution, but you cannot modify or create derivatives of it.",
  },
  "CC-BY-NC-SA": {
    name: "CC BY-NC-SA (Attribution-NonCommercial-ShareAlike)",
    description:
      "You can adapt and share the work for non-commercial purposes with attribution, but derivatives must use the same license.",
  },
}

export default function DatasetPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  const datasets: Record<string, any> = {
    "1": {
      title: "Failed CRISPR Knockout of daf-2 in C. elegans Shows No Lifespan Extension",
      authors: [{ id: "sarah-johnson", name: "Dr. Sarah Johnson" }],
      institution: "Stanford University",
      date: "March 15, 2024",
      replicationAttempts: 3,
      organisms: ["Caenorhabditis elegans"],
      methods: ["CRISPR/Cas9", "Genotyping PCR", "Sanger Sequencing", "Lifespan Assay"],
      license: "CC-BY",
      impact: [
        { type: "Used in publication", count: 3 },
        { type: "Prevented redundant experiment", count: 8 },
      ],
      relatedPublications: [
        {
          title: "Negative Results in CRISPR-Mediated Longevity Studies: A Meta-Analysis",
          journal: "Journal of Negative Results in BioMedicine",
          year: 2024,
          doi: "10.1186/s12952-024-00123",
          url: "https://doi.org/10.1186/s12952-024-00123",
        },
      ],
      abstract:
        "Despite successful CRISPR-mediated knockout of daf-2 confirmed by sequencing, we observed no significant increase in lifespan across three independent replication attempts with different mutant backgrounds. Our results contradict the established literature showing daf-2 as a key longevity regulator.",
      findings: [
        "No significant lifespan extension in daf-2 knockout animals (p = 0.42)",
        "Knockout confirmed by Sanger sequencing in all tested lines",
        "Consistent null results across three independent genetic backgrounds",
        "Standard daf-2 RNAi control showed expected lifespan increase",
      ],
      tags: ["Aging", "Longevity", "Gene regulation", "Model organism"],
      detailedMethods: [
        {
          name: "CRISPR/Cas9 Gene Editing",
          description:
            "daf-2 knockout was performed using CRISPR/Cas9 with four different guide RNA sequences designed to target different regions of the gene. Microinjection was performed following standard protocols. Successful knockout was confirmed by DNA sequencing of at least 10 independent lines per guide RNA.",
        },
        {
          name: "Genotyping PCR",
          description:
            "PCR amplification of the daf-2 locus was performed using primers flanking the CRISPR target site. Products were analyzed on 1.5% agarose gels to confirm deletions in edited animals.",
        },
        {
          name: "Sanger Sequencing",
          description:
            "PCR products from putative knockout lines were purified and subjected to Sanger sequencing to confirm the exact nature of CRISPR-induced mutations. All confirmed lines showed complete gene disruption.",
        },
        {
          name: "Lifespan Assay",
          description:
            "Lifespan assays were conducted at 20°C with n ≥ 100 animals per condition across three independent trials. Animals were scored daily for survival, with death confirmed by lack of response to gentle prodding. Statistical analysis was performed using log-rank tests in R.",
        },
      ],
    },
    "2": {
      title: "Resveratrol Supplementation Shows No Cognitive Benefits in Healthy Adults",
      authors: [
        { id: "amanda-lee", name: "Dr. Amanda Lee" },
        { id: "michael-chen", name: "Michael Chen" },
      ],
      institution: "Johns Hopkins University",
      date: "February 28, 2024",
      replicationAttempts: 2,
      organisms: ["Homo sapiens"],
      methods: ["fMRI", "Cognitive Testing Battery", "ELISA", "LC-MS/MS"],
      license: "CC-BY-NC",
      impact: [
        { type: "Used in publication", count: 5 },
        { type: "Prevented redundant experiment", count: 12 },
      ],
      relatedPublications: [
        {
          title: "Resveratrol and Cognitive Function: A Systematic Review of Negative Trials",
          journal: "Neurology Research International",
          year: 2024,
          doi: "10.1155/2024/5678901",
          url: "https://doi.org/10.1155/2024/5678901",
        },
        {
          title: "Null Results in Nutraceutical Cognitive Enhancement Studies",
          journal: "Frontiers in Aging Neuroscience",
          year: 2024,
          doi: "10.3389/fnagi.2024.1234567",
          url: "https://doi.org/10.3389/fnagi.2024.1234567",
        },
      ],
      abstract:
        "A double-blind, placebo-controlled trial of resveratrol supplementation (500mg/day) in 120 healthy adults aged 50-70 showed no improvements in cognitive function or brain activity patterns after 6 months.",
      findings: [
        "No significant improvements in memory, attention, or executive function",
        "fMRI showed no changes in hippocampal or prefrontal cortex activity",
        "Plasma resveratrol levels confirmed compliance",
        "No adverse effects observed",
      ],
      tags: ["Clinical trial", "Cognitive function", "Neuroscience", "Nutrition"],
      detailedMethods: [
        {
          name: "fMRI Protocol",
          description:
            "Functional magnetic resonance imaging was performed using a 3T scanner. Participants completed working memory and episodic memory tasks during scanning. BOLD signal changes were analyzed using SPM12 software.",
        },
        {
          name: "Cognitive Testing Battery",
          description:
            "Standardized neuropsychological tests including the Montreal Cognitive Assessment (MoCA), Trail Making Test, and California Verbal Learning Test were administered at baseline, 3 months, and 6 months.",
        },
        {
          name: "ELISA",
          description:
            "Enzyme-linked immunosorbent assays were used to measure inflammatory markers (IL-6, TNF-α, CRP) in serum samples collected at each timepoint.",
        },
        {
          name: "LC-MS/MS",
          description:
            "Liquid chromatography-tandem mass spectrometry was used to quantify resveratrol and its metabolites in plasma samples to confirm supplement compliance and bioavailability.",
        },
      ],
    },
    "3": {
      title: "Metformin Does Not Enhance Exercise Performance in Non-Diabetic Athletes",
      authors: [{ id: "james-wilson", name: "Dr. James Wilson" }],
      institution: "University of Texas",
      date: "January 10, 2024",
      replicationAttempts: 4,
      organisms: ["Homo sapiens"],
      methods: ["VO2 Max Testing", "Lactate Threshold Analysis", "Metabolomics", "Western Blot"],
      license: "CC-BY",
      impact: [
        { type: "Used in publication", count: 2 },
        { type: "Used in grant application", count: 4 },
        { type: "Prevented redundant experiment", count: 15 },
      ],
      relatedPublications: [
        {
          title: "Metformin and Athletic Performance: Evidence from Failed Interventions",
          journal: "Sports Medicine",
          year: 2024,
          doi: "10.1007/s40279-024-01234-5",
          url: "https://doi.org/10.1007/s40279-024-01234-5",
        },
      ],
      abstract:
        "We investigated whether metformin could enhance aerobic performance in trained cyclists through AMPK activation. Despite confirmed biochemical changes, no improvements in VO2 max or time trial performance were observed across four separate cohorts.",
      findings: [
        "No change in VO2 max after 8 weeks of metformin treatment",
        "Time trial performance unchanged or slightly decreased",
        "AMPK phosphorylation increased as expected",
        "Some participants reported gastrointestinal discomfort",
      ],
      tags: ["Exercise Physiology", "Sports medicine", "Metabolism", "Clinical trial"],
      detailedMethods: [
        {
          name: "VO2 Max Testing",
          description:
            "Maximal oxygen uptake was measured using a graded exercise protocol on a cycle ergometer with continuous respiratory gas analysis. Tests were performed at baseline and after 4 and 8 weeks of treatment.",
        },
        {
          name: "Lactate Threshold Analysis",
          description:
            "Blood lactate was measured at regular intervals during submaximal exercise tests to determine lactate threshold and anaerobic threshold values.",
        },
        {
          name: "Metabolomics",
          description:
            "Untargeted metabolomics analysis of serum samples was performed using LC-MS to identify changes in metabolic profiles associated with metformin treatment.",
        },
        {
          name: "Western Blot",
          description:
            "Muscle biopsies were analyzed by Western blot to assess AMPK phosphorylation status and expression of downstream targets including PGC-1α and GLUT4.",
        },
      ],
    },
    "4": {
      title: "RNA Interference Against α-synuclein Shows No Therapeutic Effect in Parkinson's Model",
      authors: [{ id: "maria-rodriguez", name: "Maria Rodriguez" }],
      institution: "MIT",
      date: "December 5, 2023",
      replicationAttempts: 5,
      organisms: ["Mus musculus"],
      methods: ["Stereotaxic Injection", "Behavioral Testing", "Immunohistochemistry", "RT-qPCR"],
      license: "CC0",
      relatedPublications: [],
      abstract:
        "AAV-mediated delivery of shRNA targeting α-synuclein in a mouse model of Parkinson's disease failed to improve motor symptoms or reduce protein aggregation despite successful gene knockdown.",
      findings: [
        "60% reduction in α-synuclein mRNA confirmed by RT-qPCR",
        "No improvement in rotarod or cylinder tests",
        "Protein aggregates still present in substantia nigra",
        "Dopaminergic neuron loss unchanged",
      ],
      tags: ["Neurodegenerative disease", "Gene therapy", "Animal model", "Parkinson's"],
      detailedMethods: [
        {
          name: "Stereotaxic Injection",
          description:
            "AAV vectors containing shRNA against α-synuclein were injected bilaterally into the substantia nigra using stereotaxic coordinates. Injection volume was 2 μL per hemisphere at a rate of 0.2 μL/min.",
        },
        {
          name: "Behavioral Testing",
          description:
            "Motor function was assessed using rotarod test (accelerating protocol) and cylinder test for forelimb asymmetry. Tests were performed weekly for 12 weeks post-injection.",
        },
        {
          name: "Immunohistochemistry",
          description:
            "Brain sections were stained with antibodies against α-synuclein, tyrosine hydroxylase, and phosphorylated α-synuclein to visualize protein aggregates and dopaminergic neurons.",
        },
        {
          name: "RT-qPCR",
          description:
            "Real-time quantitative PCR was used to measure α-synuclein mRNA levels in microdissected substantia nigra tissue. GAPDH was used as the housekeeping gene for normalization.",
        },
      ],
    },
    "5": {
      title: "Ketogenic Diet Fails to Improve Seizure Control in Drug-Resistant Epilepsy Patients",
      authors: [{ id: "david-kim", name: "Dr. David Kim" }],
      institution: "Harvard Medical School",
      date: "November 18, 2023",
      replicationAttempts: 2,
      organisms: ["Homo sapiens"],
      methods: ["EEG Monitoring", "Ketone Body Measurement", "Seizure Diary", "Dietary Analysis"],
      license: "CC-BY-ND",
      impact: [
        { type: "Used in publication", count: 1 },
        { type: "Prevented redundant experiment", count: 9 },
      ],
      relatedPublications: [],
      abstract:
        "A 6-month trial of ketogenic diet in 45 patients with drug-resistant epilepsy showed no significant reduction in seizure frequency despite achieving therapeutic ketosis.",
      findings: [
        "No reduction in seizure frequency compared to baseline",
        "Therapeutic ketosis confirmed (β-hydroxybutyrate >2 mM)",
        "High dropout rate due to diet difficulty (40%)",
        "Some patients reported improved quality of life measures",
      ],
      tags: ["Epilepsy", "Nutrition", "Clinical trial", "Neurology"],
      detailedMethods: [
        {
          name: "EEG Monitoring",
          description:
            "24-hour ambulatory EEG was performed at baseline, 3 months, and 6 months to quantify seizure activity and characterize epileptiform discharges. Video-EEG monitoring was used to confirm clinical seizures.",
        },
        {
          name: "Ketone Body Measurement",
          description:
            "Blood β-hydroxybutyrate levels were measured weekly using a handheld ketone meter. Urine ketones were also monitored daily by participants to ensure compliance with ketogenic diet.",
        },
        {
          name: "Seizure Diary",
          description:
            "Patients and caregivers maintained detailed seizure diaries recording frequency, duration, and type of seizures. This data was reviewed monthly by study coordinators.",
        },
        {
          name: "Dietary Analysis",
          description:
            "Three-day food records were collected monthly and analyzed by registered dietitians to calculate macronutrient ratios and ensure adherence to the 4:1 ketogenic diet protocol.",
        },
      ],
    },
    "6": {
      title: "Oxytocin Nasal Spray Shows No Effect on Social Cognition in Autism Spectrum Disorder",
      authors: [{ id: "lisa-patel", name: "Lisa Patel" }],
      institution: "Oxford University",
      date: "October 22, 2023",
      replicationAttempts: 3,
      organisms: ["Homo sapiens"],
      methods: ["Behavioral Assessment", "Eye Tracking", "fMRI", "Salivary Oxytocin ELISA"],
      license: "CC-BY-NC-SA",
      impact: [],
      relatedPublications: [],
      abstract:
        "Despite successful elevation of salivary oxytocin levels, intranasal oxytocin administration showed no improvements in social cognition tasks or brain activation patterns in adolescents with autism spectrum disorder.",
      findings: [
        "No changes in social responsiveness scale scores",
        "Eye tracking showed no increase in face-directed gaze",
        "fMRI revealed no changes in amygdala or fusiform gyrus activity",
        "Salivary oxytocin levels increased 3-fold as expected",
      ],
      tags: ["Autism", "Social cognition", "Neuroscience", "Clinical trial"],
      detailedMethods: [
        {
          name: "Behavioral Assessment",
          description:
            "Social Responsiveness Scale (SRS-2) and Autism Diagnostic Observation Schedule (ADOS-2) were administered at baseline and after 8 weeks of treatment. Assessments were conducted by trained clinicians blind to treatment assignment.",
        },
        {
          name: "Eye Tracking",
          description:
            "Participants viewed social scenes while eye movements were recorded using a remote eye tracker at 60 Hz. Areas of interest were defined around faces, eyes, and background regions for analysis.",
        },
        {
          name: "fMRI Protocol",
          description:
            "Functional MRI was performed during social cognition tasks including emotional face processing and theory of mind paradigms. Blood oxygen level-dependent (BOLD) signal was analyzed focusing on amygdala, fusiform gyrus, and superior temporal sulcus.",
        },
        {
          name: "Salivary Oxytocin ELISA",
          description:
            "Saliva samples were collected 30 minutes after nasal spray administration. Oxytocin concentrations were measured using a commercially available ELISA kit with sensitivity of 5 pg/mL.",
        },
      ],
    },
  }

  const dataset = datasets[params.id as keyof typeof datasets]

  if (!dataset) {
    return <div>Dataset not found</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              href="/browse"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
            >
              ← Back to Browse
            </Link>
          </div>

          {/* Header */}
          <div className="bg-card rounded-lg p-6 mb-6 border">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{dataset.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>
                      {dataset.authors.map((author: any, idx: number) => (
                        <span key={idx}>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link
                                  href={`/researcher/${author.id}`}
                                  className="hover:text-foreground hover:underline cursor-help"
                                >
                                  {author.name}
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Demo profile - not a real person</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          {idx < dataset.authors.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Published: {dataset.date}</span>
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="inline-flex items-center gap-1 text-sm text-muted-foreground cursor-help border rounded-md px-3 py-1">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">{licenseInfo[dataset.license].name}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-sm">{licenseInfo[dataset.license].description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs Navigation */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="abstract">Abstract</TabsTrigger>
                  <TabsTrigger value="data">Data Files</TabsTrigger>
                  <TabsTrigger value="methods">Methods</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                </TabsList>

                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* Impact Metrics */}
                    {dataset.impact && dataset.impact.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-spin-orange" />
                            Impact Metrics
                          </CardTitle>
                          <CardDescription>Community-reported usage of this negative data</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {dataset.impact.map((item: any, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  console.log(`Clicked impact: ${item.type}`)
                                }}
                                className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-muted/50 hover:border-spin-orange/50 transition-all"
                              >
                                <span className="text-2xl font-bold text-spin-navy">{item.count}</span>
                                <span className="text-xs text-center text-muted-foreground mt-1">{item.type}</span>
                              </button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Key Findings */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Key Findings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {dataset.findings.map((finding: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="font-medium">{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Experiment Details Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Experiment Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Replication Attempts */}
                        <div>
                          <h3 className="font-semibold text-sm mb-2">Replication Attempts</h3>
                          <div className="text-2xl font-bold text-spin-coral">{dataset.replicationAttempts}</div>
                        </div>

                        <Separator />

                        {/* Organisms */}
                        <div>
                          <h3 className="font-semibold text-sm mb-2">Organisms</h3>
                          <div className="flex flex-wrap gap-2">
                            {dataset.organisms.map((organism: string, idx: number) => (
                              <Link
                                key={idx}
                                href={`/browse?organism=${encodeURIComponent(organism)}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                                  {organism}
                                </Badge>
                              </Link>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* Methods */}
                        <div>
                          <h3 className="font-semibold text-sm mb-2">Methods Used</h3>
                          <div className="flex flex-wrap gap-2">
                            {dataset.methods.map((method: string, idx: number) => (
                              <Link
                                key={idx}
                                href={`/browse?method=${encodeURIComponent(method)}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Badge className="cursor-pointer hover:opacity-80">{method}</Badge>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "abstract" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Abstract</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{dataset.abstract}</p>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "data" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Dataset Files</CardTitle>
                      <CardDescription>
                        Complete experimental data and protocols from all replication attempts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-md border">
                          <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-blue-500" />
                              <div>
                                <p className="font-medium">lifespan_data_all_attempts.csv</p>
                                <p className="text-xs text-muted-foreground">
                                  Raw lifespan measurements from 3 replication attempts
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">2.4 MB</span>
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
                                <p className="font-medium">crispr_validation_sequences.fasta</p>
                                <p className="text-xs text-muted-foreground">
                                  DNA sequences confirming successful gene editing
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">145 KB</span>
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
                                <p className="font-medium">statistical_analysis.R</p>
                                <p className="text-xs text-muted-foreground">
                                  R script with all statistical tests and visualizations
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">87 KB</span>
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
                                <p className="font-medium">detailed_protocol.pdf</p>
                                <p className="text-xs text-muted-foreground">
                                  Complete protocol including all attempted variations
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">1.8 MB</span>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-md border">
                          <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-purple-500" />
                              <div>
                                <p className="font-medium">lab_notebook_entries.pdf</p>
                                <p className="text-xs text-muted-foreground">
                                  Scanned lab notebook pages documenting all attempts
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">5.2 MB</span>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full mt-4 bg-spin-navy hover:bg-spin-navy/90">
                        <Download className="mr-2 h-4 w-4" />
                        Download Complete Dataset (9.6 MB)
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "methods" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Research Methods</CardTitle>
                      <CardDescription>Detailed protocols and methodologies used in this study</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {dataset.detailedMethods?.map((method: { name: string; description: string }, index: number) => (
                        <div key={index}>
                          <h3 className="font-semibold text-lg mb-2">{method.name}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{method.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {activeTab === "discussion" && (
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
                                Thank you for publishing this negative result! We were planning to use this approach in
                                our lab. Did you try using different Cas9 expression systems or delivery methods?
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
                              <AvatarFallback>JS</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Dr. Jane Smith</span>
                                <Badge variant="outline" className="text-xs">
                                  Author
                                </Badge>
                                <span className="text-xs text-muted-foreground">1 day ago</span>
                              </div>
                              <p className="text-sm mt-1">
                                Yes, we tried both plasmid-based and ribonucleoprotein (RNP) delivery methods. Both
                                confirmed successful gene editing but neither produced the phenotype. I'd recommend
                                considering alternative targets or verifying the original study's strain information
                                before proceeding.
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
                                We had similar issues trying to replicate this finding last year. Your documentation
                                will save other labs significant time and resources. Have you contacted the original
                                authors?
                              </p>
                              <div className="flex items-center gap-4 mt-2">
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                  <span className="text-xs">15</span>
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
                )}
              </Tabs>
            </div>

            <div className="space-y-6">
              {/* Authors */}
              <Card>
                <CardHeader>
                  <CardTitle>Authors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dataset.authors.map((author: any, index: number) => (
                    <div className="flex items-center gap-3" key={index}>
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>
                          {author.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Link
                          href={`/researcher/${author.id}`}
                          className="font-medium hover:text-spin-navy hover:underline"
                        >
                          {author.name}
                        </Link>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Dataset Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Dataset Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Published</p>
                      <p className="text-xs text-muted-foreground">{dataset.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <BookmarkCheck className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Saves</p>
                      <p className="text-xs text-muted-foreground">127</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Downloads</p>
                      <p className="text-xs text-muted-foreground">89</p>
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

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {dataset.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Related Publications */}
              {dataset.relatedPublications && dataset.relatedPublications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Related Publications</CardTitle>
                    <CardDescription>Journal articles that reference or build upon this dataset</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dataset.relatedPublications.map((pub: any, idx: number) => (
                        <div key={idx} className="border-l-2 border-spin-coral pl-4">
                          <h4 className="font-semibold text-base mb-1">{pub.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            <span className="italic">{pub.journal}</span> ({pub.year})
                          </p>
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-spin-coral hover:underline inline-flex items-center gap-1"
                          >
                            <span>DOI: {pub.doi}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Related Datasets */}
              <Card>
                <CardHeader>
                  <CardTitle>Related Datasets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Link href="#" className="text-sm font-medium hover:underline">
                      Null Result: RNAi Knockdown of age-1 in Multiple C. elegans Backgrounds
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">By Dr. Sarah Chen • 32 saves</p>
                  </div>

                  <div>
                    <Link href="#" className="text-sm font-medium hover:underline">
                      Failed Replication: Heat Shock Protein Expression in Aging Worms
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">By Dr. Robert Williams • 45 saves</p>
                  </div>

                  <div>
                    <Link href="#" className="text-sm font-medium hover:underline">
                      Optimization Dead End: Bacterial RNAi Feeding in C. elegans
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">By Dr. Anna Petrov • 28 saves</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

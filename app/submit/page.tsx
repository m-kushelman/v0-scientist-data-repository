"use client"

import { useState } from "react"
import Link from "next/link"
import { Upload, Plus, Trash2, Save, Send, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function SubmitPage() {
  const [tags, setTags] = useState<string[]>(["genomics", "climate-change"])
  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-spin-navy hover:text-spin-orange mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-2">Submit Research Data</h1>
        <p className="text-muted-foreground">Share your scientific findings with the research community</p>
      </div>

      <Tabs defaultValue="basic-info">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic-info">Basic Information</TabsTrigger>
          <TabsTrigger value="data-methods">Data & Methods</TabsTrigger>
          <TabsTrigger value="preview">Preview & Submit</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Provide general information about your research</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Genomic Analysis of Marine Microbiomes in Changing Ocean Environments"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Provide a brief description of your research..." rows={4} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="field">Field of Research</Label>
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
                  <Label htmlFor="subfield">Subfield</Label>
                  <Input id="subfield" placeholder="e.g., Marine Biology, Genomics" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-1 rounded-full hover:bg-muted p-1">
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Remove {tag} tag</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addTag} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="authors">Co-authors</Label>
                <Input id="authors" placeholder="Enter co-author names and institutions" />
                <p className="text-xs text-muted-foreground">
                  Separate multiple authors with commas. Format: Name (Institution)
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save Draft</Button>
              <Button className="bg-spin-navy hover:bg-spin-navy/90">Continue to Data & Methods</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="data-methods" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Data & Methods</CardTitle>
              <CardDescription>Upload your data files and describe your research methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Data Files</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2">Drag and drop your data files here, or click to browse</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports CSV, JSON, Excel, ZIP, and other common formats (max 500MB)
                  </p>
                  <Button variant="outline" className="mt-4">
                    Browse Files
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="methods">Research Methods</Label>
                <Textarea id="methods" placeholder="Describe your research methods in detail..." rows={6} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment">Equipment & Tools Used</Label>
                <Textarea
                  id="equipment"
                  placeholder="List the equipment, software, and tools used in your research..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="limitations">Limitations & Considerations</Label>
                <Textarea
                  id="limitations"
                  placeholder="Describe any limitations or special considerations for your data..."
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <div className="space-x-2">
                <Button variant="outline">Back</Button>
                <Button className="bg-spin-navy hover:bg-spin-navy/90">Continue to Preview</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview & Submit</CardTitle>
              <CardDescription>Review your submission before publishing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold">
                    Genomic Analysis of Marine Microbiomes in Changing Ocean Environments
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    By Dr. Elena Rodriguez, Marine Biology Institute • Draft
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">genomics</Badge>
                  <Badge variant="outline">climate-change</Badge>
                </div>

                <div>
                  <h4 className="font-medium">Description</h4>
                  <p className="mt-1">
                    A comprehensive genomic analysis of marine microbiomes collected from various ocean depths and
                    locations, examining how these communities respond to changing ocean temperatures, acidification,
                    and other environmental factors.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Methods</h4>
                  <p className="mt-1">
                    Samples were collected using standard oceanographic techniques from 15 locations across the Pacific
                    Ocean at varying depths. DNA extraction was performed using... [Preview of methods section]
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Data Files</h4>
                  <ul className="mt-1 space-y-1">
                    <li className="flex items-center text-sm">
                      <div className="w-4 h-4 mr-2 bg-blue-100 rounded flex items-center justify-center text-blue-700">
                        <span className="text-xs">📊</span>
                      </div>
                      microbiome_data.csv (2.3MB)
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="w-4 h-4 mr-2 bg-green-100 rounded flex items-center justify-center text-green-700">
                        <span className="text-xs">📄</span>
                      </div>
                      methodology_details.pdf (1.1MB)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visibility">Visibility</Label>
                <Select defaultValue="public">
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Visible to everyone</SelectItem>
                    <SelectItem value="restricted">Restricted - Visible to verified researchers</SelectItem>
                    <SelectItem value="private">Private - Visible only to collaborators</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="license">License</Label>
                <Select defaultValue="cc-by">
                  <SelectTrigger>
                    <SelectValue placeholder="Select license" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cc-by">CC BY - Attribution</SelectItem>
                    <SelectItem value="cc-by-sa">CC BY-SA - Attribution-ShareAlike</SelectItem>
                    <SelectItem value="cc-by-nc">CC BY-NC - Attribution-NonCommercial</SelectItem>
                    <SelectItem value="cc-0">CC0 - Public Domain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <div className="space-x-2">
                <Button variant="outline">Back</Button>
                <Button className="bg-spin-navy hover:bg-spin-navy/90">
                  <Send className="mr-2 h-4 w-4" />
                  Publish
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

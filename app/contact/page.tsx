import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-page-gradient">
      <SiteHeader />

      <main className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <Link
            href="/search"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-spin-navy transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Link>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-spin-navy">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Get in touch with the Parallax team
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-spin-navy flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="text-base leading-relaxed space-y-4">
              <p>
                For general inquiries, feedback, or support, please reach out to us at:
              </p>
              <p>
                <a
                  href="mailto:contact@parallax.org"
                  className="text-spin-orange hover:underline font-medium"
                >
                  contact@parallax.org
                </a>
              </p>
              <p className="text-muted-foreground">
                We typically respond within 1–2 business days. Thank you for your interest in Parallax.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
            <h1 className="text-4xl font-bold tracking-tight text-spin-navy">Terms of Service</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-spin-navy">Terms Under Development</CardTitle>
            </CardHeader>
            <CardContent className="text-base leading-relaxed space-y-4">
              <p>
                We&apos;re continually updating our terms of service. Please check back soon for our full terms and
                conditions.
              </p>
              <p className="text-muted-foreground">
                In the meantime, if you have any questions, please reach out through our{" "}
                <Link href="/contact" className="text-spin-orange hover:underline">
                  Contact
                </Link>{" "}
                page.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

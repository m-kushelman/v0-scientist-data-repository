import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-spin-sand/30">
      <SiteHeader />

      <main className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-spin-navy">About Parallax</h1>
            <p className="text-lg text-muted-foreground">
              Sharing unpublished scientific data to advance research through transparency
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-spin-navy">What is the purpose of Parallax?</CardTitle>
              </CardHeader>
              <CardContent className="text-base leading-relaxed space-y-4">
                <p>
                  Research estimates that over 50% of research performed in the laboratory settings goes unpublished.
                  Our anecdotal evidence brings this number closer to 80%. This is not in any way indicative of the
                  talent of the researchers, or the quality of their science. By nature, when dealing with novel
                  phenomena, we can't predict where the discovery will lead us, and often end up with results that are
                  opposite to our hypothesis. A novel drug may not have worked in the way we expected, a protein
                  expression may be unsuccessful despite our best efforts in optimization, a gene may not perform a
                  function we were interested in — or it may not even perform observable function at all, which is
                  something we discover only after months of experimentation.
                </p>
                <p>
                  While we often deem such data "negative", in reality this data is just as important to expanding the
                  collective scientific knowledge of humanity as any "positive result". On a practical level, every
                  failure informs our next step. While planning a project or an experiment, we often refer to published
                  literature to help us understand if the approach has been tried before. <strong>Parallax</strong> aims to
                  expand this body of public data to include products of experiments we often deem "unsuccessful", so
                  that instead of pursuing the direction that someone else has already explored, a researcher can
                  instead put their time and effort into a truly novel project. Or, perhaps, the result that was
                  "negative" for one person is intriguing for another — that's how science moves forward!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-spin-navy">
                  How is Parallax different from a journal or pre-print repository?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base leading-relaxed space-y-4">
                <p>
                  The notion that "negative" data is beneficial for the scientific community and should be more visible
                  is not new, and has been a topic of discussion for decades. There have been many attempts to create
                  journals of negative results, both general and discipline-specific, but the track record has been very
                  modest — most of those journals close within several years. We think the issue comes from the format
                  of paper itself. Scientific papers are not just displays of data, they are also comprehensive reviews
                  and intricate analysis — and while fundamental form of dialogue between the scientists for decades, it
                  also makes them lengthy and often hard to approach.
                </p>
                <p>
                  We decreased this barrier to make data accessible faster and easier. For the researcher submitting
                  their results, only dataset, short description of results, and appropriate tags are required. And we
                  want to make sure you get credited for your hard work, which is why each data entry on{" "}
                  <strong>Parallax</strong> gets assigned a unique DOI, which can be used in future publications, grant
                  applications, or even your CV. For the researcher looking for data, we ensured that{" "}
                  <strong>Parallax</strong> highly searchable by any parameters: by method, by organism, by keyword. With{" "}
                  <strong>Parallax</strong>, you are not searching for a paper, you are searching for experiment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-spin-navy">What kind of data is Parallax for?</CardTitle>
              </CardHeader>
              <CardContent className="text-base leading-relaxed space-y-4">
                <p>
                  We are open to all formats of data — excel datasets, sequences, scripts, structures,{" "}
                  <em>et cetera</em>, <em>et cetera</em>! Our only requirement is that the data is unpublished, meaning
                  it does not appear in a journal publication or pre-print. If you plan on using the data for further
                  publication (we know how your view of the project can change at any moment!), you can remove the data
                  files, and link the publication instead. This means that your project page will remain up, but instead
                  of your dataset file, reader can review your publication.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-spin-navy">Does Spin own my data now?</CardTitle>
              </CardHeader>
              <CardContent className="text-base leading-relaxed space-y-4">
                <p>
                  The researchers and their institutions retain the ownership of all data released through{" "}
                  <strong>Parallax</strong>. Researchers can select from different copyright options when submitting the
                  data, ranging from CC0 to CC BY-NC-SA. Choose a level of openness most appropriate for your data, and
                  most importantly, the one you're comfortable with!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-spin-navy">Meet the Co-Founders</CardTitle>
              </CardHeader>
              <CardContent className="text-base leading-relaxed space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-spin-navy">Mara Kushelman, M.S.</h3>
                  <p>
                    Mara Kushelman, M.S. is a Ph.D. student in the Microbiology Department at Yale University, where her
                    research focuses on yellow fever mosquito, the viruses it carries, such as dengue and Zika, and the
                    novel ways we can fight against its deadly impact on the global health. She has been a member of
                    scientific academic community for the past 9 years, and has observed first-hand the effects of
                    unpublished experimental effort on the progress of science as a whole and individual career
                    development for researchers.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-spin-navy">Ananya Krishna</h3>
                  <p>
                    Ananya Krishna is a senior at Yale University studying Applied Mathematics and Machine Learning,
                    where her work lies at the intersection of AI, biology, and space. Her research focuses on applying
                    generative and interpretable machine learning to biological systems, and adversarially jailbreaking
                    predictive models. She has conducted research across academia and industry, and has also held
                    leadership and venture roles supporting early-stage technology and science-driven startups. Through
                    these experiences, she has seen firsthand how research culture, incentives, and translation shape
                    both scientific progress and the ability of new ideas to move from lab to impact.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

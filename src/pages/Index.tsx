import BrandHeader from "@/components/BrandHeader";
import Hero from "@/components/sections/Hero";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI Career Coach – Resume, Interview, Cover Letters</title>
        <meta name="description" content="Optimize your resume, practice interviews, and generate tailored cover letters with an AI career coach." />
        <link rel="canonical" href={window.location.origin + "/"} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {"@type":"Question","name":"How does the AI analyze my resume?","acceptedAnswer":{"@type":"Answer","text":"It identifies skill gaps, keyword alignment, and offers actionable improvements."}},
            {"@type":"Question","name":"Can it generate a cover letter?","acceptedAnswer":{"@type":"Answer","text":"Yes, it creates a personalized cover letter based on your resume and job description."}}
          ]
        })}</script>
      </Helmet>
      <BrandHeader />
      <main>
        <section className="bg-gradient-to-b from-[hsl(var(--surface))] to-background">
          <Hero />
        </section>
        <section aria-labelledby="features-title" className="container mx-auto py-12 md:py-16">
          <h2 id="features-title" className="mb-8 text-center text-2xl font-semibold">Everything you need to land the interview</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-lg border bg-card p-6 shadow-sm transition-transform hover:-translate-y-0.5">
              <h3 className="mb-2 font-medium">Resume & JD Analysis</h3>
              <p className="text-sm text-muted-foreground">Get keyword and skills alignment insights with clear, actionable steps.</p>
            </article>
            <article className="rounded-lg border bg-card p-6 shadow-sm transition-transform hover:-translate-y-0.5">
              <h3 className="mb-2 font-medium">Interview Response Review</h3>
              <p className="text-sm text-muted-foreground">Improve clarity, relevance, and confidence. Practice with targeted prompts.</p>
            </article>
            <article className="rounded-lg border bg-card p-6 shadow-sm transition-transform hover:-translate-y-0.5">
              <h3 className="mb-2 font-medium">Tailored Cover Letters</h3>
              <p className="text-sm text-muted-foreground">Generate polished letters that highlight your strengths for the role.</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;

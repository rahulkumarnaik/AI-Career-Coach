import { useState } from "react";
import { Helmet } from "react-helmet-async";
import BrandHeader from "@/components/BrandHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { invokeFunction } from "@/lib/edge-functions";
import { incrementCoverLetters } from "@/lib/metrics";

const CoverLetter = () => {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [company, setCompany] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const onGenerate = async () => {
    if (!resume || !job) {
      toast({ title: "Missing info", description: "Please paste both resume and job description." });
      return;
    }
    setLoading(true);
    setResult(null);
    const { data, error } = await invokeFunction<{ text: string }>("gemini-coach", { mode: "cover_letter", resume, job, company, tone });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message });
      return;
    }
    setResult(data?.text ?? "No response");
    incrementCoverLetters();
  };

  const copy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      toast({ title: "Copied", description: "Cover letter copied to clipboard." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cover Letter Generator – AI Career Coach</title>
        <meta name="description" content="Generate a personalized cover letter based on your resume and the job description." />
        <link rel="canonical" href={window.location.origin + "/cover-letter"} />
      </Helmet>
      <BrandHeader />
      <main className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Cover Letter Generator</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Company (optional)</label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc." />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Tone</label>
                <Input value={tone} onChange={(e) => setTone(e.target.value)} placeholder="professional, friendly, confident..." />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Resume</label>
              <Textarea value={resume} onChange={(e) => setResume(e.target.value)} rows={10} placeholder="Paste your resume text..." />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Job Description</label>
              <Textarea value={job} onChange={(e) => setJob(e.target.value)} rows={10} placeholder="Paste the job description..." />
            </div>
            <div className="flex gap-3">
              <Button onClick={onGenerate} disabled={loading}>{loading ? "Generating..." : "Generate"}</Button>
              {result && <Button variant="secondary" onClick={copy}>Copy</Button>}
            </div>
            {result && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h3>Cover Letter</h3>
                <pre className="whitespace-pre-wrap rounded-md bg-muted/30 p-4 text-sm">{result}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CoverLetter;

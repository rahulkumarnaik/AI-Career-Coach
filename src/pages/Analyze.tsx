import { useState } from "react";
import { Helmet } from "react-helmet-async";
import BrandHeader from "@/components/BrandHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { invokeFunction } from "@/lib/edge-functions";
import { updateMetrics } from "@/lib/metrics";

const Analyze = () => {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const parseScore = (text: string) => {
    const m = text.match(/Score:\s*(\d{1,3})/i);
    const n = m ? parseInt(m[1], 10) : NaN;
    if (Number.isNaN(n)) return undefined;
    return Math.max(0, Math.min(100, n));
  };

  const onAnalyze = async () => {
    if (!resume || !job) {
      toast({ title: "Missing info", description: "Please paste both resume and job description." });
      return;
    }
    setLoading(true);
    setResult(null);
    const { data, error } = await invokeFunction<{ text: string }>("gemini-coach", { mode: "analyze", resume, job });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message });
      return;
    }
    const txt = data?.text ?? "No response";
    setResult(txt);
    const score = parseScore(txt);
    updateMetrics({ lastAnalyzeAt: Date.now(), ...(score !== undefined ? { resumeScore: score } : {}) });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Resume & JD Analysis – AI Career Coach</title>
        <meta name="description" content="Analyze your resume against a job description to identify skill gaps and keyword alignment." />
        <link rel="canonical" href={window.location.origin + "/analyze"} />
      </Helmet>
      <BrandHeader />
      <main className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Resume & Job Description Analysis</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Resume</label>
              <Textarea value={resume} onChange={(e) => setResume(e.target.value)} rows={10} placeholder="Paste your resume text..." />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Job Description</label>
              <Textarea value={job} onChange={(e) => setJob(e.target.value)} rows={10} placeholder="Paste the job description..." />
            </div>
            <div>
              <Button onClick={onAnalyze} disabled={loading}>{loading ? "Analyzing..." : "Analyze"}</Button>
            </div>
            {result && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h3>Recommendations</h3>
                <pre className="whitespace-pre-wrap rounded-md bg-muted/30 p-4 text-sm">{result}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analyze;

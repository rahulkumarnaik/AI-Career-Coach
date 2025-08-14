import { useState } from "react";
import { Helmet } from "react-helmet-async";
import BrandHeader from "@/components/BrandHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { invokeFunction } from "@/lib/edge-functions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Interview = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const [job, setJob] = useState("");
  const [level, setLevel] = useState<string>("mid");
  const [qLoading, setQLoading] = useState(false);
  const [qResult, setQResult] = useState<string | null>(null);

  const onReview = async () => {
    if (!answer) {
      toast({ title: "Missing answer", description: "Paste your response to get feedback." });
      return;
    }
    setLoading(true);
    setResult(null);
    const { data, error } = await invokeFunction<{ text: string }>("gemini-coach", { mode: "interview_review", question, answer });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message });
      return;
    }
    setResult(data?.text ?? "No response");
  };

  const onGenerateQuestions = async () => {
    if (!job) {
      toast({ title: "Missing job description", description: "Paste a job description to generate questions." });
      return;
    }
    setQLoading(true);
    setQResult(null);
    const { data, error } = await invokeFunction<{ text: string }>("gemini-coach", { mode: "interview_questions", job, level });
    setQLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message });
      return;
    }
    setQResult(data?.text ?? "No response");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Interview Coach – AI Career Coach</title>
        <meta name="description" content="Get feedback on answers and generate role-specific interview questions by level." />
        <link rel="canonical" href={window.location.origin + "/interview"} />
      </Helmet>
      <BrandHeader />
      <main className="container mx-auto py-10 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Generate Interview Questions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Job Description</label>
              <Textarea value={job} onChange={(e) => setJob(e.target.value)} rows={8} placeholder="Paste the job description..." />
            </div>
            <div className="grid gap-2 max-w-xs">
              <label className="text-sm font-medium">Level</label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="mid">Mid</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button onClick={onGenerateQuestions} disabled={qLoading}>{qLoading ? "Generating..." : "Generate Questions"}</Button>
            </div>
            {qResult && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h3>Questions</h3>
                <pre className="whitespace-pre-wrap rounded-md bg-muted/30 p-4 text-sm">{qResult}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interview Response Review</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Interview Question (optional)</label>
              <Textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={4} placeholder="Paste the question if you have it..." />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Your Answer</label>
              <Textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={10} placeholder="Paste your answer for review..." />
            </div>
            <div>
              <Button onClick={onReview} disabled={loading}>{loading ? "Reviewing..." : "Get Feedback"}</Button>
            </div>
            {result && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h3>Feedback</h3>
                <pre className="whitespace-pre-wrap rounded-md bg-muted/30 p-4 text-sm">{result}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Interview;

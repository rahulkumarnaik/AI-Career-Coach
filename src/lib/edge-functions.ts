import { callGeminiAI } from './gemini';

interface AnalyzeBody {
  mode: "analyze" | "interview_review" | "cover_letter" | "interview_questions";
  resume?: string;
  job?: string;
  question?: string;
  answer?: string;
  company?: string;
  tone?: string;
  level?: string;
}

export async function invokeFunction<T = unknown>(name: string, body: unknown): Promise<{ data?: T; error?: { message: string } }> {
  // Direct Gemini AI integration replacing Supabase edge functions
  if (name === 'gemini-coach') {
    const result = await callGeminiAI(body as AnalyzeBody);
    return result as { data?: T; error?: { message: string } };
  }
  
  return { error: { message: `Function ${name} not found` } };
}

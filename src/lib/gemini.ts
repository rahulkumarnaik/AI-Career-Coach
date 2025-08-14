import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "your_new_gemini_api_key_here";

// Validate API key
if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_new_gemini_api_key_here" || GEMINI_API_KEY === "your_actual_gemini_api_key_here") {
  console.error('⚠️ Gemini API key is not configured properly. Please set VITE_GEMINI_API_KEY in your .env.local file.');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

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

export async function callGeminiAI(body: AnalyzeBody): Promise<{ data?: { text: string }; error?: { message: string } }> {
  // Check if API key is properly configured
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_new_gemini_api_key_here" || GEMINI_API_KEY === "your_actual_gemini_api_key_here") {
    return {
      error: {
        message: "🔑 API key not configured. Please add your Gemini API key to the .env.local file. Get your API key from: https://aistudio.google.com/app/apikey"
      }
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = buildPrompt(body);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return { data: { text } };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Gemini API error';
    
    // Provide more specific error messages for common issues
    if (errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('invalid API key')) {
      return {
        error: {
          message: "🚫 Invalid API key. Please check your Gemini API key in the .env.local file. Get a new key from: https://aistudio.google.com/app/apikey"
        }
      };
    }
    
    if (errorMessage.includes('quota') || errorMessage.includes('QUOTA_EXCEEDED')) {
      return {
        error: {
          message: "📊 API quota exceeded. Please check your Gemini API usage limits or try again later."
        }
      };
    }
    
    return { error: { message: `❌ ${errorMessage}` } };
  }
}

function buildPrompt(b: AnalyzeBody): string {
  switch (b.mode) {
    case "analyze":
      return `You are an expert career coach. Analyze the following resume against the job description. Output sections: Summary, Keyword Match (top keywords found/missing), Skill Gaps, Bullet Improvements (rewrite 3 bullets with measurable impact), ATS Tips.\nAt the end, add a line exactly as: Score: NN (where NN is an integer 0-100).\nResume:\n${b.resume}\n\nJob Description:\n${b.job}`;
    case "interview_review":
      return `You are an interview coach. Review the candidate's answer${b.question ? ` to: ${b.question}` : ""}. Provide: Strengths, Specific Improvements, Suggested Structure (STAR), and a Polished Version.\nAnswer:\n${b.answer}`;
    case "cover_letter":
      return `Write a concise, tailored cover letter in a ${b.tone ?? "professional"} tone for ${b.company || "the company"}. Base it on the resume and job description. Keep under 350 words. Use clear paragraphs and a strong closing.\nResume:\n${b.resume}\n\nJob Description:\n${b.job}`;
    case "interview_questions":
      return `You are a hiring manager creating interview questions. Based on the following job description and seniority level (${b.level ?? "mid"}), generate 8 comprehensive interview questions balanced across categories: Behavioral, Technical, Role-specific, and Culture/Collaboration. Tailor difficulty to the level. Output as a clear bulleted list grouped by category.\nJob Description:\n${b.job}`;
    default:
      return "";
  }
}

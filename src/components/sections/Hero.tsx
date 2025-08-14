import heroImg from "@/assets/hero-career-ai.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Hero = () => {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div ref={glowRef} className="pointer-events-none absolute inset-0 [background:radial-gradient(600px_circle_at_var(--mx,50%)_var(--my,50%),hsl(var(--brand)/0.15),transparent_60%)]" />
      <div className="container mx-auto grid gap-10 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col items-start justify-center gap-6">
          <h1 id="hero-title" className="text-4xl font-bold leading-tight md:text-5xl">
            Your Generative AI Career Coach
          </h1>
          <p className="text-muted-foreground text-lg">
            Optimize your resume, sharpen interview answers, and generate tailored cover letters powered by state-of-the-art AI.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/analyze"><Button>Analyze Resume</Button></Link>
            <Link to="/interview"><Button variant="secondary">Interview Coach</Button></Link>
            <Link to="/cover-letter"><Button variant="outline">Cover Letter</Button></Link>
          </div>
        </div>
        <div className="relative">
          <img src={heroImg} alt="AI career coach interface with resume, job description, and interview tips" loading="lazy" className="w-full rounded-lg shadow-[var(--shadow-elegant)]" />
          <div className="absolute -inset-2 -z-10 rounded-xl bg-gradient-to-tr from-[hsl(var(--brand)/0.2)] to-[hsl(var(--brand-glow)/0.2)] blur-2xl" aria-hidden />
        </div>
      </div>
    </section>
  );
};

export default Hero;

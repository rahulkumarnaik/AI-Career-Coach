import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import BrandHeader from "@/components/BrandHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard"); // Redirect logged-in users to dashboard
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const submit = async () => {
    setLoading(true);
    try {
      if (isSignUp) {
        // This function creates a new user with email and password
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: "Account created successfully!" });
      } else {
        // This function signs in an existing user
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Signed in successfully!" });
      }
      navigate("/"); // Redirect to homepage after successful auth
    } catch (error: unknown) {
      toast({
        title: "Authentication failed",
        description: error instanceof Error ? error.message : 'Authentication failed',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({ title: "Signed in with Google successfully!" });
      navigate("/"); // Redirect to homepage after successful auth
    } catch (error: unknown) {
      toast({
        title: "Google sign-in failed",
        description: error instanceof Error ? error.message : 'Google authentication failed',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sign in – AI Career Coach</title>
        <meta name="description" content="Secure authentication for your AI Career Coach workspace." />
        <link rel="canonical" href={window.location.origin + "/auth"} />
      </Helmet>
      <BrandHeader />
      <main className="container mx-auto flex max-w-md flex-col gap-6 py-10">
        <Card>
          <CardHeader>
            <CardTitle>{isSignUp ? "Create an account" : "Welcome back"}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* Google Sign-in Button */}
            <Button 
              variant="outline" 
              className="w-full h-10 flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={signInWithGoogle}
              disabled={loading}
            >
              <svg 
                className="h-4 w-4" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fill="#4285F4" 
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path 
                  fill="#34A853" 
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path 
                  fill="#FBBC05" 
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path 
                  fill="#EA4335" 
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium">
                {loading ? "Please wait..." : `Continue with Google`}
              </span>
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={submit} disabled={loading}>{loading ? "Please wait..." : (isSignUp ? "Sign up" : "Sign in")}</Button>
              <Button variant="ghost" onClick={() => setIsSignUp((v) => !v)}>
                {isSignUp ? "Have an account? Sign in" : "New here? Create account"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Auth;
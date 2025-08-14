import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import BrandHeader from "@/components/BrandHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useMetrics } from "@/hooks/use-local-storage";
import { type Metrics } from "@/lib/metrics";
import { Link } from "react-router-dom";
import {
  FileText, 
  Target, 
  TrendingUp, 
  Clock, 
  Star, 
  CheckCircle,
  Zap,
  BarChart3,
  Calendar,
  Award,
  Briefcase,
  Users,
  BookOpen,
  Activity,
  Wifi
} from "lucide-react";

const Dashboard = () => {
  const metrics = useMetrics(); // Real-time metrics hook
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const score = metrics.resumeScore ?? undefined;
  const last = metrics.lastAnalyzeAt ? new Date(metrics.lastAnalyzeAt).toLocaleString() : "—";
  const coverLetters = metrics.coverLettersCreated ?? 0;
  
  // Calculate progress metrics
  const progressToday = Math.min((coverLetters * 25) + (score ? 30 : 0), 100);
  const weeklyGoal = 5; // cover letters per week
  const weeklyProgress = Math.min((coverLetters / weeklyGoal) * 100, 100);

  // Mock activity data (in a real app, this would come from analytics)
  const recentActivity = [
    { action: "Resume analyzed", time: "2 hours ago", score: score, icon: FileText },
    { action: "Cover letter generated", time: "1 day ago", icon: Target },
    { action: "Interview questions reviewed", time: "3 days ago", icon: Users },
  ];

  const careerTips = [
    "Tailor your resume for each job application",
    "Practice behavioral interview questions",
    "Build a professional network on LinkedIn",
    "Keep learning new skills relevant to your field"
  ];

  const achievements = [
    { title: "First Analysis", description: "Completed your first resume analysis", unlocked: !!score, icon: Star },
    { title: "Cover Letter Pro", description: "Generated 5+ cover letters", unlocked: coverLetters >= 5, icon: Award },
    { title: "Consistent User", description: "Used the platform 7 days in a row", unlocked: false, icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard – AI Career Coach</title>
        <meta name="description" content="Track your career progress with personalized analytics, recent activity, and actionable insights." />
        <link rel="canonical" href={window.location.origin + "/dashboard"} />
      </Helmet>
      <BrandHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent">
              Welcome back!
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                <Wifi className="h-3 w-3 text-green-500" />
                Live data
              </Badge>
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/analyze">
              <Button variant="outline" className="gap-2 hover:shadow-elegant transition-all duration-300">
                <Zap className="h-4 w-4" />
                Quick Analyze
              </Button>
            </Link>
            <Link to="/cover-letter">
              <Button className="gap-2 bg-gradient-to-r from-brand to-brand-glow hover:shadow-glow transition-all duration-300">
                <Target className="h-4 w-4" />
                New Cover Letter
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden group hover:shadow-elegant transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resume Score</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {score !== undefined ? `${score}/100` : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Last analyzed: {last}
              </p>
              {score && (
                <div className="mt-3">
                  <Progress value={score} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-elegant transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cover Letters</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coverLetters}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total generated
              </p>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Weekly Goal</span>
                  <span>{Math.min(coverLetters, weeklyGoal)}/{weeklyGoal}</span>
                </div>
                <Progress value={weeklyProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-elegant transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressToday}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Activities completed today
              </p>
              <div className="mt-3">
                <Progress value={progressToday} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-elegant transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">
                Days active this week
              </p>
              <div className="flex gap-1 mt-3">
                {[1,2,3,4,5,6,7].map((day) => (
                  <div 
                    key={day} 
                    className={`h-2 w-2 rounded-full ${day <= 3 ? 'bg-brand' : 'bg-muted'}`} 
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-surface/50 hover:bg-surface transition-colors duration-200">
                    <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center">
                      <activity.icon className="h-4 w-4 text-brand" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    {activity.score && (
                      <Badge variant="secondary" className="text-xs">
                        Score: {activity.score}
                      </Badge>
                    )}
                  </div>
                ))}
                {recentActivity.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No recent activity</p>
                    <p className="text-sm">Start by analyzing your resume!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Career Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Career Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {careerTips.map((tip, index) => (
                  <div key={index} className="p-3 rounded-lg bg-brand/5 border border-brand/10">
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Achievements */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Link to="/analyze" className="group">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto p-4 hover:shadow-elegant transition-all duration-300">
                  <div className="h-8 w-8 rounded-lg bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                    <BarChart3 className="h-4 w-4 text-brand" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Analyze Resume</div>
                    <div className="text-xs text-muted-foreground">Get AI-powered feedback</div>
                  </div>
                </Button>
              </Link>
              
              <Link to="/interview" className="group">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto p-4 hover:shadow-elegant transition-all duration-300">
                  <div className="h-8 w-8 rounded-lg bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                    <Users className="h-4 w-4 text-brand" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Interview Prep</div>
                    <div className="text-xs text-muted-foreground">Practice with AI questions</div>
                  </div>
                </Button>
              </Link>
              
              <Link to="/cover-letter" className="group">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto p-4 hover:shadow-elegant transition-all duration-300">
                  <div className="h-8 w-8 rounded-lg bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                    <Briefcase className="h-4 w-4 text-brand" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Cover Letter</div>
                    <div className="text-xs text-muted-foreground">Generate tailored letters</div>
                  </div>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      achievement.unlocked 
                        ? 'bg-brand/5 border-brand/20 shadow-sm' 
                        : 'bg-muted/20 border-muted opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        achievement.unlocked ? 'bg-brand text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        <achievement.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{achievement.title}</div>
                        <div className="text-xs text-muted-foreground">{achievement.description}</div>
                      </div>
                      {achievement.unlocked && (
                        <CheckCircle className="h-4 w-4 text-brand" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

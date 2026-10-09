import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicNavbar } from '../components/layout/PublicNavbar';
import { PublicFooter } from '../components/layout/PublicFooter';
import { ThreeCanvas } from '../components/ui/ThreeCanvas';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  CheckSquare,
  Kanban,
  Calendar,
  BarChart3,
  Timer,
  FolderKanban,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Target,
  Clock,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Users,
} from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: CheckSquare,
      title: 'Smart Task Management',
      description: 'Prioritize by urgency, organize with custom tags, and complete tasks with smooth micro-interactions.',
    },
    {
      icon: Kanban,
      title: 'Kanban Workflow',
      description: 'Fluid drag-and-drop columns from To Do to In Progress to Completed with zero friction.',
    },
    {
      icon: Calendar,
      title: 'Calendar Planning',
      description: 'Visualize your week and month ahead. Never let an important assignment or milestone slip.',
    },
    {
      icon: BarChart3,
      title: 'Productivity Analytics',
      description: 'Data-driven insights into your work velocity, completion trends, and most effective focus days.',
    },
    {
      icon: Timer,
      title: 'Focus Mode',
      description: 'Integrated Pomodoro deep-work timer directly connected to your active priorities for deep flow.',
    },
    {
      icon: FolderKanban,
      title: 'Project Management',
      description: 'Group interconnected initiatives, calculate milestone completion, and track overall progress.',
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: 'Organize Everything',
      text: 'Consolidate assignments, career goals, and personal projects in one cohesive, beautiful digital workspace.',
    },
    {
      icon: Clock,
      title: 'Never Miss Deadlines',
      text: 'Proactive deadline indicators and calendar scheduling keep your priorities clear and on schedule.',
    },
    {
      icon: TrendingUp,
      title: 'Track Your Progress',
      text: 'Visual momentum charts, streaks, and productivity scores give immediate feedback on your achievements.',
    },
    {
      icon: Zap,
      title: 'Stay Focused',
      text: 'Eliminate cognitive overload with dedicated focus sessions, minimal distractions, and calm design.',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Tasks Organized' },
    { value: '2.5K+', label: 'Active Users' },
    { value: '95%', label: 'Task Completion' },
    { value: '24/7', label: 'Productivity' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slatebg-light dark:bg-slatebg-dark selection:bg-brand-200 selection:text-brand-900 transition-colors">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-28 md:pb-36 border-b border-brand-200/60 dark:border-brand-800/60">
        {/* Subtle ThreeUI / Canvas 3D particle mesh background */}
        <ThreeCanvas className="opacity-70 dark:opacity-40" density="medium" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          {/* Subtle React Bits inspired Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/80 dark:bg-brand-900/50 border border-brand-300 dark:border-brand-700/80 text-brand-900 dark:text-brand-200 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md animate-fade-in shadow-xs">
            <Sparkles className="w-4 h-4 text-brand-500 animate-pulse" />
            <span>TaskFlow 2.0 • The Next Generation Productivity Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-brand-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
            Plan better. Focus smarter.{' '}
            <span className="bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 bg-clip-text text-transparent">
              Get more done.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-brand-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A modern productivity workspace designed to help you organize tasks, manage projects, and build better work habits.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/register')}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto shadow-glow font-semibold"
            >
              Get Started Free
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto"
            >
              Explore Demo Workspace
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-brand-500 dark:text-brand-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant LocalStorage sync
            </span>
            <span className="flex items-center gap-1.5 hidden sm:inline-flex">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Free portfolio demo
            </span>
          </div>

          {/* Productivity Dashboard Preview Hero Graphic */}
          <div className="mt-16 sm:mt-20 max-w-5xl mx-auto relative rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-brand-200/50 via-brand-100/20 to-transparent dark:from-brand-800/40 dark:to-transparent border border-brand-300/60 dark:border-brand-700/60 shadow-2xl backdrop-blur-sm">
            <div className="rounded-2xl bg-white dark:bg-slatebg-darkcard border border-brand-200 dark:border-brand-800 overflow-hidden shadow-card text-left p-4 sm:p-6">
              {/* Fake Mock Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-100 dark:border-brand-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-xs font-mono text-brand-400">taskflow.app/dashboard</span>
                </div>
                <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-100 text-brand-800 dark:bg-brand-900/60 dark:text-brand-200">
                  Live Preview
                </div>
              </div>

              {/* Sample Dashboard Content Preview */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-brand-50/70 dark:bg-slatebg-dark/60 border border-brand-200/60 dark:border-brand-800/60">
                  <span className="text-xs text-brand-500 dark:text-brand-400">Active Tasks</span>
                  <div className="text-2xl font-bold text-brand-900 dark:text-white mt-1">12 Tasks</div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">↑ 4 completed today</div>
                </div>
                <div className="p-4 rounded-xl bg-brand-50/70 dark:bg-slatebg-dark/60 border border-brand-200/60 dark:border-brand-800/60">
                  <span className="text-xs text-brand-500 dark:text-brand-400">Productivity Rate</span>
                  <div className="text-2xl font-bold text-brand-900 dark:text-white mt-1">94%</div>
                  <div className="text-[11px] text-brand-500 mt-1">Top 5% focused habit</div>
                </div>
                <div className="p-4 rounded-xl bg-brand-50/70 dark:bg-slatebg-dark/60 border border-brand-200/60 dark:border-brand-800/60">
                  <span className="text-xs text-brand-500 dark:text-brand-400">Focus Hours</span>
                  <div className="text-2xl font-bold text-brand-900 dark:text-white mt-1">38.5 hrs</div>
                  <div className="text-[11px] text-brand-500 mt-1">This current week</div>
                </div>
                <div className="p-4 rounded-xl bg-brand-50/70 dark:bg-slatebg-dark/60 border border-brand-200/60 dark:border-brand-800/60">
                  <span className="text-xs text-brand-500 dark:text-brand-400">Projects Progress</span>
                  <div className="text-2xl font-bold text-brand-900 dark:text-white mt-1">4 Active</div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">On schedule</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-500 dark:text-brand-400">
            Engineered For High Performers
          </h2>
          <h3 className="mt-2 text-3xl sm:text-4xl font-extrabold text-brand-900 dark:text-white">
            Everything you need to orchestrate your day
          </h3>
          <p className="mt-3 text-sm sm:text-base text-brand-600 dark:text-slate-300">
            A harmonious suite of productivity tools designed with restraint, speed, and elegance.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                hover
                className="p-6 border border-brand-200/80 dark:border-brand-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/60 border border-brand-200 dark:border-brand-700/60 flex items-center justify-center text-brand-500 dark:text-brand-300 mb-5 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-900 dark:text-white">
                    {feature.title}
                  </h4>
                  <p className="mt-2 text-sm text-brand-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-brand-100 dark:border-brand-800/60 flex items-center gap-1.5 text-xs font-semibold text-brand-500 dark:text-brand-400">
                  <span>Explore feature</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Productivity Section */}
      <section id="productivity" className="py-20 bg-brand-50/50 dark:bg-brand-950/20 border-y border-brand-200/60 dark:border-brand-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-500 dark:text-brand-400">
                Visual Productivity
              </span>
              <h3 className="mt-2 text-3xl sm:text-4xl font-extrabold text-brand-900 dark:text-white leading-tight">
                Turn overwhelming to-do lists into calm, structured progress.
              </h3>
              <p className="mt-4 text-base text-brand-600 dark:text-slate-300 leading-relaxed">
                TaskFlow replaces chaotic sticky notes and clunky spreadsheets with an intuitive workspace. Shift tasks seamlessly from Kanban boards to Calendar views without breaking your mental flow.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-brand-900 dark:text-white">
                      Zero Configuration Required
                    </h5>
                    <p className="text-xs text-brand-600 dark:text-slate-400 mt-0.5">
                      Starts instantly with seed demo data and persists automatically via client-side storage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-brand-900 dark:text-white">
                      Integrated Deep Work Timer
                    </h5>
                    <p className="text-xs text-brand-600 dark:text-slate-400 mt-0.5">
                      Pair any task directly with a 25-minute Pomodoro cycle to conquer procrastination.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button variant="primary" onClick={() => navigate('/dashboard')} icon={ArrowRight} iconPosition="right">
                  Open Live Dashboard
                </Button>
              </div>
            </div>

            {/* Visual Preview Card */}
            <div className="rounded-2xl glass-card p-6 border border-brand-200 dark:border-brand-700 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-brand-100 dark:border-brand-800">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-brand-400" />
                  <span className="text-sm font-bold text-brand-900 dark:text-white">Focus Mode Active</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 dark:bg-brand-900/60 dark:text-brand-200">
                  Session 2 of 4
                </span>
              </div>

              <div className="py-6 text-center">
                <div className="text-5xl font-mono font-bold text-brand-900 dark:text-white tracking-wider">
                  25:00
                </div>
                <p className="mt-2 text-xs text-brand-500 dark:text-brand-400">
                  Focusing on: <strong className="text-brand-800 dark:text-white">Complete React Dashboard</strong>
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-brand-50/80 dark:bg-slatebg-dark/80 border border-brand-200/60 dark:border-brand-800/60 flex items-center justify-between text-xs">
                <span className="text-brand-600 dark:text-slate-300">Daily Goal Progress</span>
                <span className="font-bold text-brand-900 dark:text-white">5 / 6 tasks completed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why TaskFlow Section */}
      <section id="why-taskflow" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-500 dark:text-brand-400">
            Why TaskFlow
          </span>
          <h3 className="mt-2 text-3xl sm:text-4xl font-extrabold text-brand-900 dark:text-white">
            Designed for calm, clarity, and continuous momentum
          </h3>
          <p className="mt-3 text-sm sm:text-base text-brand-600 dark:text-slate-300">
            No clutter. No overwhelming menus. Just high-impact tools calibrated to keep you productive.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-brand-200/80 dark:border-brand-800/80 bg-white/70 dark:bg-slatebg-darkcard/70 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/60 flex items-center justify-center text-brand-500 dark:text-brand-300 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-brand-900 dark:text-white">
                  {b.title}
                </h4>
                <p className="mt-2 text-xs text-brand-600 dark:text-slate-400 leading-relaxed">
                  {b.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Demo Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-800 text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-4xl sm:text-5xl font-extrabold text-brand-200 tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-brand-100/90 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl sm:text-5xl font-extrabold text-brand-900 dark:text-white tracking-tight">
          Ready to take control of your work?
        </h3>
        <p className="mt-4 text-base sm:text-lg text-brand-600 dark:text-slate-300 max-w-xl mx-auto">
          Join thousands of developers, researchers, and students who organize their projects with TaskFlow.
        </p>
        <div className="mt-8">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/register')}
            className="shadow-glow px-8"
          >
            Start Organizing Free
          </Button>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

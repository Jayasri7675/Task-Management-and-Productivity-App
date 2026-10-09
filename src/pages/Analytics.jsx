import React from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  Sparkles,
  Award,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export function Analytics() {
  const { tasks, projects, user } = useApp();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const productivityScore = user.productivityScore || 94;

  // Priority Breakdown
  const urgentCount = tasks.filter((t) => t.priority === 'Urgent').length;
  const highCount = tasks.filter((t) => t.priority === 'High').length;
  const mediumCount = tasks.filter((t) => t.priority === 'Medium').length;
  const lowCount = tasks.filter((t) => t.priority === 'Low').length;

  // Weekly performance breakdown mock data
  const weekData = [
    { day: 'Mon', completed: 6, goal: 8 },
    { day: 'Tue', completed: 8, goal: 8 },
    { day: 'Wed', completed: 11, goal: 8 },
    { day: 'Thu', completed: 7, goal: 8 },
    { day: 'Fri', completed: 9, goal: 8 },
    { day: 'Sat', completed: 4, goal: 6 },
    { day: 'Sun', completed: 3, goal: 6 },
  ];

  const insights = [
    {
      title: 'High Velocity Momentum',
      description: 'You completed 24% more tasks this week compared to last week.',
      icon: TrendingUp,
      color: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-950/60',
    },
    {
      title: 'Peak Productivity Day',
      description: 'Your most productive day was Wednesday with 11 logged completions.',
      icon: Zap,
      color: 'text-brand-400 bg-brand-100 dark:bg-brand-900/60',
    },
    {
      title: 'High-Priority Efficiency',
      description: 'High-priority tasks are being resolved within 28 hours on average.',
      icon: Target,
      color: 'text-brand-500 bg-brand-100 dark:bg-brand-900/40',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 dark:text-white flex items-center gap-2.5">
          <BarChart3 className="w-7 h-7 text-brand-400" /> Productivity Analytics
        </h1>
        <p className="mt-1 text-sm text-brand-600 dark:text-slate-300">
          Measure output velocity, task distribution, and habit consistency over time.
        </p>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 border border-brand-200/80 dark:border-brand-700/60">
          <span className="text-xs text-brand-500 font-semibold">Total Tasks</span>
          <div className="text-2xl font-extrabold text-brand-900 dark:text-white mt-1">
            {totalTasks}
          </div>
          <span className="text-[11px] text-brand-400 mt-1 block">In workspace</span>
        </Card>

        <Card className="p-4 border border-brand-200/80 dark:border-brand-700/60">
          <span className="text-xs text-brand-500 font-semibold">Completed</span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {completedTasks}
          </div>
          <span className="text-[11px] text-emerald-500 mt-1 block">Resolved</span>
        </Card>

        <Card className="p-4 border border-brand-200/80 dark:border-brand-700/60">
          <span className="text-xs text-brand-500 font-semibold">Pending</span>
          <div className="text-2xl font-extrabold text-brand-800 dark:text-slate-200 mt-1">
            {pendingTasks}
          </div>
          <span className="text-[11px] text-brand-500 mt-1 block">In backlog/active</span>
        </Card>

        <Card className="p-4 border border-brand-200/80 dark:border-brand-700/60">
          <span className="text-xs text-brand-500 font-semibold">Completion Rate</span>
          <div className="text-2xl font-extrabold text-brand-900 dark:text-white mt-1">
            {completionRate}%
          </div>
          <span className="text-[11px] text-emerald-500 mt-1 block">↑ 5% this month</span>
        </Card>

        <Card className="p-4 col-span-2 md:col-span-1 border border-brand-300 dark:border-brand-700/60 bg-gradient-to-br from-brand-50/70 to-brand-100/40 dark:from-brand-900/40 dark:to-slatebg-darkcard">
          <span className="text-xs text-brand-700 dark:text-brand-300 font-bold flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-brand-500" /> Productivity Score
          </span>
          <div className="text-2xl font-extrabold text-brand-900 dark:text-white mt-1">
            {productivityScore}/100
          </div>
          <span className="text-[11px] text-brand-500 mt-1 block">Top 5% bracket</span>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Weekly Output Velocity */}
        <Card className="p-5 border border-brand-200/80 dark:border-brand-700/60">
          <div className="flex items-center justify-between pb-3 border-b border-brand-100 dark:border-brand-800">
            <div>
              <h3 className="text-sm font-bold text-brand-900 dark:text-white">
                Weekly Output Velocity
              </h3>
              <p className="text-xs text-brand-500">Completions vs Daily Target</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-brand-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-brand-400" /> Done
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-brand-200 dark:bg-brand-800" /> Target
              </span>
            </div>
          </div>

          <div className="mt-8 flex items-end justify-between gap-3 h-48 pt-4">
            {weekData.map((d, idx) => {
              const compHeight = Math.round((d.completed / 12) * 100);
              const goalHeight = Math.round((d.goal / 12) * 100);

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.completed}
                  </span>
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    {/* Done Bar */}
                    <div
                      className="w-1/2 max-w-[18px] bg-gradient-to-t from-brand-500 to-brand-400 rounded-t-md transition-all duration-300 hover:brightness-110"
                      style={{ height: `${compHeight}%` }}
                    />
                    {/* Target Bar */}
                    <div
                      className="w-1/2 max-w-[18px] bg-brand-100 dark:bg-brand-900/60 rounded-t-md"
                      style={{ height: `${goalHeight}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-brand-500">{d.day}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Chart 2: Priority Distribution */}
        <Card className="p-5 border border-brand-200/80 dark:border-brand-700/60">
          <div className="pb-3 border-b border-brand-100 dark:border-brand-800">
            <h3 className="text-sm font-bold text-brand-900 dark:text-white">
              Priority Distribution
            </h3>
            <p className="text-xs text-brand-500">Breakdown of task urgency levels</p>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-rose-600 dark:text-rose-400">Urgent</span>
                <span>{urgentCount} tasks</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{ width: `${(urgentCount / Math.max(1, totalTasks)) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-600 dark:text-amber-400">High</span>
                <span>{highCount} tasks</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${(highCount / Math.max(1, totalTasks)) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-brand-600 dark:text-brand-400">Medium</span>
                <span>{mediumCount} tasks</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-brand-400 rounded-full"
                  style={{ width: `${(mediumCount / Math.max(1, totalTasks)) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-500">Low</span>
                <span>{lowCount} tasks</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-slate-400 rounded-full"
                  style={{ width: `${(lowCount / Math.max(1, totalTasks)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Chart 3 & 4: Projects Progress & Productivity Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Completion Progress */}
        <Card className="p-5 border border-brand-200/80 dark:border-brand-700/60">
          <div className="pb-3 border-b border-brand-100 dark:border-brand-800">
            <h3 className="text-sm font-bold text-brand-900 dark:text-white">
              Project Milestones
            </h3>
            <p className="text-xs text-brand-500">Progress across active initiatives</p>
          </div>

          <div className="mt-5 space-y-4">
            {projects.map((proj) => {
              const total = proj.totalTasks || 0;
              const done = proj.completedTasks || 0;
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;

              return (
                <div key={proj.id} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-brand-900 dark:text-white">
                      {proj.name}
                    </span>
                    <span className="text-brand-500">{pct}% ({done}/{total})</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-brand-100 dark:bg-brand-900/60 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: proj.color || '#88BDF2' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Productivity Insights */}
        <Card className="p-5 border border-brand-200/80 dark:border-brand-700/60">
          <div className="pb-3 border-b border-brand-100 dark:border-brand-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-brand-900 dark:text-white">
                Productivity Insights
              </h3>
              <p className="text-xs text-brand-500">AI-powered workspace telemetry</p>
            </div>
            <Sparkles className="w-4 h-4 text-brand-400" />
          </div>

          <div className="mt-5 space-y-3.5">
            {insights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-brand-100 dark:border-brand-800/80 bg-brand-50/40 dark:bg-slatebg-dark/40 flex items-start gap-3.5"
                >
                  <div className={`p-2 rounded-lg ${item.color} shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-brand-900 dark:text-white">
                      {item.title}
                    </h5>
                    <p className="text-xs text-brand-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

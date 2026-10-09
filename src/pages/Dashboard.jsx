import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TaskCard } from '../components/tasks/TaskCard';
import { EmptyState } from '../components/ui/EmptyState';
import { isToday, isPastDue, formatDate } from '../utils/helpers';
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  FolderKanban,
  Plus,
  Timer,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  Activity,
  Flame,
} from 'lucide-react';

export function Dashboard() {
  const {
    user,
    tasks,
    projects,
    openCreateTaskModal,
    openCreateProjectModal,
  } = useApp();
  const navigate = useNavigate();

  // Calculate dynamic stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const overdueTasks = tasks.filter((t) => isPastDue(t.dueDate, t.status)).length;

  const todayTasks = tasks.filter((t) => isToday(t.dueDate));
  const upcomingTasks = tasks
    .filter((t) => !isToday(t.dueDate) && !isPastDue(t.dueDate, t.status) && t.status !== 'Completed')
    .slice(0, 3);

  // Dynamic greeting based on current local hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const statsCards = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      trend: '+12% from last week',
      icon: CheckSquare,
      color: 'bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300',
    },
    {
      label: 'Completed',
      value: completedTasks,
      trend: `${Math.round((completedTasks / Math.max(1, totalTasks)) * 100)}% completion rate`,
      icon: CheckCircle2,
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      trend: 'Active in flight',
      icon: Clock,
      color: 'bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200',
    },
    {
      label: 'Overdue',
      value: overdueTasks,
      trend: overdueTasks === 0 ? 'All caught up' : 'Needs attention',
      icon: AlertTriangle,
      color: overdueTasks > 0 ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    },
  ];

  // Weekly productivity chart mock
  const weekDays = [
    { day: 'Mon', completed: 6, total: 8 },
    { day: 'Tue', completed: 8, total: 9 },
    { day: 'Wed', completed: 11, total: 12 },
    { day: 'Thu', completed: 7, total: 8 },
    { day: 'Fri', completed: 9, total: 10 },
    { day: 'Sat', completed: 4, total: 5 },
    { day: 'Sun', completed: 3, total: 4 },
  ];

  // Recent activity stream
  const recentActivity = [
    { title: 'Completed React Dashboard', time: '20 mins ago', type: 'complete' },
    { title: 'Moved "GATE Revision" to In Progress', time: '1 hour ago', type: 'move' },
    { title: 'Created project "Website Development"', time: '3 hours ago', type: 'create' },
    { title: 'Completed 25-min Pomodoro session', time: 'Yesterday', type: 'focus' },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Greeting & Date */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-500 dark:text-brand-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{todayFormatted}</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-brand-900 dark:text-white">
            {getGreeting()}, {user.name} 👋
          </h1>
          <p className="mt-1 text-sm text-brand-600 dark:text-slate-300">
            Here's what's happening with your productivity workspace today.
          </p>
        </div>

        {/* Quick Actions Header */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            icon={Timer}
            onClick={() => navigate('/focus')}
          >
            Start Focus
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={FolderKanban}
            onClick={() => openCreateProjectModal()}
          >
            New Project
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => openCreateTaskModal()}
            className="shadow-glow"
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* 4 Statistics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {statsCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card
              key={idx}
              className="p-5 border border-brand-200/80 dark:border-brand-700/60 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-600 dark:text-slate-300">
                  {card.label}
                </span>
                <div className={`p-2.5 rounded-xl ${card.color} shadow-xs`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-extrabold text-brand-900 dark:text-white tracking-tight">
                  {card.value}
                </div>
                <div className="mt-1 text-xs text-brand-500 dark:text-brand-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  <span>{card.trend}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Today's Tasks & Productivity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Today's Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-brand-900 dark:text-white">
                Today's Focus
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-800 dark:bg-brand-900/60 dark:text-brand-300">
                {todayTasks.length}
              </span>
            </div>
            <Link
              to="/tasks"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-900 dark:hover:text-white flex items-center gap-1"
            >
              View all tasks <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {todayTasks.length === 0 ? (
            <EmptyState
              title="No tasks due today"
              description="You have cleared all scheduled items for today or haven't assigned any yet."
              actionLabel="Add Task for Today"
              onAction={() =>
                openCreateTaskModal({ dueDate: new Date().toISOString().split('T')[0] })
              }
            />
          ) : (
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}

          {/* Upcoming Deadlines Widget */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-brand-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-400" /> Upcoming Deadlines
              </h3>
              <Link to="/calendar" className="text-xs text-brand-500 hover:underline">
                Open Calendar
              </Link>
            </div>
            {upcomingTasks.length === 0 ? (
              <p className="text-xs text-brand-500">No imminent deadlines this week.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {upcomingTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => navigate('/tasks')}
                    className="p-3.5 rounded-xl border border-brand-200/80 dark:border-brand-700/60 glass-card hover:border-brand-400 cursor-pointer transition-all"
                  >
                    <span className="text-[10px] font-bold text-brand-500 uppercase">
                      {formatDate(t.dueDate)}
                    </span>
                    <h5 className="mt-1 text-xs font-semibold text-brand-900 dark:text-white truncate">
                      {t.title}
                    </h5>
                    <span className="mt-2 block text-[11px] text-brand-500 truncate">
                      {t.project}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Productivity Overview Chart & Activity */}
        <div className="space-y-6">
          {/* Weekly Productivity Overview Chart */}
          <Card className="p-5 border border-brand-200/80 dark:border-brand-700/60">
            <div className="flex items-center justify-between pb-3 border-b border-brand-100 dark:border-brand-800">
              <div>
                <h3 className="text-sm font-bold text-brand-900 dark:text-white">
                  Productivity Velocity
                </h3>
                <p className="text-xs text-brand-500 dark:text-brand-400">
                  Task completions this week
                </p>
              </div>
              <div className="p-1.5 rounded-lg bg-brand-50 dark:bg-brand-900/60 text-brand-500">
                <Activity className="w-4 h-4" />
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="mt-6 flex items-end justify-between gap-2 h-36 pt-4">
              {weekDays.map((item, idx) => {
                const heightPercent = Math.round((item.completed / 12) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.completed}
                    </span>
                    <div className="w-full max-w-[28px] bg-brand-100 dark:bg-brand-900/50 rounded-t-md relative overflow-hidden h-full flex items-end">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-brand-500 to-brand-400 transition-all duration-500 group-hover:brightness-110"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-brand-500 dark:text-slate-400">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-brand-100 dark:border-brand-800 flex items-center justify-between text-xs text-brand-600 dark:text-slate-300">
              <span>Weekly Average:</span>
              <span className="font-bold text-brand-900 dark:text-white">7.2 tasks / day</span>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-5 border border-brand-200/80 dark:border-brand-700/60">
            <h3 className="text-sm font-bold text-brand-900 dark:text-white mb-3">
              Recent Workspace Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((act, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-brand-900 dark:text-slate-200 truncate">
                      {act.title}
                    </p>
                    <span className="text-[11px] text-brand-500 dark:text-brand-400">
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Focus Mode Card Promo */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-card flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-200">
                Deep Work
              </span>
              <h4 className="text-base font-bold mt-0.5">Ready to focus?</h4>
              <p className="text-xs text-brand-100/80 mt-1 max-w-[200px]">
                Kick off a 25-minute distraction-free Pomodoro session.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/focus')}
              className="bg-brand-400 text-brand-950 font-bold shrink-0"
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper utilities for formatting and badges

export function formatDate(dateString) {
  if (!dateString) return 'No date';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
}

export function isToday(dateString) {
  if (!dateString) return false;
  const today = new Date().toISOString().split('T')[0];
  return dateString === today;
}

export function isPastDue(dateString, status) {
  if (!dateString || status === 'Completed') return false;
  const today = new Date().toISOString().split('T')[0];
  return dateString < today;
}

export function getPriorityStyles(priority) {
  switch (priority?.toLowerCase()) {
    case 'urgent':
      return {
        badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/60',
        dot: 'bg-rose-500',
        text: 'Urgent',
      };
    case 'high':
      return {
        badge: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/60',
        dot: 'bg-amber-500',
        text: 'High',
      };
    case 'medium':
      return {
        badge: 'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-900/40 dark:text-brand-300 dark:border-brand-800',
        dot: 'bg-brand-400',
        text: 'Medium',
      };
    case 'low':
    default:
      return {
        badge: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
        dot: 'bg-slate-400',
        text: 'Low',
      };
  }
}

export function getStatusStyles(status) {
  switch (status?.toLowerCase()) {
    case 'completed':
      return {
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
        dot: 'bg-emerald-500',
        label: 'Completed',
      };
    case 'in progress':
      return {
        badge: 'bg-brand-100 text-brand-800 border-brand-300 dark:bg-brand-900/50 dark:text-brand-200 dark:border-brand-700',
        dot: 'bg-brand-400 animate-pulse',
        label: 'In Progress',
      };
    case 'to do':
    default:
      return {
        badge: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700',
        dot: 'bg-slate-400',
        label: 'To Do',
      };
  }
}

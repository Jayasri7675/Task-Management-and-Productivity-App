import React from 'react';

export function Skeleton({ className = '' }) {
  return (
    <div
      className={`bg-brand-100/70 dark:bg-brand-900/40 rounded-xl animate-shimmer ${className}`}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="p-5 rounded-2xl border border-brand-100 dark:border-brand-800/80 bg-white dark:bg-slatebg-darkcard space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-xl" />
      </div>
      <Skeleton className="h-7 w-16" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

export function TaskSkeleton() {
  return (
    <div className="p-4 rounded-xl border border-brand-100 dark:border-brand-800/80 bg-white dark:bg-slatebg-darkcard flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-28" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  );
}

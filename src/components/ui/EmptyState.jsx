import React from 'react';
import { Button } from './Button';
import { FolderPlus, CheckCircle2 } from 'lucide-react';

export function EmptyState({
  icon: Icon = FolderPlus,
  title = 'No items found',
  description = 'Get started by creating your first item.',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-brand-200 dark:border-brand-800 bg-brand-50/30 dark:bg-brand-950/20 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-brand-100 dark:bg-brand-900/60 border border-brand-200 dark:border-brand-700/60 flex items-center justify-center text-brand-500 dark:text-brand-300 mb-4 shadow-sm animate-float-slow">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-brand-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1 text-sm text-brand-500 dark:text-brand-400 max-w-sm">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

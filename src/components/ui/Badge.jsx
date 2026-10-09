import React from 'react';
import { getPriorityStyles, getStatusStyles } from '../../utils/helpers';

export function Badge({
  children,
  variant = 'default', // priority, status, default, brand, outline
  priority,
  status,
  size = 'md',
  className = '',
}) {
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  if (priority) {
    const config = getPriorityStyles(priority);
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${sizeClasses} ${config.badge} ${className}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
        {priority}
      </span>
    );
  }

  if (status) {
    const config = getStatusStyles(status);
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${sizeClasses} ${config.badge} ${className}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
        {config.label}
      </span>
    );
  }

  const variantMap = {
    brand: 'bg-brand-100 text-brand-800 border-brand-200 dark:bg-brand-900/40 dark:text-brand-300 dark:border-brand-700',
    outline: 'border border-brand-300 text-brand-600 dark:border-brand-700 dark:text-brand-300 bg-transparent',
    default: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizeClasses} ${
        variantMap[variant] || variantMap.default
      } ${className}`}
    >
      {children}
    </span>
  );
}

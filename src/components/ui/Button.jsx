import React from 'react';

export function Button({
  children,
  variant = 'primary', // primary, secondary, outline, ghost, danger
  size = 'md', // sm, md, lg
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed btn-press';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-5 py-3 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-brand-400 hover:bg-brand-500 text-brand-950 font-semibold shadow-sm hover:shadow-glow focus:ring-brand-400 dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-950',
    secondary:
      'bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 dark:bg-brand-900/40 dark:hover:bg-brand-800/60 dark:text-brand-200 dark:border-brand-700/60 focus:ring-brand-500',
    outline:
      'bg-transparent hover:bg-brand-50/60 text-brand-700 border border-brand-300 dark:text-brand-200 dark:border-brand-700 dark:hover:bg-brand-900/30 focus:ring-brand-400',
    ghost:
      'bg-transparent hover:bg-brand-50 text-brand-700 dark:text-brand-200 dark:hover:bg-brand-900/40 focus:ring-brand-400',
    danger:
      'bg-rose-500 hover:bg-rose-600 text-white shadow-sm focus:ring-rose-500 dark:bg-rose-600 dark:hover:bg-rose-700',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
}

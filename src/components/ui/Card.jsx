import React from 'react';

export function Card({
  children,
  className = '',
  hover = false,
  glow = false,
  glass = true,
  onClick,
  ...props
}) {
  const base = 'rounded-2xl transition-all duration-200 border';
  const glassStyle = glass
    ? 'glass-card'
    : 'bg-white dark:bg-slatebg-darkcard border-brand-200/80 dark:border-brand-700/60 shadow-subtle';
  const hoverStyle = hover
    ? 'hover:-translate-y-0.5 hover:shadow-card-hover hover:border-brand-300 dark:hover:border-brand-600 cursor-pointer'
    : '';
  const glowStyle = glow ? 'shadow-glow dark:shadow-glow-dark border-brand-300' : '';

  return (
    <div
      onClick={onClick}
      className={`${base} ${glassStyle} ${hoverStyle} ${glowStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`p-5 pb-3 border-b border-brand-100 dark:border-brand-800/60 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '' }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`p-4 pt-3 border-t border-brand-100 dark:border-brand-800/60 ${className}`}>{children}</div>;
}

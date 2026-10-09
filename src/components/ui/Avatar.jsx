import React, { useState } from 'react';

export function Avatar({
  src,
  name = 'User',
  size = 'md', // sm, md, lg, xl
  className = '',
  statusIndicator, // 'online' | 'busy' | 'offline'
}) {
  const [imageFailed, setImageFailed] = useState(false);

  const sizeStyles = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  const getInitials = (n) => {
    if (!n) return 'U';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return n.slice(0, 2).toUpperCase();
  };

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      {src && !imageFailed ? (
        <img
          src={src}
          alt={name}
          onError={() => setImageFailed(true)}
          className={`${sizeStyles[size]} rounded-full object-cover ring-2 ring-brand-200 dark:ring-brand-700`}
        />
      ) : (
        <div
          className={`${sizeStyles[size]} rounded-full bg-gradient-to-tr from-brand-500 to-brand-300 text-brand-950 font-bold flex items-center justify-center ring-2 ring-brand-200 dark:ring-brand-700 shadow-sm`}
        >
          {getInitials(name)}
        </div>
      )}
      {statusIndicator && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-slatebg-dark ${
            size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'
          } ${
            statusIndicator === 'online'
              ? 'bg-emerald-500'
              : statusIndicator === 'busy'
              ? 'bg-amber-500'
              : 'bg-slate-400'
          }`}
        />
      )}
    </div>
  );
}

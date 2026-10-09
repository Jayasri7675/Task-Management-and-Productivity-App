import React from 'react';

export function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon: Icon,
  className = '',
  required = false,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-1.5"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative rounded-xl">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-500 dark:text-brand-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl border text-sm transition-all duration-200 bg-white/90 dark:bg-slatebg-darkcard/90 text-brand-900 dark:text-white placeholder:text-brand-500/60 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50 dark:focus:ring-brand-400/40 ${
            Icon ? 'pl-10 pr-3.5' : 'px-3.5'
          } py-2.5 ${
            error
              ? 'border-rose-400 focus:border-rose-500'
              : 'border-brand-200 dark:border-brand-700/80 focus:border-brand-400'
          } ${className}`}
          {...props}
        />
      </div>
      {error ? (
        <p className="mt-1 text-xs text-rose-500">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-brand-500 dark:text-brand-400">{helperText}</p>
      ) : null}
    </div>
  );
}

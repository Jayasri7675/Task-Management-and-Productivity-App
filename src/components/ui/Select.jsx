import React from 'react';

export function Select({
  label,
  id,
  value,
  onChange,
  options = [],
  error,
  className = '',
  required = false,
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-1.5"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full rounded-xl border text-sm transition-all duration-200 bg-white/90 dark:bg-slatebg-darkcard/90 text-brand-900 dark:text-white px-3.5 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-400/50 dark:focus:ring-brand-400/40 cursor-pointer ${
            error
              ? 'border-rose-400 focus:border-rose-500'
              : 'border-brand-200 dark:border-brand-700/80 focus:border-brand-400'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-brand-500 dark:text-brand-400">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

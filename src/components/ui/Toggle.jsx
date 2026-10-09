import React from 'react';

export function Toggle({
  checked,
  onChange,
  label,
  description,
  id,
  disabled = false,
}) {
  const toggleId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex items-center justify-between gap-4 py-2">
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={toggleId}
              className="text-sm font-medium text-brand-900 dark:text-white cursor-pointer"
            >
              {label}
            </label>
          )}
          {description && (
            <span className="text-xs text-brand-500 dark:text-brand-400">
              {description}
            </span>
          )}
        </div>
      )}
      <button
        type="button"
        id={toggleId}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 ${
          checked ? 'bg-brand-400' : 'bg-slate-200 dark:bg-slate-700'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

import React from 'react';
import { Check } from 'lucide-react';

export function Checkbox({
  checked,
  onChange,
  label,
  id,
  className = '',
  disabled = false,
}) {
  const checkboxId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <label
      htmlFor={checkboxId}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none text-sm text-brand-700 dark:text-brand-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <div className="relative flex items-center">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-150 ${
            checked
              ? 'bg-brand-400 border-brand-400 text-brand-950'
              : 'border-brand-300 dark:border-brand-600 bg-white dark:bg-slatebg-darkcard hover:border-brand-400'
          }`}
        >
          {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>
      {label && <span>{label}</span>}
    </label>
  );
}

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'max-w-lg',
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-950/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="min-h-full flex items-center justify-center p-4 text-center sm:p-0">
        <div
          className={`relative transform overflow-hidden rounded-2xl bg-white dark:bg-slatebg-darkcard border border-brand-200 dark:border-brand-700 text-left shadow-2xl transition-all sm:my-8 w-full ${maxWidth} animate-scale-in p-6 z-10`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-brand-100 dark:border-brand-800">
            <div>
              {title && (
                <h3 className="text-lg font-bold text-brand-900 dark:text-white">
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-1 text-xs text-brand-500 dark:text-brand-400">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-brand-400 hover:text-brand-600 dark:hover:text-white p-1 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-800/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

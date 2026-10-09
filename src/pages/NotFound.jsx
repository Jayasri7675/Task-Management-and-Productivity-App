import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Layers, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slatebg-light dark:bg-slatebg-dark transition-colors">
      <div className="w-16 h-16 rounded-3xl bg-brand-100 dark:bg-brand-900/60 border border-brand-200 dark:border-brand-700 flex items-center justify-center text-brand-500 mb-6 shadow-sm">
        <Layers className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-extrabold text-brand-900 dark:text-white font-mono">
        404
      </h1>
      <h2 className="mt-2 text-xl font-bold text-brand-800 dark:text-slate-200">
        Page Not Found
      </h2>
      <p className="mt-2 text-sm text-brand-500 dark:text-brand-400 max-w-sm">
        The workspace path you requested doesn't exist or has moved.
      </p>
      <div className="mt-6">
        <Link to="/dashboard">
          <Button variant="primary" icon={ArrowLeft}>
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

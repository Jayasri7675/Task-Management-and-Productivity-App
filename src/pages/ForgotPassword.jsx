import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThreeCanvas } from '../components/ui/ThreeCanvas';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Layers, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-slatebg-light dark:bg-slatebg-dark selection:bg-brand-200 selection:text-brand-900 transition-colors">
      <ThreeCanvas className="opacity-60 dark:opacity-30" />

      <div className="relative z-10 w-full max-w-md animate-scale-in">
        <div className="glass-card rounded-3xl p-8 border border-brand-200/80 dark:border-brand-700/80 shadow-2xl">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-700 to-brand-400 flex items-center justify-center text-white shadow-sm">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-brand-900 dark:text-white">
                TASK<span className="text-brand-400">FLOW</span>
              </span>
            </Link>
            <h2 className="text-2xl font-bold text-brand-900 dark:text-white">
              Reset your password
            </h2>
            <p className="mt-1 text-xs text-brand-500 dark:text-brand-400">
              Enter your registered email to receive recovery instructions.
            </p>
          </div>

          {submitted ? (
            <div className="mt-6 text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-brand-900 dark:text-white">
                Check your inbox
              </h3>
              <p className="text-xs text-brand-600 dark:text-slate-300 leading-relaxed">
                We've simulated a password reset email sent to{' '}
                <strong className="text-brand-900 dark:text-white">{email}</strong>. Follow the instructions to reset your password.
              </p>
              <div className="pt-2">
                <Link to="/login">
                  <Button variant="secondary" className="w-full">
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input
                label="Email Address"
                type="email"
                icon={Mail}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full mt-2"
              >
                Send Reset Link
              </Button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

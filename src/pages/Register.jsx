import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ThreeCanvas } from '../components/ui/ThreeCanvas';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Checkbox } from '../components/ui/Checkbox';
import { Layers, User, Mail, Lock, ArrowRight } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const { updateUser, addToast } = useApp();

  const [fullName, setFullName] = useState('Bujji');
  const [email, setEmail] = useState('bujji@taskflow.dev');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      setError('You must agree to the Terms and Conditions to proceed.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateUser({ name: fullName, email });
      addToast('Account created! Welcome to TaskFlow 🎉', 'success');
      navigate('/dashboard');
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
              Create your account
            </h2>
            <p className="mt-1 text-xs text-brand-500 dark:text-brand-400">
              Start building organized productivity habits today.
            </p>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input
              label="Full Name"
              type="text"
              icon={User}
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Bujji"
            />

            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <Input
              label="Password"
              type="password"
              icon={Lock}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <Input
              label="Confirm Password"
              type="password"
              icon={Lock}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />

            <div className="pt-1">
              <Checkbox
                id="agree-terms"
                checked={agreed}
                onChange={setAgreed}
                label="I agree to the Terms and Conditions"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full mt-2"
              icon={ArrowRight}
              iconPosition="right"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-brand-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

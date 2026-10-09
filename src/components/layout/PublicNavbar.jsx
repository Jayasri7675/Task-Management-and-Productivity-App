import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Layers, Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';

export function PublicNavbar() {
  const { theme, setTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slatebg-darkcard/80 backdrop-blur-md border-b border-brand-200/80 dark:border-brand-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-400 flex items-center justify-center text-white shadow-sm">
            <Layers className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-brand-900 dark:text-white">
            TASK<span className="text-brand-400">FLOW</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-600 dark:text-slate-300">
          <a href="#features" className="hover:text-brand-900 dark:hover:text-white transition-colors">
            Features
          </a>
          <a href="#productivity" className="hover:text-brand-900 dark:hover:text-white transition-colors">
            Productivity
          </a>
          <a href="#why-taskflow" className="hover:text-brand-900 dark:hover:text-white transition-colors">
            About
          </a>
          <Link to="/login" className="hover:text-brand-900 dark:hover:text-white transition-colors">
            Login
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-brand-600 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/50 transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-brand-600" />
            )}
          </button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/register')}
            icon={ArrowRight}
            iconPosition="right"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-brand-600 dark:text-brand-300"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-brand-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-brand-200 dark:border-brand-800 bg-white/95 dark:bg-slatebg-darkcard/95 px-4 pt-3 pb-6 space-y-3 animate-slide-up">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-brand-700 dark:text-slate-200 hover:bg-brand-50 rounded-lg"
          >
            Features
          </a>
          <a
            href="#productivity"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-brand-700 dark:text-slate-200 hover:bg-brand-50 rounded-lg"
          >
            Productivity
          </a>
          <a
            href="#why-taskflow"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-brand-700 dark:text-slate-200 hover:bg-brand-50 rounded-lg"
          >
            About
          </a>
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-brand-700 dark:text-slate-200 hover:bg-brand-50 rounded-lg"
          >
            Login
          </Link>
          <div className="pt-2">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/register');
              }}
            >
              Get Started Free
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

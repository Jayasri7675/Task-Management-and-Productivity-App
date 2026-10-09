import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Plus,
  Menu,
  User,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-react';

export function Header({ setMobileOpen }) {
  const {
    user,
    theme,
    setTheme,
    notifications,
    setIsCommandPaletteOpen,
    openCreateTaskModal,
  } = useApp();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-slatebg-darkcard/80 backdrop-blur-md border-b border-brand-200/80 dark:border-brand-800/80 px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left: Mobile Toggle & Search Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/50 transition-colors"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search / Command Bar Trigger */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-50/80 dark:bg-slatebg-dark/80 hover:bg-brand-100/70 dark:hover:bg-brand-900/40 border border-brand-200/60 dark:border-brand-800/60 text-brand-600 dark:text-slate-300 text-xs sm:text-sm transition-all group w-44 sm:w-64"
        >
          <Search className="w-4 h-4 text-brand-500 dark:text-brand-400 group-hover:scale-110 transition-transform" />
          <span className="truncate">Quick search...</span>
          <kbd className="ml-auto hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono bg-white dark:bg-brand-800 text-brand-500 dark:text-brand-300 border border-brand-200 dark:border-brand-700 shadow-2xs">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right: Quick Action, Theme, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Add Task */}
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => openCreateTaskModal()}
          className="hidden sm:inline-flex shadow-sm"
        >
          Add Task
        </Button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-brand-600 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/50 border border-transparent hover:border-brand-200 dark:hover:border-brand-800 transition-all"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
          ) : (
            <Moon className="w-5 h-5 text-brand-600" />
          )}
        </button>

        {/* Notifications Icon Button */}
        <Link
          to="/notifications"
          className="relative p-2 rounded-xl text-brand-600 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/50 border border-transparent hover:border-brand-200 dark:hover:border-brand-800 transition-all"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-400 rounded-full ring-2 ring-white dark:ring-slatebg-darkcard animate-pulse" />
          )}
        </Link>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-brand-300 dark:hover:ring-brand-700 transition-all focus:outline-none"
          >
            <Avatar src={user.avatar} name={user.name} size="sm" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slatebg-darkcard border border-brand-200 dark:border-brand-700 shadow-xl py-2 z-50 animate-scale-in">
              <div className="px-4 py-2 border-b border-brand-100 dark:border-brand-800">
                <p className="text-sm font-bold text-brand-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-brand-500 dark:text-brand-400 truncate">
                  {user.email}
                </p>
              </div>

              <div className="py-1">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-brand-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-900/40"
                >
                  <User className="w-4 h-4 text-brand-500" />
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-brand-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-900/40"
                >
                  <Settings className="w-4 h-4 text-brand-500" />
                  Settings
                </Link>
              </div>

              <div className="border-t border-brand-100 dark:border-brand-800 my-1" />

              <div className="px-2">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

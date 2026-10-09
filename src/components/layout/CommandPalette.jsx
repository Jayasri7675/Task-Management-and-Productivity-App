import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  CheckSquare,
  FolderKanban,
  Compass,
  ArrowRight,
  X,
  LayoutDashboard,
  Kanban,
  Calendar,
  BarChart2,
  Timer,
  Settings,
  User,
  Bell,
} from 'lucide-react';

export function CommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, tasks, projects } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  const navigationPages = [
    { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, category: 'Pages' },
    { title: 'My Tasks', path: '/tasks', icon: CheckSquare, category: 'Pages' },
    { title: 'Kanban Board', path: '/kanban', icon: Kanban, category: 'Pages' },
    { title: 'Calendar', path: '/calendar', icon: Calendar, category: 'Pages' },
    { title: 'Projects', path: '/projects', icon: FolderKanban, category: 'Pages' },
    { title: 'Analytics', path: '/analytics', icon: BarChart2, category: 'Pages' },
    { title: 'Focus Mode', path: '/focus', icon: Timer, category: 'Pages' },
    { title: 'Notifications', path: '/notifications', icon: Bell, category: 'Pages' },
    { title: 'Settings', path: '/settings', icon: Settings, category: 'Pages' },
    { title: 'Profile', path: '/profile', icon: User, category: 'Pages' },
  ];

  // Filter tasks, projects, and pages
  const q = query.toLowerCase().trim();

  const filteredPages = navigationPages.filter((p) =>
    p.title.toLowerCase().includes(q)
  );

  const filteredTasks = tasks
    .filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.project?.toLowerCase().includes(q) ||
        t.tags?.some((tag) => tag.toLowerCase().includes(q))
    )
    .slice(0, 5);

  const filteredProjects = projects
    .filter((proj) => proj.name.toLowerCase().includes(q))
    .slice(0, 4);

  const totalResults = [
    ...filteredPages.map((p) => ({ ...p, type: 'page' })),
    ...filteredTasks.map((t) => ({ ...t, type: 'task' })),
    ...filteredProjects.map((p) => ({ ...p, type: 'project' })),
  ];

  const handleSelect = (item) => {
    setIsCommandPaletteOpen(false);
    if (item.type === 'page') {
      navigate(item.path);
    } else if (item.type === 'task') {
      navigate('/tasks');
    } else if (item.type === 'project') {
      navigate('/projects');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, totalResults.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + totalResults.length) % Math.max(1, totalResults.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (totalResults[selectedIndex]) {
        handleSelect(totalResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsCommandPaletteOpen(false);
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-brand-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCommandPaletteOpen(false)}
      />

      <div className="min-h-full flex items-start justify-center p-4 sm:p-6 sm:pt-20">
        <div
          className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-slatebg-darkcard border border-brand-200 dark:border-brand-700 shadow-2xl overflow-hidden animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 border-b border-brand-100 dark:border-brand-800">
            <Search className="w-5 h-5 text-brand-400 shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search tasks, projects, or jump to page... (e.g. 'React')"
              className="w-full py-4 text-sm bg-transparent text-brand-900 dark:text-white placeholder:text-brand-400/60 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-brand-400 hover:text-brand-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="ml-2 hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono bg-brand-50 dark:bg-brand-900/60 text-brand-500 rounded border border-brand-200 dark:border-brand-700">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-4">
            {/* Pages Section */}
            {filteredPages.length > 0 && (
              <div>
                <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-400">
                  Navigation
                </p>
                <div className="space-y-1 mt-1">
                  {filteredPages.map((page, idx) => {
                    const isSelected = selectedIndex === idx;
                    const Icon = page.icon;
                    return (
                      <div
                        key={page.path}
                        onClick={() => handleSelect({ ...page, type: 'page' })}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-sm transition-all ${
                          isSelected
                            ? 'bg-brand-100 text-brand-900 dark:bg-brand-900/60 dark:text-brand-100 font-semibold'
                            : 'text-brand-700 dark:text-slate-200 hover:bg-brand-50/80 dark:hover:bg-brand-900/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-brand-500" />
                          <span>{page.title}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tasks Section */}
            {filteredTasks.length > 0 && (
              <div>
                <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-400">
                  Tasks
                </p>
                <div className="space-y-1 mt-1">
                  {filteredTasks.map((t, idx) => {
                    const realIdx = filteredPages.length + idx;
                    const isSelected = selectedIndex === realIdx;
                    return (
                      <div
                        key={t.id}
                        onClick={() => handleSelect({ ...t, type: 'task' })}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-sm transition-all ${
                          isSelected
                            ? 'bg-brand-100 text-brand-900 dark:bg-brand-900/60 dark:text-brand-100 font-semibold'
                            : 'text-brand-700 dark:text-slate-200 hover:bg-brand-50/80 dark:hover:bg-brand-900/30'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <CheckSquare className="w-4 h-4 text-brand-500 shrink-0" />
                          <div className="truncate">
                            <span className="font-medium">{t.title}</span>
                            <span className="ml-2 text-xs text-brand-500 dark:text-brand-400">
                              • {t.project}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] px-2 py-0.5 rounded-full border border-brand-200 dark:border-brand-700 text-brand-600 dark:text-brand-300">
                          {t.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Projects Section */}
            {filteredProjects.length > 0 && (
              <div>
                <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-400">
                  Projects
                </p>
                <div className="space-y-1 mt-1">
                  {filteredProjects.map((p, idx) => {
                    const realIdx = filteredPages.length + filteredTasks.length + idx;
                    const isSelected = selectedIndex === realIdx;
                    return (
                      <div
                        key={p.id}
                        onClick={() => handleSelect({ ...p, type: 'project' })}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-sm transition-all ${
                          isSelected
                            ? 'bg-brand-100 text-brand-900 dark:bg-brand-900/60 dark:text-brand-100 font-semibold'
                            : 'text-brand-700 dark:text-slate-200 hover:bg-brand-50/80 dark:hover:bg-brand-900/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <FolderKanban className="w-4 h-4 text-brand-500" />
                          <span className="font-medium">{p.name}</span>
                        </div>
                        <span className="text-xs text-brand-500 dark:text-brand-400">
                          {p.completedTasks}/{p.totalTasks} done
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {totalResults.length === 0 && (
              <div className="py-8 text-center text-brand-500 dark:text-brand-400 text-sm">
                No matching results for "{query}"
              </div>
            )}
          </div>

          {/* Footer Guide */}
          <div className="px-4 py-2.5 bg-brand-50/50 dark:bg-brand-950/40 border-t border-brand-100 dark:border-brand-800 flex items-center justify-between text-xs text-brand-500 dark:text-brand-400">
            <div className="flex items-center gap-3">
              <span>↑↓ to navigate</span>
              <span>•</span>
              <span>↵ to open</span>
            </div>
            <span>TaskFlow Command Palette</span>
          </div>
        </div>
      </div>
    </div>
  );
}

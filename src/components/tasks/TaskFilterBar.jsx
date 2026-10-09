import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';

export function TaskFilterBar({
  searchQuery,
  setSearchQuery,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  projectFilter,
  setProjectFilter,
  sortBy,
  setSortBy,
  onResetFilters,
}) {
  const { projects } = useApp();

  const isFiltered =
    searchQuery ||
    priorityFilter !== 'All' ||
    statusFilter !== 'All' ||
    projectFilter !== 'All' ||
    sortBy !== 'dueDateAsc';

  return (
    <div className="glass-card p-4 rounded-2xl border border-brand-200/80 dark:border-brand-700/60 mb-6 space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-brand-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, description, or #tag..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-brand-200 dark:border-brand-700 bg-white/90 dark:bg-slatebg-darkcard text-brand-900 dark:text-white placeholder:text-brand-400/70 focus:outline-none focus:ring-2 focus:ring-brand-400/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-600 dark:hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter controls row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Select */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-slatebg-darkcard text-brand-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Priority Select */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-slatebg-darkcard text-brand-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
          >
            <option value="All">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Project Select */}
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-slatebg-darkcard text-brand-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer max-w-[140px] truncate"
          >
            <option value="All">All Projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-slatebg-darkcard text-brand-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
          >
            <option value="dueDateAsc">Due Date (Earliest)</option>
            <option value="dueDateDesc">Due Date (Latest)</option>
            <option value="priority">Priority (Highest)</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors font-medium"
            >
              <X className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TaskCard } from '../components/tasks/TaskCard';
import { TaskFilterBar } from '../components/tasks/TaskFilterBar';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Plus, CheckSquare, ListFilter, Sparkles } from 'lucide-react';

export function Tasks() {
  const { tasks, openCreateTaskModal } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [projectFilter, setProjectFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDateAsc');

  const handleResetFilters = () => {
    setSearchQuery('');
    setPriorityFilter('All');
    setStatusFilter('All');
    setProjectFilter('All');
    setSortBy('dueDateAsc');
  };

  const priorityWeight = {
    Urgent: 4,
    High: 3,
    Medium: 2,
    Low: 1,
  };

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          t.project?.toLowerCase().includes(q) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter((t) => t.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'All') {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    // Project filter
    if (projectFilter !== 'All') {
      result = result.filter((t) => t.project === projectFilter);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'dueDateAsc') {
        return (a.dueDate || '9999') > (b.dueDate || '9999') ? 1 : -1;
      }
      if (sortBy === 'dueDateDesc') {
        return (a.dueDate || '0000') < (b.dueDate || '0000') ? 1 : -1;
      }
      if (sortBy === 'priority') {
        return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [tasks, searchQuery, priorityFilter, statusFilter, projectFilter, sortBy]);

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'In Progress').length;
  const todoCount = tasks.filter((t) => t.status === 'To Do').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 dark:text-white flex items-center gap-2.5">
            <CheckSquare className="w-7 h-7 text-brand-400" /> My Tasks
          </h1>
          <p className="mt-1 text-sm text-brand-600 dark:text-slate-300">
            Organize, prioritize, and systematically conquer your daily action items.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => openCreateTaskModal()}
          className="shadow-glow self-start sm:self-auto"
        >
          Add New Task
        </Button>
      </div>

      {/* Quick Summary Pill Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        <button
          onClick={() => setStatusFilter('All')}
          className={`px-3 py-1.5 rounded-xl border transition-all ${
            statusFilter === 'All'
              ? 'bg-brand-400 text-brand-950 border-brand-400 shadow-xs'
              : 'border-brand-200 dark:border-brand-800 text-brand-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-900/40'
          }`}
        >
          All ({tasks.length})
        </button>
        <button
          onClick={() => setStatusFilter('To Do')}
          className={`px-3 py-1.5 rounded-xl border transition-all ${
            statusFilter === 'To Do'
              ? 'bg-brand-400 text-brand-950 border-brand-400 shadow-xs'
              : 'border-brand-200 dark:border-brand-800 text-brand-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-900/40'
          }`}
        >
          To Do ({todoCount})
        </button>
        <button
          onClick={() => setStatusFilter('In Progress')}
          className={`px-3 py-1.5 rounded-xl border transition-all ${
            statusFilter === 'In Progress'
              ? 'bg-brand-400 text-brand-950 border-brand-400 shadow-xs'
              : 'border-brand-200 dark:border-brand-800 text-brand-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-900/40'
          }`}
        >
          In Progress ({inProgressCount})
        </button>
        <button
          onClick={() => setStatusFilter('Completed')}
          className={`px-3 py-1.5 rounded-xl border transition-all ${
            statusFilter === 'Completed'
              ? 'bg-brand-400 text-brand-950 border-brand-400 shadow-xs'
              : 'border-brand-200 dark:border-brand-800 text-brand-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-900/40'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Filter and Search Bar */}
      <TaskFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onResetFilters={handleResetFilters}
      />

      {/* Task List Content */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          title={tasks.length === 0 ? 'No tasks yet' : 'No matching tasks found'}
          description={
            tasks.length === 0
              ? 'Create your first task and start organizing your day with clarity.'
              : 'Try adjusting your search keywords, priority, or status filters.'
          }
          actionLabel={tasks.length === 0 ? 'Create First Task' : 'Reset Filters'}
          onAction={tasks.length === 0 ? () => openCreateTaskModal() : handleResetFilters}
        />
      ) : (
        <div className="space-y-3 animate-fade-in">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

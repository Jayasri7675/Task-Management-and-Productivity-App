import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TaskCard } from '../components/tasks/TaskCard';
import { Button } from '../components/ui/Button';
import { Plus, Kanban as KanbanIcon, Search, Filter } from 'lucide-react';

export function Kanban() {
  const { tasks, moveTaskStatus, openCreateTaskModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('All');
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const columns = [
    {
      id: 'To Do',
      title: 'To Do',
      accentColor: 'border-slate-300 dark:border-slate-700',
      badgeColor: 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    },
    {
      id: 'In Progress',
      title: 'In Progress',
      accentColor: 'border-brand-400',
      badgeColor: 'bg-brand-100 dark:bg-brand-900/60 text-brand-800 dark:text-brand-300',
    },
    {
      id: 'Completed',
      title: 'Completed',
      accentColor: 'border-emerald-400',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300',
    },
  ];

  // Filter tasks based on search & project
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject =
      projectFilter === 'All' || t.project === projectFilter;
    return matchesSearch && matchesProject;
  });

  // Extract unique projects for filter
  const projectsList = Array.from(new Set(tasks.map((t) => t.project).filter(Boolean)));

  // Drag and drop handlers
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDragLeave = (columnId) => {
    if (dragOverColumn === columnId) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    if (taskId) {
      moveTaskStatus(taskId, columnId);
    }
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 dark:text-white flex items-center gap-2.5">
            <KanbanIcon className="w-7 h-7 text-brand-400" /> Kanban Board
          </h1>
          <p className="mt-1 text-sm text-brand-600 dark:text-slate-300">
            Visualize your workflow across lifecycle stages. Drag and drop cards to update status.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => openCreateTaskModal()}
          className="shadow-glow self-start sm:self-auto"
        >
          Add Task
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-3 rounded-2xl border border-brand-200/80 dark:border-brand-700/60 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-brand-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Kanban cards..."
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-slatebg-darkcard text-brand-900 dark:text-white placeholder:text-brand-400/70 focus:outline-none focus:ring-2 focus:ring-brand-400/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-slatebg-darkcard text-brand-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
          >
            <option value="All">All Projects</option>
            {projectsList.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);
          const isOver = dragOverColumn === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={() => handleDragLeave(col.id)}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`rounded-2xl flex flex-col transition-all duration-200 min-w-[280px] ${
                isOver
                  ? 'bg-brand-100/60 dark:bg-brand-900/30 ring-2 ring-brand-400'
                  : 'bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200/80 dark:border-brand-800/80'
              }`}
            >
              {/* Column Header */}
              <div
                className={`p-4 border-b ${col.accentColor} flex items-center justify-between border-t-4 rounded-t-2xl bg-white/70 dark:bg-slatebg-darkcard/70 backdrop-blur-sm`}
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-brand-900 dark:text-white">
                    {col.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${col.badgeColor}`}
                  >
                    {colTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => openCreateTaskModal({ status: col.id })}
                  className="p-1 rounded-lg text-brand-400 hover:text-brand-600 dark:hover:text-white hover:bg-brand-100 dark:hover:bg-brand-800/50 transition-colors"
                  title={`Add Task to ${col.title}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Column Cards Container */}
              <div className="p-3.5 flex-1 min-h-[420px] space-y-3 overflow-y-auto max-h-[calc(100vh-280px)]">
                {colTasks.length === 0 ? (
                  <div className="h-40 flex flex-col items-center justify-center text-center p-4 border border-dashed border-brand-200 dark:border-brand-800 rounded-xl text-brand-400 text-xs">
                    <span>No tasks in {col.title}</span>
                    <button
                      onClick={() => openCreateTaskModal({ status: col.id })}
                      className="mt-2 text-brand-500 dark:text-brand-300 font-semibold hover:underline"
                    >
                      + Add a card
                    </button>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDragStart={handleDragStart}
                      showColumnMover={true}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

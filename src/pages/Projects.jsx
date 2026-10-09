import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/projects/ProjectCard';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Plus, FolderKanban, Search, Layers } from 'lucide-react';

export function Projects() {
  const { projects, openCreateProjectModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredProjects = projects.filter((proj) => {
    const matchesQuery =
      searchQuery.trim() === '' ||
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || proj.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 dark:text-white flex items-center gap-2.5">
            <FolderKanban className="w-7 h-7 text-brand-400" /> Projects
          </h1>
          <p className="mt-1 text-sm text-brand-600 dark:text-slate-300">
            Track multi-phase initiatives, milestones, and high-level progress.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => openCreateProjectModal()}
          className="shadow-glow self-start sm:self-auto"
        >
          Create Project
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="glass-card p-3 rounded-2xl border border-brand-200/80 dark:border-brand-700/60 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-brand-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-slatebg-darkcard text-brand-900 dark:text-white placeholder:text-brand-400/70 focus:outline-none focus:ring-2 focus:ring-brand-400/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-slatebg-darkcard text-brand-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          title={projects.length === 0 ? 'No projects yet' : 'No matching projects'}
          description={
            projects.length === 0
              ? 'Create your first project to organize related tasks under one umbrella.'
              : 'Try searching with different terms or changing your status filter.'
          }
          actionLabel={projects.length === 0 ? 'Create First Project' : 'Reset Search'}
          onAction={
            projects.length === 0
              ? () => openCreateProjectModal()
              : () => {
                  setSearchQuery('');
                  setStatusFilter('All');
                }
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 animate-fade-in">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

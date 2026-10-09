import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Badge } from '../ui/Badge';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { formatDate } from '../../utils/helpers';
import {
  FolderKanban,
  Calendar,
  CheckCircle2,
  Clock,
  Edit2,
  Trash2,
  ArrowRight,
} from 'lucide-react';

export function ProjectCard({ project }) {
  const { openCreateProjectModal, deleteProject } = useApp();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const total = project.totalTasks || 0;
  const completed = project.completedTasks || 0;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <>
      <div className="glass-card rounded-2xl p-5 border border-brand-200/80 dark:border-brand-700/60 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group">
        <div>
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-xs shrink-0"
                style={{ backgroundColor: project.color || '#88BDF2' }}
              >
                <FolderKanban className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-brand-900 dark:text-white group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
                  {project.name}
                </h3>
                <span className="text-xs text-brand-500 dark:text-brand-400">
                  {project.category || 'General'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => openCreateProjectModal(project)}
                className="p-1.5 text-brand-400 hover:text-brand-600 dark:hover:text-white rounded-lg hover:bg-brand-50 dark:hover:bg-brand-800 transition-colors"
                title="Edit Project"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="p-1.5 text-brand-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Delete Project"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="mt-3 text-xs text-brand-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {project.description || 'No description provided.'}
          </p>

          {/* Progress Bar Section */}
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-brand-700 dark:text-slate-200">
                {progressPercent}% Complete
              </span>
              <span className="text-brand-500 dark:text-brand-400 font-medium">
                {completed} / {total} tasks
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-brand-100 dark:bg-brand-900/60 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: project.color || '#88BDF2',
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-5 pt-3.5 border-t border-brand-100 dark:border-brand-800/60 flex items-center justify-between text-xs text-brand-500 dark:text-brand-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-400" />
            <span>Target: {project.deadline ? formatDate(project.deadline) : 'Ongoing'}</span>
          </div>

          <button
            onClick={() => navigate('/tasks')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-300 hover:text-brand-900 dark:hover:text-white transition-colors"
          >
            Tasks <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={() => deleteProject(project.id)}
        title="Delete Project?"
        message={`Are you sure you want to delete "${project.name}"? Associated tasks will remain in your workspace.`}
        confirmText="Delete Project"
      />
    </>
  );
}

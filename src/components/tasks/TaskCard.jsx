import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../ui/Badge';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { formatDate, isPastDue, isToday } from '../../utils/helpers';
import {
  Calendar,
  CheckCircle,
  Clock,
  MoreVertical,
  Edit2,
  Trash2,
  Tag,
  Folder,
  ArrowRightCircle,
} from 'lucide-react';

export function TaskCard({
  task,
  compact = false,
  onDragStart,
  showColumnMover = false,
}) {
  const { toggleTaskStatus, deleteTask, openEditTaskModal, moveTaskStatus } = useApp();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const pastDue = isPastDue(task.dueDate, task.status);
  const todayDue = isToday(task.dueDate);

  return (
    <>
      <div
        draggable={Boolean(onDragStart)}
        onDragStart={(e) => onDragStart && onDragStart(e, task.id)}
        className={`group relative rounded-2xl border transition-all duration-200 ${
          task.status === 'Completed'
            ? 'bg-brand-50/40 dark:bg-slatebg-darkcard/40 border-brand-200/50 dark:border-brand-800/40 opacity-80 hover:opacity-100'
            : 'glass-card hover:-translate-y-0.5 hover:shadow-card-hover border-brand-200/80 dark:border-brand-700/60'
        } p-4 sm:p-5`}
      >
        <div className="flex items-start justify-between gap-3">
          {/* Checkbox & Title */}
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <button
              onClick={() => toggleTaskStatus(task.id)}
              className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                task.status === 'Completed'
                  ? 'bg-brand-400 border-brand-400 text-brand-950 shadow-xs'
                  : 'border-brand-300 dark:border-brand-600 hover:border-brand-400 bg-white dark:bg-slatebg-darkcard'
              }`}
              title={task.status === 'Completed' ? 'Mark In Progress' : 'Mark Completed'}
            >
              {task.status === 'Completed' && (
                <CheckCircle className="w-4 h-4 fill-brand-400 text-brand-950 stroke-[2.5]" />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <h4
                className={`text-sm font-semibold truncate transition-colors ${
                  task.status === 'Completed'
                    ? 'line-through text-brand-400 dark:text-slate-400'
                    : 'text-brand-900 dark:text-white'
                }`}
              >
                {task.title}
              </h4>
              {!compact && task.description && (
                <p className="mt-1 text-xs text-brand-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {task.description}
                </p>
              )}
            </div>
          </div>

          {/* Action Menu */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => openEditTaskModal(task)}
              className="p-1.5 text-brand-400 hover:text-brand-600 dark:hover:text-white rounded-lg hover:bg-brand-50 dark:hover:bg-brand-800/50 transition-colors opacity-0 group-hover:opacity-100"
              title="Edit Task"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="p-1.5 text-brand-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors opacity-0 group-hover:opacity-100"
              title="Delete Task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Metadata Badges & Due Date */}
        <div className="mt-3.5 pt-3 border-t border-brand-100 dark:border-brand-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge priority={task.priority} size="sm" />
            <Badge status={task.status} size="sm" />
            {task.project && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-500 dark:text-brand-300">
                <Folder className="w-3 h-3 text-brand-400" />
                {task.project}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {task.dueDate && (
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                  pastDue
                    ? 'text-rose-500 font-semibold'
                    : todayDue
                    ? 'text-brand-600 dark:text-brand-300 font-semibold'
                    : 'text-brand-500 dark:text-slate-400'
                }`}
                title={pastDue ? 'Past deadline' : todayDue ? 'Due today' : 'Due date'}
              >
                <Clock className="w-3 h-3" />
                {todayDue ? 'Today' : formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>

        {/* Tags if present */}
        {!compact && task.tags && task.tags.length > 0 && (
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Quick Column Mover for Kanban / Quick triage */}
        {showColumnMover && (
          <div className="mt-3 pt-2.5 border-t border-brand-100 dark:border-brand-800/40 flex items-center justify-end gap-1.5 text-[11px]">
            <span className="text-brand-400 text-[10px] mr-1">Move:</span>
            {task.status !== 'To Do' && (
              <button
                onClick={() => moveTaskStatus(task.id, 'To Do')}
                className="px-2 py-0.5 rounded text-brand-600 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-800 transition-colors"
              >
                To Do
              </button>
            )}
            {task.status !== 'In Progress' && (
              <button
                onClick={() => moveTaskStatus(task.id, 'In Progress')}
                className="px-2 py-0.5 rounded text-brand-600 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-800 transition-colors"
              >
                In Progress
              </button>
            )}
            {task.status !== 'Completed' && (
              <button
                onClick={() => moveTaskStatus(task.id, 'Completed')}
                className="px-2 py-0.5 rounded text-brand-600 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-800 transition-colors"
              >
                Completed
              </button>
            )}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={() => deleteTask(task.id)}
        title="Delete Task?"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Delete Task"
      />
    </>
  );
}

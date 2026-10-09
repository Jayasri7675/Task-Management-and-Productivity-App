import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { TaskCard } from '../components/tasks/TaskCard';
import { Badge } from '../components/ui/Badge';
import { formatDate } from '../utils/helpers';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export function Calendar() {
  const { tasks, openCreateTaskModal } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [viewMode, setViewMode] = useState('Month'); // Month, Week, Day

  // Month navigation
  const prevPeriod = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      if (viewMode === 'Month') d.setMonth(d.getMonth() - 1);
      else if (viewMode === 'Week') d.setDate(d.getDate() - 7);
      else d.setDate(d.getDate() - 1);
      return d;
    });
  };

  const nextPeriod = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      if (viewMode === 'Month') d.setMonth(d.getMonth() + 1);
      else if (viewMode === 'Week') d.setDate(d.getDate() + 7);
      else d.setDate(d.getDate() + 1);
      return d;
    });
  };

  const jumpToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDateStr(today.toISOString().split('T')[0]);
  };

  // Calendar matrix calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Compute days in current month
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Grid of 35 or 42 cells
  const calendarCells = [];
  // Prev month padding
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevMonthDate = new Date(year, month - 1, day);
    const dateStr = prevMonthDate.toISOString().split('T')[0];
    calendarCells.push({ day, isCurrentMonth: false, dateStr });
  }
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const thisDate = new Date(year, month, d);
    const dateStr = thisDate.toISOString().split('T')[0];
    calendarCells.push({ day: d, isCurrentMonth: true, dateStr });
  }
  // Next month padding to fill rows
  const remaining = 35 - calendarCells.length;
  if (remaining > 0) {
    for (let d = 1; d <= remaining; d++) {
      const nextMonthDate = new Date(year, month + 1, d);
      const dateStr = nextMonthDate.toISOString().split('T')[0];
      calendarCells.push({ day: d, isCurrentMonth: false, dateStr });
    }
  }

  // Selected date tasks
  const selectedDateTasks = tasks.filter((t) => t.dueDate === selectedDateStr);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 dark:text-white flex items-center gap-2.5">
            <CalendarIcon className="w-7 h-7 text-brand-400" /> Calendar
          </h1>
          <p className="mt-1 text-sm text-brand-600 dark:text-slate-300">
            Schedule upcoming deadlines, exam targets, and milestones.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={jumpToToday}
          >
            Today
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => openCreateTaskModal({ dueDate: selectedDateStr })}
            className="shadow-glow"
          >
            Schedule Task
          </Button>
        </div>
      </div>

      {/* Calendar Toolbar: Period Nav and View Switcher */}
      <div className="glass-card p-4 rounded-2xl border border-brand-200/80 dark:border-brand-700/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={prevPeriod}
              className="p-1.5 rounded-lg border border-brand-200 dark:border-brand-700 text-brand-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPeriod}
              className="p-1.5 rounded-lg border border-brand-200 dark:border-brand-700 text-brand-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-lg font-bold text-brand-900 dark:text-white">
            {monthName} {year}
          </h2>
        </div>

        {/* View Mode Buttons */}
        <div className="flex items-center p-1 rounded-xl bg-brand-50 dark:bg-slatebg-dark border border-brand-200/60 dark:border-brand-800/60">
          {['Month', 'Week', 'Day'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                viewMode === mode
                  ? 'bg-white dark:bg-brand-800 text-brand-900 dark:text-white shadow-xs'
                  : 'text-brand-500 hover:text-brand-900 dark:hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Calendar Matrix & Selected Date Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View Area */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-4 sm:p-5 border border-brand-200/80 dark:border-brand-700/60">
          {viewMode === 'Month' && (
            <div>
              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2 text-center text-xs font-bold uppercase tracking-wider text-brand-400">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <div key={d} className="py-2">
                    {d}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {calendarCells.map((cell, idx) => {
                  const isSelected = cell.dateStr === selectedDateStr;
                  const isTodayCell = cell.dateStr === new Date().toISOString().split('T')[0];
                  const dayTasks = tasks.filter((t) => t.dueDate === cell.dateStr);

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedDateStr(cell.dateStr)}
                      className={`min-h-[72px] sm:min-h-[88px] p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-brand-400 ring-2 ring-brand-400/40 bg-brand-50/80 dark:bg-brand-900/40'
                          : cell.isCurrentMonth
                          ? 'border-brand-100 dark:border-brand-800/80 bg-white/70 dark:bg-slatebg-darkcard/70 hover:border-brand-300 dark:hover:border-brand-700'
                          : 'border-transparent bg-slate-50/40 dark:bg-slate-900/20 opacity-40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                            isTodayCell
                              ? 'bg-brand-400 text-brand-950'
                              : isSelected
                              ? 'text-brand-900 dark:text-brand-200 font-extrabold'
                              : 'text-brand-700 dark:text-slate-300'
                          }`}
                        >
                          {cell.day}
                        </span>

                        {dayTasks.length > 0 && (
                          <span className="w-2 h-2 rounded-full bg-brand-400" />
                        )}
                      </div>

                      {/* Mini Task Pills */}
                      <div className="space-y-1 mt-1 overflow-hidden">
                        {dayTasks.slice(0, 2).map((t) => (
                          <div
                            key={t.id}
                            className={`truncate text-[10px] px-1.5 py-0.5 rounded font-medium ${
                              t.status === 'Completed'
                                ? 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 line-through'
                                : 'bg-brand-100/90 text-brand-900 dark:bg-brand-900/60 dark:text-brand-200'
                            }`}
                            title={t.title}
                          >
                            {t.title}
                          </div>
                        ))}
                        {dayTasks.length > 2 && (
                          <span className="text-[9px] text-brand-500 font-bold pl-1">
                            +{dayTasks.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === 'Week' && (
            <div className="py-8 text-center space-y-4">
              <h3 className="text-base font-bold text-brand-900 dark:text-white">
                Week Agenda View
              </h3>
              <p className="text-xs text-brand-500 max-w-md mx-auto">
                Showing scheduled tasks for the current 7-day period. Select any day to review deadlines.
              </p>
              <div className="grid grid-cols-7 gap-2 pt-4">
                {calendarCells.slice(0, 7).map((cell, idx) => {
                  const dayTasks = tasks.filter((t) => t.dueDate === cell.dateStr);
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedDateStr(cell.dateStr)}
                      className="p-3 rounded-xl border border-brand-200 dark:border-brand-700 glass-card text-center cursor-pointer hover:border-brand-400"
                    >
                      <span className="text-xs font-bold text-brand-500">{cell.day}</span>
                      <div className="mt-2 text-xs font-bold text-brand-900 dark:text-white">
                        {dayTasks.length} tasks
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === 'Day' && (
            <div className="py-8 text-center space-y-4">
              <h3 className="text-base font-bold text-brand-900 dark:text-white">
                Single Day Focus: {formatDate(selectedDateStr)}
              </h3>
              <p className="text-xs text-brand-500">
                Displaying detailed hourly allocation and deadlines for {formatDate(selectedDateStr)}.
              </p>
              <div className="max-w-md mx-auto space-y-2 pt-2 text-left">
                {selectedDateTasks.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-slatebg-darkcard flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-semibold">{t.title}</h5>
                      <span className="text-xs text-brand-500">{t.project}</span>
                    </div>
                    <Badge status={t.status} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected Date Detail Panel */}
        <div className="glass-card rounded-2xl p-5 border border-brand-200/80 dark:border-brand-700/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-100 dark:border-brand-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-400">
                  Target Date
                </span>
                <h3 className="text-base font-bold text-brand-900 dark:text-white mt-0.5">
                  {formatDate(selectedDateStr)}
                </h3>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={() => openCreateTaskModal({ dueDate: selectedDateStr })}
              >
                Add
              </Button>
            </div>

            {/* Tasks scheduled on this date */}
            <div className="mt-4 space-y-3">
              {selectedDateTasks.length === 0 ? (
                <div className="py-12 text-center text-xs text-brand-400 border border-dashed border-brand-200 dark:border-brand-800 rounded-xl p-4">
                  No tasks due on this date. Click 'Add' to schedule an assignment or milestone.
                </div>
              ) : (
                selectedDateTasks.map((task) => (
                  <TaskCard key={task.id} task={task} compact={true} />
                ))
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-100 dark:border-brand-800 flex items-center justify-between text-xs text-brand-500">
            <span>Scheduled tasks:</span>
            <span className="font-bold text-brand-900 dark:text-white">
              {selectedDateTasks.length} items
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

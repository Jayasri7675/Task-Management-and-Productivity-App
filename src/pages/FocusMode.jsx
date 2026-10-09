import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import confetti from 'canvas-confetti';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Coffee,
  Brain,
  ListOrdered,
} from 'lucide-react';

export function FocusMode() {
  const { tasks, toggleTaskStatus, addNotification, addToast, settings } = useApp();

  const [mode, setMode] = useState('pomodoro'); // pomodoro, shortBreak, longBreak
  const [selectedTaskId, setSelectedTaskId] = useState(
    tasks.find((t) => t.status === 'In Progress')?.id || tasks[0]?.id || ''
  );

  // Durations in minutes
  const pomodoroMinutes = settings?.productivity?.focusDuration || 25;
  const shortBreakMinutes = settings?.productivity?.shortBreakDuration || 5;
  const longBreakMinutes = settings?.productivity?.longBreakDuration || 15;

  const getDurationSeconds = (m) => {
    if (m === 'pomodoro') return pomodoroMinutes * 60;
    if (m === 'shortBreak') return shortBreakMinutes * 60;
    return longBreakMinutes * 60;
  };

  const [timeLeft, setTimeLeft] = useState(getDurationSeconds('pomodoro'));
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(2); // e.g. Session 2 of 4

  const timerRef = useRef(null);

  // Switch modes
  const handleModeChange = (newMode) => {
    setIsActive(false);
    clearInterval(timerRef.current);
    setMode(newMode);
    setTimeLeft(getDurationSeconds(newMode));
  };

  // Timer Tick Hook
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      clearInterval(timerRef.current);

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#88BDF2', '#BDDDFC', '#6A89A7'],
        });
      } catch {}

      if (mode === 'pomodoro') {
        setSessionCount((prev) => (prev >= 4 ? 1 : prev + 1));
        addToast('Focus session completed! Great job 🎉 Take a break.', 'success');
        addNotification({
          title: 'Focus Session Completed',
          message: 'Deep work cycle completed. Take a well-deserved breather.',
          type: 'success',
          link: '/focus',
        });
      } else {
        addToast('Break ended. Ready for the next focus sprint!', 'info');
      }
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    clearInterval(timerRef.current);
    setTimeLeft(getDurationSeconds(mode));
  };

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const currentTask = tasks.find((t) => t.id === selectedTaskId);

  const totalTime = getDurationSeconds(mode);
  const progressPercent = Math.round(((totalTime - timeLeft) / totalTime) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 dark:text-white flex items-center justify-center gap-2.5">
          <Timer className="w-7 h-7 text-brand-400" /> Focus Mode
        </h1>
        <p className="mt-1 text-sm text-brand-600 dark:text-slate-300">
          Single-task focus without distractions. Calibrated for deep cognitive work.
        </p>
      </div>

      {/* Main Focus Timer Card */}
      <Card className="p-8 sm:p-12 text-center border border-brand-200/80 dark:border-brand-700/60 shadow-xl relative overflow-hidden">
        {/* Subtle breathing glow ring when active */}
        {isActive && (
          <div className="absolute inset-0 bg-brand-400/5 animate-pulse-subtle pointer-events-none" />
        )}

        {/* Mode Selector Tabs */}
        <div className="inline-flex items-center p-1 rounded-2xl bg-brand-50 dark:bg-slatebg-dark border border-brand-200/80 dark:border-brand-800/80 mb-8">
          <button
            onClick={() => handleModeChange('pomodoro')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === 'pomodoro'
                ? 'bg-white dark:bg-brand-800 text-brand-900 dark:text-white shadow-sm'
                : 'text-brand-500 hover:text-brand-900 dark:hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4" /> Pomodoro ({pomodoroMinutes}m)
          </button>
          <button
            onClick={() => handleModeChange('shortBreak')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === 'shortBreak'
                ? 'bg-white dark:bg-brand-800 text-brand-900 dark:text-white shadow-sm'
                : 'text-brand-500 hover:text-brand-900 dark:hover:text-white'
            }`}
          >
            <Coffee className="w-4 h-4" /> Short Break ({shortBreakMinutes}m)
          </button>
          <button
            onClick={() => handleModeChange('longBreak')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === 'longBreak'
                ? 'bg-white dark:bg-brand-800 text-brand-900 dark:text-white shadow-sm'
                : 'text-brand-500 hover:text-brand-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Long Break ({longBreakMinutes}m)
          </button>
        </div>

        {/* Digital Clock Display */}
        <div className="py-4 select-none">
          <div className="text-6xl sm:text-8xl font-mono font-extrabold text-brand-900 dark:text-white tracking-widest">
            {formattedTime}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Session {sessionCount} of 4
            </span>
            <span className="text-brand-300">•</span>
            <span className="text-xs text-brand-500 dark:text-brand-400">
              {isActive ? 'In Progress' : 'Paused'}
            </span>
          </div>

          {/* Progress Bar Indicator */}
          <div className="w-64 max-w-full mx-auto h-2 rounded-full bg-brand-100 dark:bg-brand-900/60 mt-4 overflow-hidden">
            <div
              className="h-full bg-brand-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            icon={RotateCcw}
            onClick={resetTimer}
            title="Reset Timer"
          >
            Reset
          </Button>

          <Button
            variant="primary"
            size="lg"
            icon={isActive ? Pause : Play}
            onClick={toggleTimer}
            className="px-8 shadow-glow font-bold text-base"
          >
            {isActive ? 'Pause' : 'Start Focus'}
          </Button>
        </div>
      </Card>

      {/* Target Focus Task Picker */}
      <Card className="p-6 border border-brand-200/80 dark:border-brand-700/60">
        <div className="flex items-center justify-between pb-4 border-b border-brand-100 dark:border-brand-800">
          <div>
            <h3 className="text-sm font-bold text-brand-900 dark:text-white">
              Current Focus Task
            </h3>
            <p className="text-xs text-brand-500">
              Direct all energy toward completing this single item.
            </p>
          </div>
          <ListOrdered className="w-4 h-4 text-brand-400" />
        </div>

        <div className="mt-4 space-y-4">
          <select
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-brand-200 dark:border-brand-700 bg-white dark:bg-slatebg-darkcard text-sm font-semibold text-brand-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
          >
            {tasks
              .filter((t) => t.status !== 'Completed')
              .map((t) => (
                <option key={t.id} value={t.id}>
                  [{t.priority}] {t.title} ({t.project})
                </option>
              ))}
          </select>

          {currentTask && (
            <div className="p-4 rounded-xl bg-brand-50/70 dark:bg-slatebg-dark/70 border border-brand-200/70 dark:border-brand-800/70 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-brand-900 dark:text-white truncate">
                  {currentTask.title}
                </h4>
                <p className="text-xs text-brand-500 dark:text-brand-400 truncate mt-0.5">
                  Project: {currentTask.project} • Priority: {currentTask.priority}
                </p>
              </div>

              <Button
                variant="secondary"
                size="sm"
                icon={CheckCircle2}
                onClick={() => toggleTaskStatus(currentTask.id)}
              >
                Mark Complete
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

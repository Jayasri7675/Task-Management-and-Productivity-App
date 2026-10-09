import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Trash2,
  ExternalLink,
} from 'lucide-react';

export function Notifications() {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useApp();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // all, unread

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-brand-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 dark:text-white flex items-center gap-2.5">
            <Bell className="w-7 h-7 text-brand-400" /> Notifications
          </h1>
          <p className="mt-1 text-sm text-brand-600 dark:text-slate-300">
            System alerts, project milestone logs, and deadline warnings.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="secondary"
            size="sm"
            icon={CheckCheck}
            onClick={markAllAsRead}
            className="self-start sm:self-auto"
          >
            Mark all as read
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-brand-200/80 dark:border-brand-800 pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-brand-100 text-brand-900 dark:bg-brand-900/60 dark:text-brand-200'
              : 'text-brand-500 hover:text-brand-900 dark:hover:text-white'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            filter === 'unread'
              ? 'bg-brand-100 text-brand-900 dark:bg-brand-900/60 dark:text-brand-200'
              : 'text-brand-500 hover:text-brand-900 dark:hover:text-white'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notification List */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon={CheckCircle2}
          title="You're all caught up"
          description={
            filter === 'unread'
              ? 'There are no unread notifications right now.'
              : 'No alerts in your workspace yet.'
          }
        />
      ) : (
        <div className="space-y-3 animate-fade-in">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`p-4 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-4 group cursor-pointer ${
                notif.read
                  ? 'bg-white/60 dark:bg-slatebg-darkcard/50 border-brand-100 dark:border-brand-800/60 opacity-80'
                  : 'bg-white dark:bg-slatebg-darkcard border-brand-300 dark:border-brand-700 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-900/50 shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm font-semibold truncate ${
                        notif.read
                          ? 'text-brand-700 dark:text-slate-300'
                          : 'text-brand-900 dark:text-white font-bold'
                      }`}
                    >
                      {notif.title}
                    </h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-brand-400 shrink-0" />
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-brand-600 dark:text-slate-300">
                    {notif.message}
                  </p>
                  <span className="mt-2 block text-[10px] text-brand-400 font-medium">
                    {notif.timestamp}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {notif.link && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(notif.id);
                      navigate(notif.link);
                    }}
                    className="p-1.5 text-brand-400 hover:text-brand-600 dark:hover:text-white rounded-lg hover:bg-brand-50 dark:hover:bg-brand-800/50 transition-colors"
                    title="View Resource"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notif.id);
                  }}
                  className="p-1.5 text-brand-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

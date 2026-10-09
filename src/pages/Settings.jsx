import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Toggle } from '../components/ui/Toggle';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Avatar } from '../components/ui/Avatar';
import {
  Settings as SettingsIcon,
  User,
  Palette,
  Bell,
  Timer,
  ShieldAlert,
  Sun,
  Moon,
  Laptop,
  RotateCcw,
} from 'lucide-react';

export function Settings() {
  const {
    user,
    updateUser,
    theme,
    setTheme,
    settings,
    updateSettings,
    resetToFactoryDefaults,
  } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('appearance');
  const [profileName, setProfileName] = useState(user.name);
  const [profileEmail, setProfileEmail] = useState(user.email);
  const [profileAvatar, setProfileAvatar] = useState(user.avatar || '');

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser({
      name: profileName,
      email: profileEmail,
      avatar: profileAvatar,
    });
  };

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'productivity', label: 'Productivity', icon: Timer },
    { id: 'account', label: 'Account', icon: ShieldAlert },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 dark:text-white flex items-center gap-2.5">
          <SettingsIcon className="w-7 h-7 text-brand-400" /> Workspace Settings
        </h1>
        <p className="mt-1 text-sm text-brand-600 dark:text-slate-300">
          Customize themes, notification behaviors, Pomodoro intervals, and accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation Tabs */}
        <div className="md:col-span-1 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isCurrent
                    ? 'bg-brand-100 text-brand-900 dark:bg-brand-900/60 dark:text-brand-100'
                    : 'text-brand-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-900/30'
                }`}
              >
                <Icon className="w-4 h-4 text-brand-400" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="md:col-span-3">
          {/* APPEARANCE TAB */}
          {activeTab === 'appearance' && (
            <Card className="p-6 border border-brand-200/80 dark:border-brand-700/60 space-y-6">
              <div>
                <h3 className="text-base font-bold text-brand-900 dark:text-white">
                  Interface Appearance
                </h3>
                <p className="text-xs text-brand-500">
                  Select your preferred color theme. Palette strictly aligns with #88BDF2 and #384959.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-xs font-bold transition-all ${
                    theme === 'light'
                      ? 'border-brand-400 ring-2 ring-brand-400/50 bg-brand-50/50 dark:bg-brand-900/30'
                      : 'border-brand-200 dark:border-brand-700 hover:border-brand-300'
                  }`}
                >
                  <Sun className="w-6 h-6 text-amber-500" />
                  <span>Light Mode</span>
                </button>

                <button
                  onClick={() => setTheme('dark')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-xs font-bold transition-all ${
                    theme === 'dark'
                      ? 'border-brand-400 ring-2 ring-brand-400/50 bg-brand-50/50 dark:bg-brand-900/30'
                      : 'border-brand-200 dark:border-brand-700 hover:border-brand-300'
                  }`}
                >
                  <Moon className="w-6 h-6 text-brand-400" />
                  <span>Dark Mode</span>
                </button>

                <button
                  onClick={() => setTheme('system')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-xs font-bold transition-all ${
                    theme === 'system'
                      ? 'border-brand-400 ring-2 ring-brand-400/50 bg-brand-50/50 dark:bg-brand-900/30'
                      : 'border-brand-200 dark:border-brand-700 hover:border-brand-300'
                  }`}
                >
                  <Laptop className="w-6 h-6 text-brand-500" />
                  <span>System Auto</span>
                </button>
              </div>

              <div className="border-t border-brand-100 dark:border-brand-800 pt-4 space-y-4">
                <Toggle
                  label="Show Fluid Background Meshes"
                  description="Enable subtle 3D Canvas wave animations on public and preview screens."
                  checked={settings?.appearance?.showAnimations ?? true}
                  onChange={(val) =>
                    updateSettings({
                      appearance: { ...settings.appearance, showAnimations: val },
                    })
                  }
                />
              </div>
            </Card>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <Card className="p-6 border border-brand-200/80 dark:border-brand-700/60 space-y-6">
              <div>
                <h3 className="text-base font-bold text-brand-900 dark:text-white">
                  Profile Information
                </h3>
                <p className="text-xs text-brand-500">
                  Manage your display name, email, and avatar presentation.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar src={profileAvatar} name={profileName} size="lg" />
                  <div>
                    <h4 className="text-sm font-bold text-brand-900 dark:text-white">
                      {profileName}
                    </h4>
                    <p className="text-xs text-brand-500">{profileEmail}</p>
                  </div>
                </div>

                <Input
                  label="Full Name"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />

                <Input
                  label="Email Address"
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                />

                <Input
                  label="Avatar Image URL"
                  value={profileAvatar}
                  onChange={(e) => setProfileAvatar(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                />

                <div className="pt-2 flex justify-end">
                  <Button type="submit" variant="primary">
                    Save Profile
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <Card className="p-6 border border-brand-200/80 dark:border-brand-700/60 space-y-4">
              <div>
                <h3 className="text-base font-bold text-brand-900 dark:text-white">
                  Notification Preferences
                </h3>
                <p className="text-xs text-brand-500">
                  Control when TaskFlow sends alerts and reminders.
                </p>
              </div>

              <div className="divide-y divide-brand-100 dark:divide-brand-800">
                <Toggle
                  label="Task Reminders"
                  description="Receive push notifications 1 hour before scheduled start."
                  checked={settings?.notifications?.taskReminders ?? true}
                  onChange={(val) =>
                    updateSettings({
                      notifications: { ...settings.notifications, taskReminders: val },
                    })
                  }
                />
                <Toggle
                  label="Deadline Alerts"
                  description="Alert when a task or project deadline is due within 24 hours."
                  checked={settings?.notifications?.deadlineAlerts ?? true}
                  onChange={(val) =>
                    updateSettings({
                      notifications: { ...settings.notifications, deadlineAlerts: val },
                    })
                  }
                />
                <Toggle
                  label="Productivity Insights"
                  description="Weekly summary of completed goals and velocity metrics."
                  checked={settings?.notifications?.productivityReminders ?? true}
                  onChange={(val) =>
                    updateSettings({
                      notifications: {
                        ...settings.notifications,
                        productivityReminders: val,
                      },
                    })
                  }
                />
              </div>
            </Card>
          )}

          {/* PRODUCTIVITY TAB */}
          {activeTab === 'productivity' && (
            <Card className="p-6 border border-brand-200/80 dark:border-brand-700/60 space-y-5">
              <div>
                <h3 className="text-base font-bold text-brand-900 dark:text-white">
                  Productivity & Pomodoro Defaults
                </h3>
                <p className="text-xs text-brand-500">
                  Calibrate your interval lengths for the Focus Mode session timer.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Focus Duration (min)"
                  type="number"
                  min="5"
                  max="60"
                  value={settings?.productivity?.focusDuration || 25}
                  onChange={(e) =>
                    updateSettings({
                      productivity: {
                        ...settings.productivity,
                        focusDuration: Number(e.target.value),
                      },
                    })
                  }
                />

                <Input
                  label="Short Break (min)"
                  type="number"
                  min="1"
                  max="15"
                  value={settings?.productivity?.shortBreakDuration || 5}
                  onChange={(e) =>
                    updateSettings({
                      productivity: {
                        ...settings.productivity,
                        shortBreakDuration: Number(e.target.value),
                      },
                    })
                  }
                />

                <Input
                  label="Long Break (min)"
                  type="number"
                  min="5"
                  max="30"
                  value={settings?.productivity?.longBreakDuration || 15}
                  onChange={(e) =>
                    updateSettings({
                      productivity: {
                        ...settings.productivity,
                        longBreakDuration: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>

              <Select
                label="Default Task Priority"
                value={settings?.productivity?.defaultPriority || 'Medium'}
                onChange={(e) =>
                  updateSettings({
                    productivity: {
                      ...settings.productivity,
                      defaultPriority: e.target.value,
                    },
                  })
                }
                options={[
                  { label: 'Low', value: 'Low' },
                  { label: 'Medium', value: 'Medium' },
                  { label: 'High', value: 'High' },
                  { label: 'Urgent', value: 'Urgent' },
                ]}
              />
            </Card>
          )}

          {/* ACCOUNT TAB */}
          {activeTab === 'account' && (
            <Card className="p-6 border border-brand-200/80 dark:border-brand-700/60 space-y-6">
              <div>
                <h3 className="text-base font-bold text-brand-900 dark:text-white">
                  Account Management
                </h3>
                <p className="text-xs text-brand-500">
                  Session controls and reset options for your browser workspace.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-brand-200 dark:border-brand-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-brand-900 dark:text-white">
                    Sign Out
                  </h4>
                  <p className="text-xs text-brand-500">
                    Exit the active workspace and return to the landing page.
                  </p>
                </div>
                <Button variant="secondary" size="sm" onClick={() => navigate('/')}>
                  Sign Out
                </Button>
              </div>

              <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-rose-700 dark:text-rose-400">
                    Reset Workspace to Factory Seed
                  </h4>
                  <p className="text-xs text-rose-600/80 dark:text-rose-400/80">
                    Clear local edits and restore the initial sample tasks, projects, and notifications.
                  </p>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  icon={RotateCcw}
                  onClick={() => setShowResetConfirm(true)}
                >
                  Reset Data
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={resetToFactoryDefaults}
        title="Reset Demo Data?"
        message="This will overwrite your browser changes and restore the default TaskFlow demonstration records."
        confirmText="Reset Now"
      />
    </div>
  );
}

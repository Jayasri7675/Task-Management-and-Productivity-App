import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import {
  User,
  Award,
  Flame,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Mail,
  Edit2,
  Sparkles,
  Layers,
} from 'lucide-react';

export function Profile() {
  const { user, updateUser, tasks, projects } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    title: user.title,
    bio: user.bio,
    location: user.location,
    avatar: user.avatar,
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;

  const achievements = [
    { title: 'Flow State Master', desc: 'Completed 10+ Pomodoro cycles', date: 'Earned Oct 2026' },
    { title: 'Sprint Finisher', desc: 'Resolved 5 high priority tasks in 1 day', date: 'Earned Oct 2026' },
    { title: 'Consistent Architect', desc: 'Maintained a 14-day productivity streak', date: 'Earned Sep 2026' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-700 via-brand-500 to-brand-400 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <Avatar
              src={user.avatar}
              name={user.name}
              size="xl"
              className="ring-4 ring-white/80 shadow-xl"
            />
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold">{user.name}</h1>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-white backdrop-blur-md">
                  PRO MEMBER
                </span>
              </div>
              <p className="text-brand-100 text-sm mt-0.5 font-medium">{user.title}</p>
              <div className="mt-2 flex items-center justify-center sm:justify-start gap-4 text-xs text-brand-100/90">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {user.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Joined {user.joinedDate}
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={Edit2}
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/90 hover:bg-white text-brand-900 border-none font-semibold shadow-sm shrink-0"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      {/* Editable Form Modal/Card */}
      {isEditing && (
        <Card className="p-6 border border-brand-300 dark:border-brand-700 animate-slide-up">
          <h3 className="text-base font-bold text-brand-900 dark:text-white mb-4">
            Edit Profile Details
          </h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                label="Professional Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              <Input
                label="Avatar URL"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              />
            </div>

            <div className="w-full">
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-1.5">
                Bio
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full rounded-xl border text-sm transition-all duration-200 bg-white/90 dark:bg-slatebg-darkcard/90 text-brand-900 dark:text-white p-3 border-brand-200 dark:border-brand-700/80 focus:outline-none focus:ring-2 focus:ring-brand-400/50"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 border border-brand-200/80 dark:border-brand-700/60 text-center">
          <div className="w-8 h-8 rounded-xl bg-brand-100 dark:bg-brand-900/60 text-brand-500 mx-auto flex items-center justify-center mb-2">
            <Award className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-brand-900 dark:text-white">
            {user.productivityScore}/100
          </div>
          <span className="text-xs text-brand-500">Productivity Score</span>
        </Card>

        <Card className="p-4 border border-brand-200/80 dark:border-brand-700/60 text-center">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 mx-auto flex items-center justify-center mb-2">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-brand-900 dark:text-white">
            {completedCount}
          </div>
          <span className="text-xs text-brand-500">Completed Tasks</span>
        </Card>

        <Card className="p-4 border border-brand-200/80 dark:border-brand-700/60 text-center">
          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 mx-auto flex items-center justify-center mb-2">
            <Flame className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-brand-900 dark:text-white">
            {user.streakDays} Days
          </div>
          <span className="text-xs text-brand-500">Current Streak</span>
        </Card>

        <Card className="p-4 border border-brand-200/80 dark:border-brand-700/60 text-center">
          <div className="w-8 h-8 rounded-xl bg-brand-100 dark:bg-brand-900/60 text-brand-500 mx-auto flex items-center justify-center mb-2">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold text-brand-900 dark:text-white">
            {user.focusHours}h
          </div>
          <span className="text-xs text-brand-500">Focus Hours Logged</span>
        </Card>
      </div>

      {/* Bio and Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* About Bio */}
        <Card className="p-6 border border-brand-200/80 dark:border-brand-700/60">
          <h3 className="text-sm font-bold text-brand-900 dark:text-white mb-2">
            About Me
          </h3>
          <p className="text-sm text-brand-600 dark:text-slate-300 leading-relaxed">
            {user.bio}
          </p>

          <div className="mt-6 pt-4 border-t border-brand-100 dark:border-brand-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-brand-500">Email:</span>
              <span className="font-semibold text-brand-900 dark:text-white">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-500">Work Mode:</span>
              <span className="font-semibold text-brand-900 dark:text-white">Deep Flow</span>
            </div>
          </div>
        </Card>

        {/* Badges / Achievements */}
        <Card className="p-6 border border-brand-200/80 dark:border-brand-700/60">
          <h3 className="text-sm font-bold text-brand-900 dark:text-white mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-400" /> Workspace Milestones
          </h3>
          <div className="space-y-3">
            {achievements.map((ach, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-brand-100 dark:border-brand-800/80 bg-brand-50/40 dark:bg-slatebg-dark/40 flex items-center justify-between"
              >
                <div>
                  <h5 className="text-xs font-bold text-brand-900 dark:text-white">
                    {ach.title}
                  </h5>
                  <p className="text-[11px] text-brand-500">{ach.desc}</p>
                </div>
                <span className="text-[10px] text-brand-400 font-semibold">{ach.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';

// Public Pages
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ForgotPassword } from '../pages/ForgotPassword';

// Application Pages
import { Dashboard } from '../pages/Dashboard';
import { Tasks } from '../pages/Tasks';
import { Kanban } from '../pages/Kanban';
import { Calendar } from '../pages/Calendar';
import { Projects } from '../pages/Projects';
import { Analytics } from '../pages/Analytics';
import { FocusMode } from '../pages/FocusMode';
import { Notifications } from '../pages/Notifications';
import { Settings } from '../pages/Settings';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Guest Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Authenticated Workspace Application Layout */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/focus" element={<FocusMode />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

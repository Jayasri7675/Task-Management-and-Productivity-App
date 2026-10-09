import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui/Avatar';
import {
  LayoutDashboard,
  CheckSquare,
  Kanban,
  CalendarDays,
  FolderKanban,
  BarChart3,
  Timer,
  Bell,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';

export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { user, notifications } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const mainNav = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Kanban', path: '/kanban', icon: Kanban },
    { name: 'Calendar', path: '/calendar', icon: CalendarDays },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Focus Mode', path: '/focus', icon: Timer },
  ];

  const secondaryNav = [
    {
      name: 'Notifications',
      path: '/notifications',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : null,
    },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
      isActive
        ? 'bg-brand-100 text-brand-900 font-semibold shadow-sm dark:bg-brand-900/60 dark:text-brand-100 border border-brand-200/80 dark:border-brand-700/60'
        : 'text-brand-600 dark:text-slate-300 hover:bg-brand-50/80 dark:hover:bg-brand-900/30 hover:text-brand-900 dark:hover:text-white'
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white/95 dark:bg-slatebg-darkcard/95 backdrop-blur-md border-r border-brand-200/80 dark:border-brand-800/80 select-none">
      {/* Brand Logo Header */}
      <div className="p-4 flex items-center justify-between border-b border-brand-100 dark:border-brand-800/80">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2.5 overflow-hidden"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-400 flex items-center justify-center text-white shadow-sm shrink-0">
            <Layers className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-brand-900 dark:text-white">
                TASK<span className="text-brand-400">FLOW</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-500 dark:text-brand-400">
                Workspace
              </span>
            </div>
          )}
        </NavLink>
        {setCollapsed && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-brand-400 hover:text-brand-600 dark:hover:text-brand-200 hover:bg-brand-50 dark:hover:bg-brand-800/50 transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="space-y-1">
          {mainNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={navItemClass}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="w-5 h-5 shrink-0 text-brand-500 dark:text-brand-400 group-hover:scale-105 transition-transform" />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </div>

        <div className="pt-4 pb-2">
          <div className="border-t border-brand-100 dark:border-brand-800/80" />
        </div>

        <div className="space-y-1">
          {secondaryNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={navItemClass}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="w-5 h-5 shrink-0 text-brand-500 dark:text-brand-400 group-hover:scale-105 transition-transform" />
              {!collapsed && <span className="flex-1">{item.name}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto px-1.5 py-0.5 text-xs font-bold rounded-full bg-brand-400 text-brand-950">
                  {item.badge}
                </span>
              )}
              {collapsed && item.badge && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-400" />
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-brand-100 dark:border-brand-800/80">
        <NavLink
          to="/profile"
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-800/40 transition-colors"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        >
          <Avatar src={user.avatar} name={user.name} size="sm" statusIndicator="online" />
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-brand-900 dark:text-white truncate">
                {user.name}
              </span>
              <span className="text-xs text-brand-500 dark:text-brand-400 truncate">
                {user.email}
              </span>
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block transition-all duration-300 ease-in-out shrink-0 sticky top-0 h-screen z-30 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-brand-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex flex-col w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-slide-up">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

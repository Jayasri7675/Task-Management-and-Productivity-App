import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_USER,
  INITIAL_PROJECTS,
  INITIAL_TASKS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SETTINGS,
} from '../data/initialData';
import {
  STORAGE_KEYS,
  loadFromStorage,
  saveToStorage,
  clearAllTaskFlowStorage,
} from '../utils/storage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // 1. Theme State
  const [theme, setThemeState] = useState(() => {
    return loadFromStorage(STORAGE_KEYS.THEME, 'light');
  });

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let isDark = false;
      if (theme === 'dark') {
        isDark = true;
      } else if (theme === 'system') {
        isDark = mediaQuery.matches;
      }
      
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();
    saveToStorage(STORAGE_KEYS.THEME, theme);

    const listener = () => {
      if (theme === 'system') applyTheme();
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  // 2. User State
  const [user, setUser] = useState(() => {
    return loadFromStorage(STORAGE_KEYS.USER, INITIAL_USER);
  });

  const updateUser = (fields) => {
    setUser((prev) => {
      const updated = { ...prev, ...fields };
      saveToStorage(STORAGE_KEYS.USER, updated);
      return updated;
    });
    addToast('Profile updated successfully', 'success');
  };

  // 3. Projects State
  const [projects, setProjects] = useState(() => {
    return loadFromStorage(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  });

  const addProject = (projectData) => {
    const newProj = {
      ...projectData,
      id: `proj-${Date.now()}`,
      totalTasks: 0,
      completedTasks: 0,
      color: projectData.color || '#88BDF2',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProjects((prev) => {
      const updated = [newProj, ...prev];
      saveToStorage(STORAGE_KEYS.PROJECTS, updated);
      return updated;
    });
    addToast(`Project "${newProj.name}" created`, 'success');
    addNotification({
      title: 'New Project Created',
      message: `Project "${newProj.name}" has been started.`,
      type: 'info',
      link: '/projects',
    });
    return newProj;
  };

  const updateProject = (id, fields) => {
    setProjects((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...fields } : p));
      saveToStorage(STORAGE_KEYS.PROJECTS, updated);
      return updated;
    });
    addToast('Project updated', 'info');
  };

  const deleteProject = (id) => {
    setProjects((prev) => {
      const target = prev.find((p) => p.id === id);
      const updated = prev.filter((p) => p.id !== id);
      saveToStorage(STORAGE_KEYS.PROJECTS, updated);
      if (target) {
        addToast(`Project "${target.name}" removed`, 'info');
      }
      return updated;
    });
  };

  // 4. Tasks State
  const [tasks, setTasks] = useState(() => {
    return loadFromStorage(STORAGE_KEYS.TASKS, INITIAL_TASKS);
  });

  // Keep project task statistics synchronized with task list
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TASKS, tasks);
    
    // Update totalTasks & completedTasks on projects
    setProjects((prevProjects) => {
      let changed = false;
      const updated = prevProjects.map((proj) => {
        const projTasks = tasks.filter((t) => t.project === proj.name || t.projectId === proj.id);
        const total = projTasks.length;
        const completed = projTasks.filter((t) => t.status === 'Completed').length;
        if (proj.totalTasks !== total || proj.completedTasks !== completed) {
          changed = true;
          return { ...proj, totalTasks: total, completedTasks: completed };
        }
        return proj;
      });
      if (changed) {
        saveToStorage(STORAGE_KEYS.PROJECTS, updated);
        return updated;
      }
      return prevProjects;
    });
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      tags: Array.isArray(taskData.tags)
        ? taskData.tags
        : (taskData.tags || '')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
    };
    setTasks((prev) => [newTask, ...prev]);
    addToast(`Task "${newTask.title}" created`, 'success');
    return newTask;
  };

  const updateTask = (id, fields) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = { ...t, ...fields };
          if (fields.tags && typeof fields.tags === 'string') {
            updated.tags = fields.tags.split(',').map((x) => x.trim()).filter(Boolean);
          }
          return updated;
        }
        return t;
      })
    );
    addToast('Task updated', 'info');
  };

  const deleteTask = (id) => {
    setTasks((prev) => {
      const target = prev.find((t) => t.id === id);
      const updated = prev.filter((t) => t.id !== id);
      if (target) {
        addToast(`Task "${target.title}" deleted`, 'info');
      }
      return updated;
    });
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const isCompleting = t.status !== 'Completed';
          const newStatus = isCompleting ? 'Completed' : 'In Progress';
          
          if (isCompleting) {
            // Trigger joyful subtle celebration
            try {
              confetti({
                particleCount: 45,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#88BDF2', '#6A89A7', '#BDDDFC', '#384959'],
              });
            } catch {
              // fallback gracefully
            }
            addToast('Task completed! Keep up the momentum 🎉', 'success');
          } else {
            addToast('Task marked In Progress', 'info');
          }

          return {
            ...t,
            status: newStatus,
            completedAt: isCompleting ? new Date().toISOString().split('T')[0] : null,
          };
        }
        return t;
      })
    );
  };

  const moveTaskStatus = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const isCompleting = newStatus === 'Completed' && t.status !== 'Completed';
          if (isCompleting) {
            try {
              confetti({
                particleCount: 40,
                spread: 55,
                origin: { y: 0.75 },
                colors: ['#88BDF2', '#BDDDFC', '#6A89A7'],
              });
            } catch {}
          }
          return {
            ...t,
            status: newStatus,
            completedAt: newStatus === 'Completed' ? new Date().toISOString().split('T')[0] : null,
          };
        }
        return t;
      })
    );
    addToast(`Moved to ${newStatus}`, 'info');
  };

  // 5. Notifications State
  const [notifications, setNotifications] = useState(() => {
    return loadFromStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  });

  const addNotification = ({ title, message, type = 'info', link = '/tasks' }) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      timestamp: 'Just now',
      read: false,
      link,
    };
    setNotifications((prev) => {
      const updated = [newNotif, ...prev];
      saveToStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
      return updated;
    });
  };

  const markAsRead = (id) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      saveToStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      saveToStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
      return updated;
    });
    addToast('All notifications marked as read', 'info');
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      saveToStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
      return updated;
    });
  };

  // 6. Settings State
  const [settings, setSettings] = useState(() => {
    return loadFromStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  });

  const updateSettings = (fields) => {
    setSettings((prev) => {
      const updated = { ...prev, ...fields };
      saveToStorage(STORAGE_KEYS.SETTINGS, updated);
      return updated;
    });
    addToast('Settings updated', 'success');
  };

  // 7. Modals and Global UI State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Ctrl + K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openCreateTaskModal = (initialData = {}) => {
    setEditingTask(initialData);
    setIsTaskModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const openCreateProjectModal = (initialData = {}) => {
    setEditingProject(initialData);
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  // 8. Toast Notifications System
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Reset to default
  const resetToFactoryDefaults = () => {
    clearAllTaskFlowStorage();
    setUser(INITIAL_USER);
    setProjects(INITIAL_PROJECTS);
    setTasks(INITIAL_TASKS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSettings(INITIAL_SETTINGS);
    setThemeState('light');
    addToast('Reset to demo data successfully', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        // Theme
        theme,
        setTheme,
        // User
        user,
        updateUser,
        // Tasks
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        moveTaskStatus,
        // Projects
        projects,
        addProject,
        updateProject,
        deleteProject,
        // Notifications
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        // Settings
        settings,
        updateSettings,
        // Modal states & helpers
        isTaskModalOpen,
        editingTask,
        openCreateTaskModal,
        openEditTaskModal,
        closeTaskModal,
        isProjectModalOpen,
        editingProject,
        openCreateProjectModal,
        closeProjectModal,
        // Command Palette
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        // Toasts
        toasts,
        addToast,
        removeToast,
        // Reset
        resetToFactoryDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// LocalStorage utility for TaskFlow

export const STORAGE_KEYS = {
  TASKS: 'taskflow_tasks',
  PROJECTS: 'taskflow_projects',
  NOTIFICATIONS: 'taskflow_notifications',
  SETTINGS: 'taskflow_settings',
  THEME: 'taskflow_theme',
  USER: 'taskflow_user',
};

export function loadFromStorage(key, fallbackValue) {
  try {
    const item = localStorage.getItem(key);
    if (item === null || item === undefined) {
      return fallbackValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return fallbackValue;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving localStorage key "${key}":`, error);
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
}

export function clearAllTaskFlowStorage() {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}

// Initial Seed Data for TaskFlow
// Color tokens: #88BDF2 (Primary), #6A89A7 (Primary dark), #BDDDFC (Light accent), #384959 (Dark navy)

export const INITIAL_USER = {
  name: "Bujji",
  email: "bujji@taskflow.dev",
  title: "Frontend Engineer & Product Designer",
  bio: "Crafting modern, accessible, and high-performance digital workspaces.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  location: "Bangalore, India",
  joinedDate: "January 2026",
  productivityScore: 94,
  streakDays: 14,
  completedTasksCount: 42,
  focusHours: 38.5,
};

export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    name: "Website Development",
    description: "Architecting and polishing the production SaaS platform design and component library.",
    deadline: "2026-10-25",
    status: "In Progress",
    color: "#88BDF2",
    totalTasks: 20,
    completedTasks: 16,
    category: "Engineering",
  },
  {
    id: "proj-2",
    name: "GATE Preparation",
    description: "Systematic revision of core CS fundamentals, algorithms, operating systems, and practice mock exams.",
    deadline: "2026-12-15",
    status: "In Progress",
    color: "#6A89A7",
    totalTasks: 20,
    completedTasks: 9,
    category: "Education",
  },
  {
    id: "proj-3",
    name: "College Project",
    description: "Final semester distributed systems submission, research thesis paper, and final viva presentation.",
    deadline: "2026-11-05",
    status: "In Review",
    color: "#384959",
    totalTasks: 10,
    completedTasks: 7,
    category: "Academic",
  },
  {
    id: "proj-4",
    name: "Personal Goals",
    description: "Daily coding habits, technical reading, open source contributions, and fitness routines.",
    deadline: "2026-11-30",
    status: "Ongoing",
    color: "#526F8B",
    totalTasks: 10,
    completedTasks: 6,
    category: "Personal",
  },
];

const todayStr = new Date().toISOString().split('T')[0];
const tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const tomorrowStr = tomorrowDate.toISOString().split('T')[0];

const dayAfterDate = new Date();
dayAfterDate.setDate(dayAfterDate.getDate() + 2);
const dayAfterStr = dayAfterDate.toISOString().split('T')[0];

const nextWeekDate = new Date();
nextWeekDate.setDate(nextWeekDate.getDate() + 5);
const nextWeekStr = nextWeekDate.toISOString().split('T')[0];

export const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Complete React Dashboard",
    description: "Finalize the responsive layout, KPI summary cards, and interactive widgets with seamless dark mode support.",
    project: "Website Development",
    projectId: "proj-1",
    priority: "High", // Low, Medium, High, Urgent
    status: "In Progress", // To Do, In Progress, Completed
    dueDate: todayStr,
    category: "Development",
    tags: ["React", "UI/UX", "Dashboard"],
    createdAt: "2026-10-01",
  },
  {
    id: "task-2",
    title: "Study Data Structures",
    description: "Deep dive into Graph Traversals (DFS, BFS), Dijkstra's algorithm, and solve 3 LeetCode problems.",
    project: "Personal Goals",
    projectId: "proj-4",
    priority: "Medium",
    status: "To Do",
    dueDate: todayStr,
    category: "Learning",
    tags: ["DSA", "Algorithms", "Practice"],
    createdAt: "2026-10-02",
  },
  {
    id: "task-3",
    title: "Prepare GATE Notes",
    description: "Review Chapter 4 on Operating Systems: CPU scheduling, Deadlocks, and Paging memory management.",
    project: "GATE Preparation",
    projectId: "proj-2",
    priority: "Urgent",
    status: "To Do",
    dueDate: tomorrowStr,
    category: "Study",
    tags: ["GATE", "OS", "Revision"],
    createdAt: "2026-10-03",
  },
  {
    id: "task-4",
    title: "Submit College Assignment",
    description: "Compile PDF lab report with benchmarking diagrams and upload to the university submission portal.",
    project: "College Project",
    projectId: "proj-3",
    priority: "High",
    status: "Completed",
    dueDate: todayStr,
    category: "Academic",
    tags: ["Assignment", "Submission"],
    createdAt: "2026-10-01",
    completedAt: todayStr,
  },
  {
    id: "task-5",
    title: "Review Project Documentation",
    description: "Ensure README setup guides, architecture decisions, and component API references are up to date.",
    project: "Website Development",
    projectId: "proj-1",
    priority: "Medium",
    status: "In Progress",
    dueDate: dayAfterStr,
    category: "Documentation",
    tags: ["Docs", "Review"],
    createdAt: "2026-10-04",
  },
  {
    id: "task-6",
    title: "Design Landing Page",
    description: "Created high-converting hero section with interactive preview and refined color tokens.",
    project: "Website Development",
    projectId: "proj-1",
    priority: "High",
    status: "Completed",
    dueDate: todayStr,
    category: "Design",
    tags: ["Landing", "Figma", "SaaS"],
    createdAt: "2026-10-02",
    completedAt: todayStr,
  },
  {
    id: "task-7",
    title: "Complete SQL Practice",
    description: "Practice window functions, complex CTE queries, and index optimization benchmarks on Postgres.",
    project: "Personal Goals",
    projectId: "proj-4",
    priority: "Low",
    status: "To Do",
    dueDate: nextWeekStr,
    category: "Database",
    tags: ["SQL", "Postgres", "Queries"],
    createdAt: "2026-10-05",
  },
  {
    id: "task-8",
    title: "Prepare Presentation",
    description: "Design 12 slides detailing system architecture, load testing metrics, and project demo walkthrough.",
    project: "College Project",
    projectId: "proj-3",
    priority: "Medium",
    status: "In Progress",
    dueDate: tomorrowStr,
    category: "Presentation",
    tags: ["Slides", "Demo", "College"],
    createdAt: "2026-10-05",
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Upcoming Deadline",
    message: "React Dashboard is due today at 6:00 PM.",
    type: "warning", // warning, success, info
    timestamp: "10 minutes ago",
    read: false,
    link: "/tasks",
  },
  {
    id: "notif-2",
    title: "Daily Milestone Achieved",
    message: "You completed 5 tasks today! Keep the streak going.",
    type: "success",
    timestamp: "1 hour ago",
    read: false,
    link: "/analytics",
  },
  {
    id: "notif-3",
    title: "Project Milestone",
    message: "Website Development project reached 80% completion.",
    type: "info",
    timestamp: "3 hours ago",
    read: true,
    link: "/projects",
  },
  {
    id: "notif-4",
    title: "Focus Session Completed",
    message: "Deep Work session (25 mins) successfully logged.",
    type: "success",
    timestamp: "Yesterday",
    read: true,
    link: "/focus",
  },
];

export const INITIAL_SETTINGS = {
  theme: "system", // light, dark, system
  appearance: {
    compactMode: false,
    showAnimations: true,
    soundEffects: false,
  },
  notifications: {
    taskReminders: true,
    deadlineAlerts: true,
    productivityReminders: true,
    emailSummary: false,
  },
  productivity: {
    defaultPriority: "Medium",
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    dailyGoalTasks: 6,
  },
};

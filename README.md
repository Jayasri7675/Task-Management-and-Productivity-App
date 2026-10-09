# TASKFLOW — Modern Productivity & Task Management Workspace

![TaskFlow Header](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&auto=format&fit=crop&q=80)

**TASKFLOW** is a portfolio-quality, frontend-only productivity platform and task orchestration suite. Engineered with a **Clean SaaS + subtle futuristic** aesthetic, TaskFlow blends calm design, micro-interactions, fluid Kanban workflows, interactive Pomodoro focus sessions, and analytical telemetry into an intuitive experience.

---

## 🎨 Design Reference & Brand Palette

The user interface strictly adheres to a cohesive, calm blue palette curated for deep focus and visual clarity:

| Color Token | Hex Code | Semantic Role |
| :--- | :--- | :--- |
| **Primary** | `#88BDF2` | High-emphasis actions, active states, progress indicators, glow accents |
| **Primary Dark** | `#6A89A7` | Secondary accents, structural elements, muted indicators |
| **Light Accent** | `#BDDDFC` | Soft backgrounds, badges, subtle highlights, scrollbar tracks |
| **Dark Navy** | `#384959` | Typography headings, dark theme borders, primary brand logos |

---

## ✨ Key Features

### 1. 🌐 Public Experience
- **Landing Page**: High-converting SaaS landing page with interactive 60fps 3D canvas mesh wave, feature breakdowns, live dashboard preview, statistics counter, and call-to-action sections.
- **Demo Authentication**: Polished, simulated login, registration, and forgot password pages with pre-filled demo accounts.

### 2. 📊 Productivity Dashboard
- **Dynamic Greeting**: Time-aware greeting (`Good morning / afternoon / evening, Bujji 👋`).
- **Telemetry KPI Cards**: Real-time counters for Total Tasks, Completed, In Progress, and Overdue items with velocity trends.
- **Today's Focus & Deadlines**: Imminent action items with quick toggle completion and overdue detection.
- **Velocity Chart**: Weekly completion histogram displaying daily output vs targets.
- **Activity Log**: Real-time event stream of completed items and project updates.

### 3. ✅ Smart Task Management
- **Full CRUD Support**: Add, view, edit, delete, and complete tasks with animated celebratory confetti.
- **Multi-Factor Filtering**: Real-time search across titles, descriptions, and tags, alongside Status, Priority, Project, and Due Date filters.
- **Prioritization Matrix**: Categorize tasks into *Low*, *Medium*, *High*, and *Urgent*.

### 4. 📋 Interactive Kanban Board
- **Three Core Stages**: `To Do`, `In Progress`, and `Completed`.
- **Drag-and-Drop Workflow**: Native HTML5 Drag & Drop with column hover rings and quick mobile mover buttons.
- **Instant Persistence**: Any status transition immediately reflects across the Dashboard, Calendar, and Analytics.

### 5. 📅 Calendar Schedule
- **Multi-View Modes**: Switch effortlessly between **Month**, **Week**, and **Day** agendas.
- **Deadlines Overlay**: Color-coded task pills directly plotted on the calendar matrix.
- **Date Scheduling**: Select any day to view scheduled items or instantly create a new task for that target date.

### 6. 📁 Project Portfolio
- **Grouped Initiatives**: Track large endeavors like *Website Development*, *GATE Preparation*, *College Project*, and *Personal Goals*.
- **Progress Bars**: Dynamic calculation of completion percentages (`16 / 20 tasks completed`).
- **Target Deadlines**: Target completion dates and color-coded initiative labels.

### 7. 📈 Productivity Analytics
- **Workspace Score**: Algorithmic productivity rating out of 100.
- **Velocity Telemetry**: Output velocity vs daily goals across the week.
- **Urgency Distribution**: Priority breakdown charts.
- **Productivity Insights**: Actionable, AI-styled telemetry insights (e.g., peak productive day).

### 8. ⏱️ Focus Mode (Interactive Pomodoro)
- **Live Functional Timer**: Fully working frontend countdown timer with Start, Pause, and Reset controls.
- **Interval Modes**: 25m Pomodoro, 5m Short Break, and 15m Long Break (customizable in Settings).
- **Task Binding**: Select any active workspace task to focus on during your deep work sprint.
- **Celebration Trigger**: Automatic confetti explosion and notification alert upon cycle completion.

### 9. 🔔 Notification Center
- **Workspace Alerts**: Deadline reminders, milestone completions, and focus session logs.
- **State Controls**: Mark individual items read/unread, mark all as read, or delete notifications.

### 10. ⚙️ Settings & Personalization
- **Theme Engine**: Seamless toggle between **Light Mode**, **Dark Mode**, and **System Preference**.
- **User Profile**: Update profile name, email, avatar image, and professional bio.
- **Pomodoro Durations**: Configure customized focus and break lengths.
- **Demo Data Reset**: One-click restore button to reset the workspace to initial seed data.

### 11. 🔍 Global Command Palette (`Ctrl + K`)
- Instantly search tasks, projects, or jump straight to any page from anywhere in the app with keyboard shortcuts.

---

## 🛠️ Tech Stack & Ecosystem

- **Framework**: React 19 + JavaScript (ESNext)
- **Bundler & Tooling**: Vite 8
- **Styling**: Tailwind CSS v3 with customized design tokens & dark mode classes
- **Routing**: React Router v7 (`BrowserRouter`, nested layouts, dynamic routes)
- **Icons**: Lucide React
- **Micro-Interactions**: Canvas Confetti, CSS keyframe animations, Uiverse-inspired buttons and toggles
- **Canvas Mesh**: Lightweight, responsive native 2D/3D projection wave matching brand colors
- **Persistence**: Browser `localStorage`

---

## 📂 Project Architecture

```
fsdproject/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── App.css
    ├── context/
    │   └── AppContext.jsx          # Central reactive state & localStorage sync
    ├── data/
    │   └── initialData.js          # Realistic seed data for demo tasks & projects
    ├── utils/
    │   ├── storage.js              # LocalStorage read/write/remove helpers
    │   └── helpers.js              # Date formatters, badge styles, priority logic
    ├── routes/
    │   └── AppRoutes.jsx           # All 14 public & authenticated routes
    ├── components/
    │   ├── ui/
    │   │   ├── Button.jsx          # Press micro-interactions & loading states
    │   │   ├── Input.jsx           # Clean forms with icon prefix
    │   │   ├── Select.jsx          # Custom styled select boxes
    │   │   ├── Badge.jsx           # Restrained priority and status badges
    │   │   ├── Card.jsx            # Glassmorphism panels and cards
    │   │   ├── Modal.jsx           # Accessible dialog backdrop with ESC dismiss
    │   │   ├── ConfirmDialog.jsx   # Confirmation before delete actions
    │   │   ├── Toast.jsx           # Slide-up auto-dismissing alerts
    │   │   ├── Toggle.jsx          # Modern switch component
    │   │   ├── Checkbox.jsx        # Custom checkmark control
    │   │   ├── EmptyState.jsx      # Friendly empty placeholders
    │   │   ├── Skeleton.jsx        # Shimmer loading placeholders
    │   │   ├── Avatar.jsx          # Fallback initials & status dots
    │   │   └── ThreeCanvas.jsx     # High-performance 3D canvas mesh wave
    │   ├── layout/
    │   │   ├── AppLayout.jsx       # Authenticated container with sidebar & header
    │   │   ├── Sidebar.jsx         # Collapsible desktop menu & mobile drawer
    │   │   ├── Header.jsx          # Command trigger, theme switcher, profile dropdown
    │   │   ├── CommandPalette.jsx  # Global Ctrl+K live search modal
    │   │   ├── PublicNavbar.jsx    # Guest marketing navigation
    │   │   └── PublicFooter.jsx    # Marketing footer with sitemap
    │   ├── tasks/
    │   │   ├── TaskCard.jsx        # Rich task card with actions
    │   │   ├── TaskModal.jsx       # Task creation & edit modal
    │   │   └── TaskFilterBar.jsx   # Search, filters, and sorters
    │   └── projects/
    │       ├── ProjectCard.jsx     # Progress bar, task count, deadline
    │       └── ProjectModal.jsx    # Initiative creation modal
    └── pages/
        ├── Landing.jsx             # Public SaaS marketing page
        ├── Login.jsx               # Guest sign-in screen
        ├── Register.jsx            # Guest sign-up screen
        ├── ForgotPassword.jsx      # Guest recovery screen
        ├── Dashboard.jsx           # KPI metrics, today focus, velocity chart
        ├── Tasks.jsx               # Complete task management
        ├── Kanban.jsx              # Drag-and-drop workflow
        ├── Calendar.jsx            # Month, week, day schedules
        ├── Projects.jsx            # Project overview & milestone progress
        ├── Analytics.jsx           # Telemetry charts & productivity score
        ├── FocusMode.jsx           # Interactive Pomodoro session timer
        ├── Notifications.jsx       # Notification feed & filter
        ├── Settings.jsx            # Appearance, notifications, intervals
        ├── Profile.jsx             # User stats, bio, achievements
        └── NotFound.jsx            # 404 fallback page
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18+ or 20+ recommended)
- npm or yarn

### 1. Installation
Clone the repository and install all dependencies:
```bash
npm install
```

### 2. Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

### 3. Production Build
To verify and create an optimized production build:
```bash
npm run build
npm run preview
```

---

## 💾 LocalStorage Persistence Architecture

Because TaskFlow is an autonomous frontend platform without external server requirements, all states are seeded on first launch and subsequently synchronized with browser `localStorage`:

- `taskflow_tasks`: Task items, tags, priorities, completion dates
- `taskflow_projects`: Projects, target deadlines, milestones
- `taskflow_notifications`: Notifications and read statuses
- `taskflow_settings`: Theme preference, Pomodoro duration settings
- `taskflow_theme`: `light` | `dark` | `system`
- `taskflow_user`: Display name, bio, title, avatar

Any addition, update, completion, or deletion immediately synchronizes with `localStorage`. Refreshing or reopening the browser maintains full state continuity. You can restore original seed data at any time via **Settings → Reset Workspace to Factory Seed**.

---

## 🔮 Future Backend Integration Possibilities

While TaskFlow is designed to function completely client-side for portfolio and offline demonstration, its modular React context architecture allows straightforward integration with backend services:
1. **Authentication**: Wire `Login.jsx` and `Register.jsx` to Supabase Auth, Firebase Auth, or NextAuth.
2. **Database & API**: Replace `storage.js` with TanStack Query (React Query) connected to a Node.js / Express / PostgreSQL or Supabase REST/GraphQL API.
3. **Real-time Sync**: Add WebSockets or Supabase Realtime for multi-user collaborative Kanban boards.
4. **Push Notifications**: Connect service workers to the Web Push API for deadline alerts.

---

## 📄 License
This project is open-source and available under the **MIT License**.

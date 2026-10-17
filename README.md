# CloudOps Portal — Frontend Application (ITELECT4 GT4)

Modern single-page application (SPA) for the CloudOps Infrastructure Provisioning and Workspace Management Portal.

## 🔗 Live Deployments & Repositories

- **Live Frontend App:** [https://itelect4-project-paulot.vercel.app](https://itelect4-project-paulot.vercel.app)
- **Live Backend API:** [https://itelect4-backend-sand.vercel.app](https://itelect4-backend-sand.vercel.app)
- **Frontend GitHub Repo:** [https://github.com/papap7/itelect4-project-paulot](https://github.com/papap7/itelect4-project-paulot)
- **Backend GitHub Repo:** [https://github.com/papap7/itelect4-backend](https://github.com/papap7/itelect4-backend)

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui components
- **Routing:** React Router v7
- **Server State & Caching:** TanStack React Query v5
- **Client State:** Zustand with persistent storage
- **Form Validation:** React Hook Form + Zod
- **Deployment:** Vercel

---

## ✨ Features

- **Dashboard:** Real-time infrastructure metrics (workspaces, engineers, pending requests count), workspace search filter, and engineering team roster.
- **Reference Workspaces:** Fetches and displays all available workspaces live from the backend API.
- **User Authentication:** Registration and login authenticated via JWT with state persisted in client storage.
- **Provision Requests:** Protected workflow allowing engineers to request infrastructure provisioning with cloud provider validation (AWS, GCP, Azure).

---

## 💻 Local Development

1. **Clone repository:**
   ```bash
   git clone https://github.com/papap7/itelect4-project-paulot.git
   cd itelect4-project-paulot
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment:**
   Create `.env` using `.env.example`:
   ```env
   VITE_API_URL=https://itelect4-backend-sand.vercel.app
   ```
4. **Run Dev Server:**
   ```bash
   npm run dev
   ```
5. **Build for Production:**
   ```bash
   npm run build
   ```

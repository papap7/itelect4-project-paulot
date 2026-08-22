import { NavLink, Outlet } from "react-router";
import useUiStore from "../store/uiStore";
import useAuthStore from "../store/authStore";
import { Cloud, LayoutDashboard, FolderKanban, Activity, LogOut, LogIn, Moon, Sun } from "lucide-react";

function Layout() {
  const isDarkMode = useUiStore((state) => state.isDarkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  const base = "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300";
  const activeLink = `${base} bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400`;
  const idleLink = `${base} text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-50`;

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? activeLink : idleLink;

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] font-sans transition-colors duration-300">
        
        {/* Glassmorphic Header */}
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/70 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0B1120]/70">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
                  <Cloud className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  CloudOps
                </span>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                <NavLink to="/" end className={linkClass}>
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </NavLink>
                <NavLink to="/workspaces" className={linkClass}>
                  <FolderKanban className="h-4 w-4" />
                  Workspaces
                </NavLink>
                <NavLink to="/requests" className={linkClass}>
                  <Activity className="h-4 w-4" />
                  Requests
                </NavLink>
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <div className="h-5 w-px bg-slate-200 dark:bg-slate-800"></div>

              {userName === null ? (
                <NavLink to="/login" className={`${base} bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100`}>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </NavLink>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{userName}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Engineer</span>
                  </div>
                  <button 
                    onClick={logout} 
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400 dark:hover:border-red-500/20"
                    title="Sign out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Mobile Navigation (Visible only on small screens) */}
        <nav className="flex md:hidden items-center justify-around border-b border-slate-200 bg-white/50 px-2 py-2 backdrop-blur-md dark:border-slate-800 dark:bg-[#0B1120]/50">
           <NavLink to="/" end className={linkClass}>
             <LayoutDashboard className="h-4 w-4" />
           </NavLink>
           <NavLink to="/workspaces" className={linkClass}>
             <FolderKanban className="h-4 w-4" />
           </NavLink>
           <NavLink to="/requests" className={linkClass}>
             <Activity className="h-4 w-4" />
           </NavLink>
        </nav>

        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;

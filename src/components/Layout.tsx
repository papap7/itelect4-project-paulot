import { NavLink, Outlet } from "react-router";
import useUiStore from "../store/uiStore";
import useAuthStore from "../store/authStore";

function Layout() {
  const isDarkMode = useUiStore((state) => state.isDarkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  const baseLinkClass = "flex items-center rounded-lg px-4 py-3 font-medium transition-all duration-200";
  const activeLink = `${baseLinkClass} bg-blue-600 text-white shadow-md`;
  const idleLink = `${baseLinkClass} text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white`;

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? activeLink : idleLink;

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200 text-gray-900 dark:text-gray-100">
        
        {/* Sidebar */}
        <aside className="w-64 flex flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm hidden md:flex">
          <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-800">
            <span className="text-xl font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">CloudOps</span>
          </div>
          <nav className="flex-1 space-y-2 p-4">
            <NavLink to="/" end className={linkClass}>
              <span className="mr-3 text-lg">📊</span> Dashboard
            </NavLink>
            <NavLink to="/workspaces" className={linkClass}>
              <span className="mr-3 text-lg">🖥️</span> Workspaces
            </NavLink>
            <NavLink to="/requests" className={linkClass}>
              <span className="mr-3 text-lg">📝</span> Requests
            </NavLink>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8 dark:border-gray-800 dark:bg-gray-900 shadow-sm z-10">
            <div className="flex items-center md:hidden">
              <span className="text-xl font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">CloudOps</span>
            </div>
            
            <div className="ml-auto flex items-center space-x-6">
              <button
                onClick={toggleDarkMode}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>

              <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>

              {userName === null ? (
                <NavLink to="/login" className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
                  Login
                </NavLink>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{userName}</span>
                  </div>
                  <button 
                    onClick={logout} 
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-8 relative">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;

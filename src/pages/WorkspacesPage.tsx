import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import WorkspaceCard from "../components/WorkspaceCard";
import type { ApiWorkspace } from "../types/index";
import { fetchWorkspaces } from "../api/client";

function WorkspacesPage() {
  const { data: workspaces = [], isPending, isError, error } = useQuery<ApiWorkspace[]>({
    queryKey: ["workspaces"],
    queryFn: fetchWorkspaces,
  });

  if (isPending) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center space-x-3 text-gray-500">
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
          <span className="text-lg font-medium">Loading workspaces...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-red-50 p-6 border border-red-100 text-red-700 dark:bg-red-900/20 dark:border-red-800/30">
        <h3 className="font-semibold text-lg mb-2">Error Loading Workspaces</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Workspaces</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and monitor all active cloud environments</p>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
          + New Workspace
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {workspaces.map((w) => (
          <Link key={w.id} to={`/workspaces/${w.id}`} className="group outline-none ring-blue-500 focus:ring-2 rounded-lg">
            <div className="transition-transform duration-200 group-hover:-translate-y-1">
              <WorkspaceCard workspace={w} variant="default" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WorkspacesPage;

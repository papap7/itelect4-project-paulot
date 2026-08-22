import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import WorkspaceCard from "../components/WorkspaceCard";
import type { ApiWorkspace } from "../types/index";
import { fetchWorkspaces } from "../api/client";
import { Server } from "lucide-react";

function WorkspacesPage() {
  const { data: workspaces = [], isPending, isError, error } = useQuery<ApiWorkspace[]>({
    queryKey: ["workspaces"],
    queryFn: fetchWorkspaces,
  });

  if (isPending) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-800 dark:border-t-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-red-700 dark:bg-red-500/10 dark:text-red-400">
        {error.message}
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          <Server className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Environments</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage all active cloud infrastructure workspaces.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {workspaces.map((w) => (
          <Link key={w.id} to={`/workspaces/${w.id}`} className="block h-full">
            <WorkspaceCard workspace={w} variant="default" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WorkspacesPage;

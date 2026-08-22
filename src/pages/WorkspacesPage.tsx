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
    return <div className="animate-pulse p-6">Loading workspaces...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Workspaces</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workspaces.map((w) => (
          <Link key={w.id} to={`/workspaces/${w.id}`}>
            <WorkspaceCard workspace={w} variant="compact" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WorkspacesPage;

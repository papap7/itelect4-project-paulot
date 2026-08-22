import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import WorkspaceCard from "../components/WorkspaceCard";
import type { ApiWorkspace } from "../types/index";
import { fetchWorkspaceById } from "../api/client";

function WorkspaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery<ApiWorkspace>({
    queryKey: ["workspaces", id],
    queryFn: () => fetchWorkspaceById(id!),
    enabled: id !== undefined,
  });

  if (isPending) {
    return <div className="animate-pulse p-6">Loading workspace...</div>;
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
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {data.title}
      </h2>
      <div className="max-w-sm">
        <WorkspaceCard workspace={data} variant="default" />
      </div>
      <button 
        onClick={() => navigate("/workspaces")}
        className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Workspaces
      </button>
    </div>
  );
}

export default WorkspaceDetailPage;

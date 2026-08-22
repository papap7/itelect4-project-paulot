import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
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
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center space-x-3 text-gray-500">
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
          <span className="text-lg font-medium">Loading workspace details...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-red-50 p-6 border border-red-100 text-red-700 dark:bg-red-900/20 dark:border-red-800/30">
        <h3 className="font-semibold text-lg mb-2">Error Loading Workspace</h3>
        <p>{error.message}</p>
        <button 
          onClick={() => navigate("/workspaces")}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-5xl mx-auto">
      <button 
        onClick={() => navigate("/workspaces")}
        className="mb-6 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <span className="mr-2">←</span> Back to Workspaces
      </button>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {data.title}
            </h1>
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500"></span>
              Active
            </span>
          </div>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            {data.description}
          </p>
        </div>

        <div className="p-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Workspace Details</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Workspace ID</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white font-mono">{data.id}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {new Date(data.createdAt).toLocaleString()}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Region</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">us-east-1</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Instance Type</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">t3.xlarge</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceDetailPage;

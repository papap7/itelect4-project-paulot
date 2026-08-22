import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EngineerCard from "../components/EngineerCard";
import WorkspaceCard from "../components/WorkspaceCard";
import RequestBadge from "../components/RequestBadge";
import useToggle from "../hooks/useToggle";
import usePrevious from "../hooks/usePrevious";

import type { Engineer, ApiWorkspace, ApiRequest } from "../types/index";
import { mockEngineers } from "../data/mockData";
import useUiStore from "../store/uiStore";
import { fetchWorkspaces, fetchRequests } from "../api/client";

function DashboardPage() {
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(null);
  
  const { data: workspaces = [], isPending, isError, error } = useQuery<ApiWorkspace[]>({
    queryKey: ["workspaces"],
    queryFn: fetchWorkspaces,
  });

  const { data: requests = [] } = useQuery<ApiRequest[]>({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });
  
  const latestRequest = requests.length > 0 ? requests[0] : null;

  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);
  
  const [showRequest, toggleRequest] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  if (isPending) {
    return (
      <div className="animate-pulse p-6 text-gray-500 font-sans">
        Booting CloudOps Portal...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-6 rounded-lg bg-red-50 p-4 text-red-700 font-sans">
        {error.message} -- is json-server running on port 3001?
      </div>
    );
  }

  const filteredWorkspaces = workspaces.filter((w) =>
    w.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
        {/* --- Header & Controls --- */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          
          <div className="flex gap-2">
            {/* Simulate Error removed since useQuery handles real errors */}
          </div>
        </div>

        {/* --- Section: Search and Filter --- */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 dark:border dark:border-gray-700">
          <input 
            value={searchTerm}
            onChange={handleSearchChange}
            type="text"
            placeholder="Search workspaces..."
            className="w-full rounded border border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          {previousSearch !== undefined && previousSearch !== searchTerm && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Previous search: "{previousSearch}"</p>
          )}
        </div>

        {/* --- Section: Engineer Selection (Responsive Grid) --- */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Engineers</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockEngineers.map(eng => (
              <EngineerCard key={eng.id} engineer={eng} onSelect={setSelectedEngineer} />
            ))}
          </div>
          {selectedEngineer && (
            <p className="mt-4 font-medium text-green-600 dark:text-green-400">
              Selected Engineer: {selectedEngineer.name}
            </p>
          )}
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* --- Section: Dynamic Workspace List (Responsive Grid + Variant) --- */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Active Workspaces</h2>
        {filteredWorkspaces.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No workspaces found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWorkspaces.map(ws => (
              <WorkspaceCard key={ws.id} workspace={ws} variant="compact" />
            ))}
          </div>
        )}

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* --- Section: Toggleable Request Badge --- */}
        <button 
          onClick={toggleRequest} 
          className="rounded bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
        >
          {showRequest ? "Hide" : "Show"} Active Provision Request
        </button>
        
        {showRequest && latestRequest && (
          <RequestBadge request={latestRequest}>
            <p>⚠️ Awaiting Admin Approval</p>
          </RequestBadge>
        )}
    </>
  );
}

export default DashboardPage;

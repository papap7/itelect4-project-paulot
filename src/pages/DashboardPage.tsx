import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EngineerCard from "../components/EngineerCard";
import WorkspaceCard from "../components/WorkspaceCard";
import RequestBadge from "../components/RequestBadge";

import type { Engineer, ApiWorkspace, ApiRequest } from "../types/index";
import { mockEngineers } from "../data/mockData";
import { fetchWorkspaces, fetchRequests } from "../api/client";
import { Search, FolderKanban, Activity, Users } from "lucide-react";
import { Link } from "react-router";

function DashboardPage() {
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const { data: workspaces = [], isPending: isLoadingWorkspaces, isError: isErrorWorkspaces } = useQuery<ApiWorkspace[]>({
    queryKey: ["workspaces"],
    queryFn: fetchWorkspaces,
  });

  const { data: requests = [] } = useQuery<ApiRequest[]>({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });
  
  const pendingRequests = requests.filter(r => r.status.toLowerCase().includes("pending"));
  const latestRequests = requests.slice(0, 3); // top 3

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const filteredWorkspaces = workspaces.filter((w) =>
    w.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 6); // show only up to 6 on dashboard

  if (isLoadingWorkspaces) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-800 dark:border-t-blue-500"></div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">Syncing Command Center...</p>
        </div>
      </div>
    );
  }

  if (isErrorWorkspaces) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-red-700 dark:bg-red-500/10 dark:text-red-400">
        <h3 className="font-bold">Connection Failed</h3>
        <p className="mt-1 text-sm">Could not reach the server (port 3001). Please ensure json-server is running.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* --- Header & Top Metrics --- */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Overview</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <FolderKanban className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Workspaces</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{workspaces.length}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Requests</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{pendingRequests.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Engineers</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{mockEngineers.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Two Column Layout --- */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Main Column: Workspaces */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Workspaces</h2>
              <div className="relative w-64">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <Search className="h-4 w-4" />
                </div>
                <input 
                  value={searchTerm}
                  onChange={handleSearchChange}
                  type="text"
                  placeholder="Filter..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-800"
                />
              </div>
            </div>

            {filteredWorkspaces.length === 0 ? (
              <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">No workspaces match your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {filteredWorkspaces.map(ws => (
                  <Link key={ws.id} to={`/workspaces/${ws.id}`} className="block">
                    <WorkspaceCard workspace={ws as any} variant="compact" />
                  </Link>
                ))}
              </div>
            )}
            
            <div className="pt-2">
              <Link to="/workspaces" className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                View all workspaces &rarr;
              </Link>
            </div>
          </div>

          {/* Sidebar Column: Engineers & Requests */}
          <div className="space-y-8">
            
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Latest Requests</h2>
              {latestRequests.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">No requests yet.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {latestRequests.map(req => (
                    <RequestBadge key={req.id} request={req} />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Team Directory</h2>
              <div className="flex flex-col gap-3">
                {mockEngineers.map(eng => (
                  <EngineerCard key={eng.id} engineer={eng} onSelect={setSelectedEngineer} />
                ))}
              </div>
              {selectedEngineer && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-400">
                    Pinged: {selectedEngineer.name}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
    </div>
  );
}

export default DashboardPage;

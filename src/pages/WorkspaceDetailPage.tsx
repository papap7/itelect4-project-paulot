import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import WorkspaceCard from "../components/WorkspaceCard";
import type { ApiWorkspace } from "../types/index";
import { fetchWorkspaceById } from "../api/client";
import { ArrowLeft, ExternalLink, ShieldCheck, Cpu, HardDrive, Network } from "lucide-react";

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
    <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-500">
      
      {/* Navigation */}
      <button 
        onClick={() => navigate("/workspaces")}
        className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Environments
      </button>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {data.title}
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            {data.description}
          </p>
        </div>
        
        <div className="flex shrink-0 items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500">
            <ExternalLink className="h-4 w-4" />
            Open Console
          </button>
        </div>
      </div>

      <hr className="border-slate-200 dark:border-slate-800" />

      {/* Workspace Main Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Infrastructure Card</h3>
          <WorkspaceCard workspace={data} variant="default" />
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Metrics</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 mb-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <span className="font-medium">Security</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">100%</p>
            </div>
            
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 mb-2">
                <Cpu className="h-5 w-5 text-indigo-500" />
                <span className="font-medium">Compute</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">4 Nodes</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 mb-2">
                <HardDrive className="h-5 w-5 text-amber-500" />
                <span className="font-medium">Storage</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">12 TB</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 mb-2">
                <Network className="h-5 w-5 text-cyan-500" />
                <span className="font-medium">Bandwidth</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">1.2 Gbps</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default WorkspaceDetailPage;

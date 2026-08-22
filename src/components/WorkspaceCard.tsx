import type { ApiWorkspace } from "../types/index";
import { Server, Activity } from "lucide-react";

interface WorkspaceCardProps {
  workspace: ApiWorkspace;
  variant?: "default" | "compact";
}

function WorkspaceCard({ workspace, variant = "default" }: WorkspaceCardProps) {
  const isCompact = variant === "compact";
  const dateStr = new Date(workspace.createdAt).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800/80 dark:bg-slate-900/50 dark:hover:border-blue-500/30 dark:hover:bg-slate-800/80 ${isCompact ? "p-5" : "p-6"}`}>
      
      {/* Glow Effect */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20 dark:bg-blue-500/10 dark:group-hover:bg-blue-500/20 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <Server className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></div>
            Active
          </div>
        </div>

        <h3 className={`font-bold tracking-tight text-slate-900 dark:text-white ${isCompact ? "text-lg" : "text-xl"}`}>
          {workspace.title}
        </h3>
        
        {!isCompact && (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
            {workspace.description}
          </p>
        )}
      </div>
      
      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <Activity className="h-3.5 w-3.5 text-slate-400" />
          <span>Deployed: {dateStr}</span>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceCard;
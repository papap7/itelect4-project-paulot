import type { ApiRequest } from "../types/index";
import { Cpu, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface RequestBadgeProps {
  request: ApiRequest;
  children?: React.ReactNode;
}

const RequestBadge: React.FC<RequestBadgeProps> = ({ request, children }) => {
  // Determine status color and icon
  const isPending = request.status.toLowerCase().includes("pending");
  const isActive = request.status.toLowerCase().includes("active");
  const isFailed = request.status.toLowerCase().includes("failed");

  let statusColor = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  let StatusIcon = AlertCircle;

  if (isPending) {
    statusColor = "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400";
    StatusIcon = Clock;
  } else if (isActive) {
    statusColor = "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400";
    StatusIcon = CheckCircle2;
  } else if (isFailed) {
    statusColor = "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10 dark:bg-red-500/10 dark:text-red-400";
  }

  const dateStr = new Date(request.requestedAt).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50">
      
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-3 dark:border-slate-800 dark:bg-slate-800/20">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 font-mono">
            REQ-{request.id.slice(0,8).toUpperCase()}
          </span>
        </div>
        <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor}`}>
          <StatusIcon className="h-3.5 w-3.5" />
          {request.status}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Resource Type</p>
          <p className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
            {request.resourceType}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          {children && (
            <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              {children}
            </div>
          )}
          
          <div className="text-xs text-slate-500 dark:text-slate-400 ml-auto">
            {dateStr}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestBadge;
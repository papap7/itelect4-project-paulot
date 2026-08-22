import type { Engineer } from "../types/index";
import { User, Briefcase, Mail } from "lucide-react";

interface EngineerCardProps {
  engineer: Engineer;
  onSelect: (engineer: Engineer) => void;
}

function EngineerCard({ engineer, onSelect }: EngineerCardProps) {
  return (
    <div 
      onClick={() => onSelect(engineer)}
      className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/50"
    >
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50">
        <User className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        {engineer.isActive && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="truncate text-sm font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 transition-colors">
          {engineer.name}
        </h3>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Briefcase className="h-3.5 w-3.5" />
          <span className="truncate capitalize">{engineer.role.replace('_', ' ')}</span>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Mail className="h-3.5 w-3.5" />
          <span className="truncate">{engineer.email}</span>
        </div>
      </div>
    </div>
  );
}

export default EngineerCard;
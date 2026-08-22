import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import { Cloud, ArrowRight, ShieldCheck } from "lucide-react";

function LoginPage() {
  const [name, setName] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name);
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#0B1120]">
      
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-blue-600/10 blur-[120px] dark:bg-blue-600/20 pointer-events-none"></div>
        <div className="absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[100px] dark:bg-indigo-600/20 pointer-events-none"></div>
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/5 blur-[80px] dark:bg-purple-600/10 pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 sm:px-0">
        
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/20 ring-1 ring-white/20">
            <Cloud className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            CloudOps Portal
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Authenticate to access the command center.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/60 p-8 shadow-2xl shadow-blue-900/5 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/50 dark:shadow-black/50 sm:p-10">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                Engineer ID / Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <input 
                  id="name"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your identifier..."
                  className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-white dark:focus:border-blue-500"
                  autoComplete="off"
                  autoFocus
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={name.trim() === ""}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-400 disabled:to-slate-400 disabled:shadow-none dark:disabled:from-slate-700 dark:disabled:to-slate-700"
            >
              Access Command Center
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-500">
          Secure access only. Activity is logged.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

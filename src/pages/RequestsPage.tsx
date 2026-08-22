import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import RequestBadge from "../components/RequestBadge";
import type { ApiRequest } from "../types/index";
import { fetchRequests, createRequest } from "../api/client";
import { Activity, Plus } from "lucide-react";

function RequestsPage() {
  const [resourceType, setResourceType] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: requests = [], isPending, isError } = useQuery<ApiRequest[]>({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });

  const addRequest = useMutation({
    mutationFn: createRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      setResourceType("");
    },
  });

  const handleAdd = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!resourceType.trim()) return;

    addRequest.mutate({
      engineerId: 1,
      workspaceId: 101,
      resourceType: resourceType,
      status: "Pending Review",
      requestedAt: new Date().toISOString(),
    });
  };

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
        Could not load requests. Check if json-server is running on port 3001.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 animate-in fade-in duration-500">
      
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <Activity className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Provision Requests</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Request new cloud infrastructure or view past requests.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Form Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">New Request</h2>
            
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Resource Type
                </label>
                <input 
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                  placeholder="e.g. AWS EC2 t3.micro"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-800"
                />
              </div>

              {addRequest.isError && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-400">
                  {addRequest.error.message}
                </div>
              )}

              <button 
                type="submit"
                disabled={!resourceType.trim() || addRequest.isPending}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-500 disabled:bg-slate-300 disabled:shadow-none dark:disabled:bg-slate-700"
              >
                {addRequest.isPending ? "Submitting..." : (
                  <>
                    <Plus className="h-4 w-4" />
                    Submit Request
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Requests List Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Request History</h2>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {requests.length} Total
            </div>
          </div>
          
          {requests.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">No requests submitted yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Reverse so newest is first */}
              {[...requests].reverse().map((req) => (
                <RequestBadge key={req.id} request={req} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestsPage;

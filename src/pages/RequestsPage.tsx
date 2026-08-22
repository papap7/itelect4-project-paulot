import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import RequestBadge from "../components/RequestBadge";
import type { ApiRequest } from "../types/index";
import { fetchRequests, createRequest } from "../api/client";

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

  const handleAdd = (): void => {
    addRequest.mutate({
      engineerId: 1,
      workspaceId: 101,
      resourceType: resourceType,
      status: "Pending Review",
      requestedAt: new Date().toISOString(),
    });
  };

  if (isPending) {
    return <div className="animate-pulse p-6">Loading requests...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Could not load requests.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">My Provision Requests</h2>
      
      <div className="mb-6 flex gap-2">
        <input 
          value={resourceType}
          onChange={(e) => setResourceType(e.target.value)}
          placeholder="e.g. AWS EC2 Instance"
          className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
        />
        <button 
          onClick={handleAdd}
          disabled={resourceType === "" || addRequest.isPending}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          {addRequest.isPending ? "Saving..." : "Add"}
        </button>
      </div>

      {addRequest.isError && (
        <p className="mb-4 text-sm text-red-700">{addRequest.error.message}</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {requests.map((req) => (
          <RequestBadge key={req.id} request={req}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Requested At: {req.requestedAt}
            </p>
          </RequestBadge>
        ))}
      </div>
    </div>
  );
}

export default RequestsPage;

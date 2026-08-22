import type { ApiWorkspace, ApiRequest, NewRequest } from "../types/index";

export const API_URL = "http://localhost:3001";

export async function fetchWorkspaces(): Promise<ApiWorkspace[]> {
  const res = await fetch(`${API_URL}/workspaces`);
  if (!res.ok) {
    throw new Error("Could not load workspaces");
  }
  return res.json();
}

export async function fetchWorkspaceById(id: string): Promise<ApiWorkspace> {
  const res = await fetch(`${API_URL}/workspaces/${id}`);
  if (!res.ok) {
    throw new Error(`Could not load workspace with id "${id}"`);
  }
  return res.json();
}

export async function fetchRequests(): Promise<ApiRequest[]> {
  const res = await fetch(`${API_URL}/requests`);
  if (!res.ok) {
    throw new Error("Could not load requests");
  }
  return res.json();
}

export async function createRequest(newRequest: NewRequest): Promise<ApiRequest> {
  const res = await fetch(`${API_URL}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRequest),
  });
  if (!res.ok) {
    throw new Error("Could not save the request");
  }
  return res.json();
}

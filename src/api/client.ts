import type { ApiWorkspace, ApiRequest, NewRequest, ApiEngineer, AuthReply } from "../types/index";
import useAuthStore from "../store/authStore";

export const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    "VITE_API_URL is missing. Copy .env.example to .env, fill it in, and restart npm run dev."
  );
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = useAuthStore.getState().token;

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed (${res.status})`);
  }

  return res.json();
}

// Public Workspace calls
export function fetchWorkspaces(): Promise<ApiWorkspace[]> {
  return request<ApiWorkspace[]>("/api/workspaces");
}

export function fetchWorkspaceById(id: string): Promise<ApiWorkspace> {
  return request<ApiWorkspace>(`/api/workspaces/${id}`);
}

// Protected Requests calls (token attached automatically)
export function fetchRequests(): Promise<ApiRequest[]> {
  return request<ApiRequest[]>("/api/provision-requests");
}

export function createRequest(newRequest: NewRequest): Promise<ApiRequest> {
  return request<ApiRequest>("/api/provision-requests", {
    method: "POST",
    body: JSON.stringify(newRequest),
  });
}

// Auth calls
export function registerUser(body: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiEngineer> {
  return request<ApiEngineer>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function loginUser(body: {
  email: string;
  password: string;
}): Promise<AuthReply> {
  return request<AuthReply>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

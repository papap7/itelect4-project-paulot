// ==========================================
// ENUMS
// ==========================================
export const enum EngineerRole {
  Developer = "developer",
  NetworkAdmin = "network_admin",
  DevOpsAdmin = "devops_admin",
}

export enum ProvisionStatus {
  PendingReview,
  Provisioning,
  Active,
  Failed,
  Terminated,
}

// ==========================================
// CORE INTERFACES
// ==========================================
export interface Engineer {
  id: number;
  name: string;
  email: string;
  role: EngineerRole;
  isActive: boolean;
}

export interface ProjectWorkspace {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}

export interface ProvisionRequest {
  id: number;
  engineerId: number;
  workspaceId: number;
  resourceType: string;
  status: ProvisionStatus;
  requestedAt: Date;
}

// ==========================================
// GENERICS
// ==========================================
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ==========================================
// UTILITY TYPES
// ==========================================
export type EngineerUpdate = Partial<Engineer>;

export type WorkspacePreview = Pick<ProjectWorkspace, "id" | "title">;

export type ApiWorkspace = Omit<ProjectWorkspace, "id" | "createdAt"> & {
  id: string;
  createdAt: string;
};

export type ApiRequest = Omit<ProvisionRequest, "id" | "requestedAt" | "status"> & {
  id: string;
  status: string;
  requestedAt: string;
};

// What /api/auth/register sends back and what sits inside the login reply
export type ApiEngineer = Omit<Engineer, "id"> & {
  id: string;
};

// What /api/auth/login sends back
export interface AuthReply {
  token: string;
  user: ApiEngineer;
}

// What we send when creating a request:
// (The backend fills engineerId from the JWT token and requestedAt from schema default)
export type NewRequest = Pick<ProvisionRequest, "workspaceId" | "resourceType">;

// ===== SESSION 11: what POST /api/ai sends back =======================
// Derived from the backend schema in itelect4-backend/src/schemas/advisor.ts
export interface AiAdvisor {
  summary: string;
  suggestions: string[];
  risks: string[];
  urgency: "critical" | "standard" | "low";
}


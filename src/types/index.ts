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
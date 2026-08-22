import type { Engineer, ProjectWorkspace, ProvisionRequest } from "../types/index";
import { EngineerRole, ProvisionStatus } from "../types/index";

export const mockEngineers: Engineer[] = [
  { id: 1, name: "Paulo Tenorio", email: "paulo@example.com", role: EngineerRole.DevOpsAdmin, isActive: true },
  { id: 2, name: "Sebastian", email: "sebastian@example.com", role: EngineerRole.Developer, isActive: true },
  { id: 3, name: "Enjey", email: "enjey@example.com", role: EngineerRole.NetworkAdmin, isActive: true }
];

export const mockWorkspaces: ProjectWorkspace[] = [
  { id: 101, title: "A.D.A.M. Command Center", description: "Accident Detection Backend Infrastructure", createdAt: new Date() },
  { id: 102, title: "Cisco Routing Matrix", description: "Inter-VLAN setups and DHCPv4 routing pools", createdAt: new Date() }
];

export const mockRequest: ProvisionRequest = {
  id: 5001, engineerId: mockEngineers[0].id, workspaceId: mockWorkspaces[0].id,
  resourceType: "Node.js Server", status: ProvisionStatus.PendingReview, requestedAt: new Date(),
};

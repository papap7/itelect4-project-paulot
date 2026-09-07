import type { Engineer } from "../types/index";
import { EngineerRole } from "../types/index";

export const mockEngineers: Engineer[] = [
  { id: 1, name: "Paulo Tenorio", email: "paulo@example.com", role: EngineerRole.DevOpsAdmin, isActive: true },
  { id: 2, name: "Sebastian", email: "sebastian@example.com", role: EngineerRole.Developer, isActive: true },
  { id: 3, name: "Enjey", email: "enjey@example.com", role: EngineerRole.NetworkAdmin, isActive: true },
  { id: 4, name: "Sophia Martinez", email: "sophia.m@example.com", role: EngineerRole.DevOpsAdmin, isActive: true },
  { id: 5, name: "Liam Vance", email: "liam.v@example.com", role: EngineerRole.Developer, isActive: true },
  { id: 6, name: "Chloe Chen", email: "chloe.c@example.com", role: EngineerRole.NetworkAdmin, isActive: true }
];

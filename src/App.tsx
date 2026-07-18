// src/App.tsx
import EngineerCard from "./components/EngineerCard";
import WorkspaceCard from "./components/WorkspaceCard";
import RequestBadge from "./components/RequestBadge";

// Import your custom interfaces
import type { Engineer, ProjectWorkspace, ProvisionRequest } from "./types/index";
// Import your Enums separately!
import { EngineerRole, ProvisionStatus } from "./types/index";

// 1. Create Mock Data
const mockEngineer: Engineer = {
  id: 1,
  name: "Paulo Tenorio",
  email: "paulo@example.com",
  role: EngineerRole.DevOpsAdmin,
  isActive: true,
};

const mockWorkspace: ProjectWorkspace = {
  id: 101,
  title: "A.D.A.M. Command Center",
  description: "Accident Detection Backend Infrastructure",
  createdAt: new Date(),
};

const mockRequest: ProvisionRequest = {
  id: 5001,
  engineerId: mockEngineer.id,
  workspaceId: mockWorkspace.id,
  resourceType: "Node.js Server",
  status: ProvisionStatus.PendingReview,
  requestedAt: new Date(),
};

// 2. Render the Components
function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>CloudOps Provisioning Portal</h1>
      
      <EngineerCard 
        engineer={mockEngineer} 
        onSelect={(eng) => alert(`Selected: ${eng.name}`)} 
      />
      
      <WorkspaceCard workspace={mockWorkspace} />
      
      <RequestBadge request={mockRequest}>
        <p>⚠️ Awaiting Admin Approval</p>
      </RequestBadge>
    </div>
  );
}

export default App;
// src/App.tsx
import { useState, useEffect, useRef } from "react";
import EngineerCard from "./components/EngineerCard";
import WorkspaceCard from "./components/WorkspaceCard";
import RequestBadge from "./components/RequestBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

// Type imports
import type { Engineer, ProjectWorkspace, ProvisionRequest } from "./types/index";
// Enum imports
import { EngineerRole, ProvisionStatus } from "./types/index";

// --- Mock Data ---
const mockEngineers: Engineer[] = [
  { id: 1, name: "Paulo Tenorio", email: "paulo@example.com", role: EngineerRole.DevOpsAdmin, isActive: true },
  { id: 2, name: "Sebastian", email: "sebastian@example.com", role: EngineerRole.Developer, isActive: true },
  { id: 3, name: "Enjey", email: "enjey@example.com", role: EngineerRole.NetworkAdmin, isActive: true }
];

const mockWorkspaces: ProjectWorkspace[] = [
  { id: 101, title: "A.D.A.M. Command Center", description: "Accident Detection Backend Infrastructure", createdAt: new Date() },
  { id: 102, title: "Cisco Routing Matrix", description: "Inter-VLAN setups and DHCPv4 routing pools", createdAt: new Date() }
];

const mockRequest: ProvisionRequest = {
  id: 5001, engineerId: mockEngineers[0].id, workspaceId: mockWorkspaces[0].id,
  resourceType: "Node.js Server", status: ProvisionStatus.PendingReview, requestedAt: new Date(),
};

// --- Main Application Component ---
function App() {
  // 1. Typed State (useState<T>)
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(null);
  const [workspaces, setWorkspaces] = useState<ProjectWorkspace[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // 2. Custom Hooks
  const [showRequest, toggleRequest] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  // 3. Typed DOM Reference (useRef)
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 4. Loading Mock Data (useEffect)
  // empty deps array [] means "run once, on mount"
  useEffect(() => {
    setTimeout(() => {
      setWorkspaces(mockWorkspaces); // Populates the array state
      setIsLoading(false);           // Turns off the loading flag
      searchInputRef.current?.focus(); // Programmatically focus the search bar
    }, 800);
  }, []);

  // 5. Typed DOM Event Handler (React.ChangeEvent)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  // Derived state for filtering
  const filteredWorkspaces = workspaces.filter((w) =>
    w.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Early return for loading UI
  if (isLoading) {
    return <div style={{ padding: "20px" }}><h3>Booting CloudOps Portal...</h3></div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px" }}>
      <h1>CloudOps Provisioning Portal</h1>

      {/* --- Section: Search and Filter --- */}
      <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f0f0f0" }}>
        <input 
          ref={searchInputRef}
          value={searchTerm}
          onChange={handleSearchChange}
          type="text"
          placeholder="Search workspaces..."
          style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
        />
        {previousSearch !== undefined && previousSearch !== searchTerm && (
          <small style={{ color: "gray" }}>Previous search: "{previousSearch}"</small>
        )}
      </div>

      {/* --- Section: Engineer Selection --- */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {mockEngineers.map(eng => (
          <EngineerCard 
            key={eng.id} 
            engineer={eng} 
            onSelect={setSelectedEngineer} 
          />
        ))}
      </div>
      {selectedEngineer && (
        <h4 style={{ color: "green" }}>Selected Engineer: {selectedEngineer.name}</h4>
      )}

      <hr />

      {/* --- Section: Dynamic Workspace List --- */}
      <h2>Active Workspaces</h2>
      {filteredWorkspaces.length === 0 ? (
        <p>No workspaces found.</p>
      ) : (
        filteredWorkspaces.map(ws => (
          <WorkspaceCard key={ws.id} workspace={ws} />
        ))
      )}

      <hr />

      {/* --- Section: Toggleable Request Badge --- */}
      <button onClick={toggleRequest} style={{ padding: "10px", marginTop: "10px" }}>
        {showRequest ? "Hide" : "Show"} Active Provision Request
      </button>
      
      {showRequest && (
        <RequestBadge request={mockRequest}>
          <p>⚠️ Awaiting Admin Approval</p>
        </RequestBadge>
      )}
    </div>
  );
}

export default App;
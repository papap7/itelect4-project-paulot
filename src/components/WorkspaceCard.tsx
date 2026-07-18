import type { ProjectWorkspace } from "../types/index";

interface WorkspaceCardProps {
  workspace: ProjectWorkspace;
}

function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  return (
    <div className="card" style={{ border: "1px solid #007bff", padding: "1rem", margin: "1rem 0" }}>
      <h3>{workspace.title}</h3>
      <p>{workspace.description}</p>
      <small>Created: {workspace.createdAt.toLocaleDateString()}</small>
    </div>
  );
}

export default WorkspaceCard;
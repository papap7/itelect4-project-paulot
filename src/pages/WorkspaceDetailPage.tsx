import { useParams, useNavigate } from "react-router";
import WorkspaceCard from "../components/WorkspaceCard";
import { mockWorkspaces } from "../data/mockData";

function WorkspaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const workspace = mockWorkspaces.find((w) => w.id === Number(id));

  if (workspace === undefined) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        No workspace found with ID "{id}".
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {workspace.title}
      </h2>
      <div className="max-w-sm">
        <WorkspaceCard workspace={workspace} variant="default" />
      </div>
      <button 
        onClick={() => navigate("/workspaces")}
        className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Workspaces
      </button>
    </div>
  );
}

export default WorkspaceDetailPage;

import { Link } from "react-router";
import WorkspaceCard from "../components/WorkspaceCard";
import { mockWorkspaces } from "../data/mockData";

function WorkspacesPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Workspaces</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockWorkspaces.map((w) => (
          <Link key={w.id} to={`/workspaces/${w.id}`}>
            <WorkspaceCard workspace={w} variant="compact" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WorkspacesPage;

import RequestBadge from "../components/RequestBadge";
import { mockRequest } from "../data/mockData";

function RequestsPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">My Provision Requests</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <RequestBadge request={mockRequest}>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Resource: {mockRequest.resourceType}
          </p>
        </RequestBadge>
      </div>
    </div>
  );
}

export default RequestsPage;

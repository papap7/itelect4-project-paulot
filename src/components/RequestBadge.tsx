import type { ProvisionRequest } from "../types/index";

interface RequestBadgeProps {
  request: ProvisionRequest;
  children?: React.ReactNode;
}

const RequestBadge: React.FC<RequestBadgeProps> = ({ request, children }) => {
  return (
    <div className="rounded-lg bg-gray-100 p-4 shadow-sm dark:bg-gray-700 mt-4">
      <p className="text-gray-800 dark:text-gray-200">
        <strong className="font-semibold">Resource:</strong> {request.resourceType}
      </p>
      <p className="text-gray-800 dark:text-gray-200">
        <strong className="font-semibold">Status Code:</strong> {request.status}
      </p>
      <div className="mt-2 text-green-600 dark:text-green-400 font-medium">
        {children}
      </div>
    </div>
  );
};

export default RequestBadge;
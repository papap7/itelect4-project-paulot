import type { ApiRequest } from "../types/index";

interface RequestBadgeProps {
  request: ApiRequest;
  children?: React.ReactNode;
}

const RequestBadge: React.FC<RequestBadgeProps> = ({ request, children }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800";
      case "Provisioning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300 dark:border-blue-800";
      case "Pending Review":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800";
      case "Failed":
        return "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-300 dark:border-red-800";
      case "Terminated":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border border-gray-300 dark:border-gray-700";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-700";
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-800/80">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Request #{request.id}
          </p>
          <h4 className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
            {request.resourceType}
          </h4>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusStyle(request.status)}`}>
          {request.status}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default RequestBadge;
import type { ProvisionRequest } from "../types/index";

interface RequestBadgeProps {
  request: ProvisionRequest;
  children?: React.ReactNode;
}

const RequestBadge: React.FC<RequestBadgeProps> = ({ request, children }) => {
  return (
    <div className="badge" style={{ backgroundColor: "#f8f9fa", padding: "1rem", margin: "1rem 0" }}>
      <p><strong>Resource:</strong> {request.resourceType}</p>
      <p><strong>Status Code:</strong> {request.status}</p>
      <div style={{ marginTop: "10px", color: "green" }}>
        {children}
      </div>
    </div>
  );
};

export default RequestBadge;
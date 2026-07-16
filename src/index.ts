import { 
  Engineer, 
  ProjectWorkspace, 
  ProvisionRequest, 
  EngineerRole, 
  ProvisionStatus, 
  ApiResponse, 
  WorkspacePreview 
} from "./types/index";

// ==========================================
// GENERIC FUNCTION DEMONSTRATION
// ==========================================
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

// ==========================================
// CREATING OUR DUMMY DATA
// ==========================================
const myEngineer: Engineer = {
  id: 1,
  name: "Paulo Tenorio",
  email: "paulo@example.com",
  role: EngineerRole.DevOpsAdmin,
  isActive: true,
};

const myWorkspace: ProjectWorkspace = {
  id: 101,
  title: "A.D.A.M. Command Center",
  description: "Accident Detection Backend",
  createdAt: new Date(),
};

const myRequest: ProvisionRequest = {
  id: 5001,
  engineerId: myEngineer.id,
  workspaceId: myWorkspace.id,
  resourceType: "Node.js Server",
  status: ProvisionStatus.PendingReview, // Using the Enum!
  requestedAt: new Date(),
};

// ==========================================
// TESTING UTILITIES AND GENERICS
// ==========================================
// Using the Pick<> utility type:
const preview: WorkspacePreview = {
  id: myWorkspace.id,
  title: myWorkspace.title
};

// Using the Generic <T> interface:
const apiResponse: ApiResponse<Engineer> = {
  success: true,
  data: myEngineer,
  message: "Engineer fetched successfully"
};

// Console Logs to prove it runs
console.log("--- CloudOps Portal Test ---");
console.log(`Engineer: ${apiResponse.data.name} (${apiResponse.data.role})`);
console.log(`Workspace Preview: ${preview.title}`);
console.log(`Provision Status Code: ${myRequest.status}`);
import { z } from "zod";

export const requestSchema = z.object({
  resourceType: z
    .string()
    .min(1, "Resource Type is required")
    .refine((val) => {
      const lower = val.toLowerCase();
      return lower.includes("aws") || lower.includes("gcp") || lower.includes("azure");
    }, "Resource type must specify a cloud provider (AWS, GCP, or Azure)"),
  workspaceId: z.number().min(1, "Workspace must be selected"),
});

export type RequestFormValues = z.infer<typeof requestSchema>;

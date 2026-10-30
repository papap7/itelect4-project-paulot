// ===== SESSION 12: a NEW file =========================================
// Test 1 of 3: a component render. The test sits beside the file it
// tests and has the same name with .test in front of .tsx.
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RequestBadge from "./RequestBadge";
import type { ApiRequest } from "../types/index";

// One request shaped exactly like a row from GET /api/provision-requests.
// Typed with ApiRequest, so a misspelled or missing field is a compile
// error (npm run build) and not a silent test problem.
const pending: ApiRequest = {
  id: "665f1c2ab4e8d3a1f0c9e101",
  engineerId: 1,
  workspaceId: 3,
  resourceType: "Node.js Server",
  status: "Pending Review",
  requestedAt: "2026-10-17T02:15:00.000Z",
};

describe("RequestBadge", () => {
  it("shows the resource type and the Pending Review status", () => {
    render(<RequestBadge request={pending} />);

    expect(screen.getByText("Node.js Server")).toBeInTheDocument();
    expect(screen.getByText("Pending Review")).toBeInTheDocument();
  });

  it("turns a numeric status code from the API into its label", () => {
    // Older rows come back with status 2 instead of the word. The badge
    // has a map for that, and this is the only thing that checks it.
    // Everything from pending, then status replaced -- a copy, so the
    // first test's sample is not changed.
    const active: ApiRequest = { ...pending, status: 2 as unknown as string };

    render(<RequestBadge request={active} />);

    expect(screen.getByText("Active")).toBeInTheDocument();
    // The old label must be gone, not just a second label added.
    expect(screen.queryByText("Pending Review")).not.toBeInTheDocument();
  });
});

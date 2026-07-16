# CloudOps Provisioning Portal (itelect4-project)

## Project Concept
The CloudOps Provisioning Portal is an internal infrastructure management dashboard. It allows developers and network engineers to request cloud resources (like Node.js environments or database clusters) and allows DevOps admins to approve, track, and provision these requests through a strict lifecycle pipeline. 

## Defined Interfaces
* **Engineer:** The users of the system (Developers, Network Admins, DevOps Admins).
* **ProjectWorkspace:** The overarching application container that resources belong to.
* **ProvisionRequest:** The actual ticket requesting the infrastructure with a strict lifecycle status.

## How to Install and Run
1. Run `npm install` to install dependencies.
2. Run `npx ts-node src/index.ts` to execute the code.
3. Run `npx tsc --noEmit` to verify there are zero TypeScript compiler errors.
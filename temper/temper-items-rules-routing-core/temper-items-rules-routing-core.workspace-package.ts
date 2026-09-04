import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperItemsRulesRoutingCore = {
  id: "01a06151-370b-7fa6-ad43-f200b0ae0fb9",
  pageTypeSlug: "workspace-package",
  slug: "temper-items-rules-routing-core",
  definition: "the route a plan takes through the game world, and the shape of the plan itself",
  manifest: "json",
  partSlugs: [
    "module/inventory-consolidate-dest",
    "module/inventory-management-plan-route",
    "module/inventory-management-plan-route-actor",
    "module/inventory-management-plan-route-helpers",
    "module/inventory-management-plan-route-steps",
    "module/inventory-management-plan-route-venue",
    "module/inventory-management-plan-types",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A route says where a player goes and what the player does at each stop.",
    },
    {
      invariantKind: "absence",
      statement: "No code here reaches the game.",
    },
  ],
} as const satisfies WorkspacePackage

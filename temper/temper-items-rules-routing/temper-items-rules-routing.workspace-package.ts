import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperItemsRulesRouting = {
  id: "01a0615a-a1de-7f51-9fb6-fb90ff022184",
  pageTypeSlug: "workspace-package",
  slug: "temper-items-rules-routing",
  definition: "a whole management session planned out of the rules and the captured holdings",
  manifest: "json",
  partSlugs: [
    "module/inventory-management-plan",
    "module/inventory-management-plan-buy",
    "module/inventory-management-plan-capacity",
    "module/inventory-management-plan-capacity-filter",
    "module/inventory-management-plan-chain",
    "module/inventory-management-plan-chain-property-fixtures",
    "module/inventory-management-plan-collect",
    "module/inventory-management-plan-grouping",
    "module/inventory-management-plan-property-fixtures",
    "module/inventory-management-plan-simulation",
    "module/inventory-management-plan-test-utils",
    "module/inventory-management-plan-use-destinations",
    "module/inventory-plan-checklist",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A plan is built from captured holdings rather than from the game.",
    },
    {
      invariantKind: "absence",
      statement: "No code here reaches the game.",
    },
  ],
} as const satisfies WorkspacePackage

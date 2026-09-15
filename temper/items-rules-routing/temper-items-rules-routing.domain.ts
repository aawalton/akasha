import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperItemsRulesRouting = {
  id: "01a0615a-a1de-7f51-9fb6-fb90ff022184",
  type: "domain",
  slug: "temper-items-rules-routing",
  definition: "a whole management session planned out of the rules and the captured holdings",
  parts: [
    "module/inventory-management-plan",
    "module/inventory-management-plan-buy",
    "module/inventory-management-plan-capacity",
    "module/inventory-management-plan-capacity-filter",
    "module/inventory-management-plan-chain",

    "module/inventory-management-plan-collect",
    "module/inventory-management-plan-grouping",

    "module/inventory-management-plan-simulation",

    "module/inventory-management-plan-use-destinations",
    "module/inventory-plan-checklist",
    "test-fixture/inventory-management-plan-chain-property-fixtures",
    "test-fixture/inventory-management-plan-property-fixtures",
    "test-fixture/inventory-management-plan-test-utils",
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
} as const satisfies Domain

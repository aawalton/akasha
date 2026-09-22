import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryPlanCapabilities = {
  id: "01a068f6-dee0-7713-8806-b95995b92fdc",
  type: "page-type/module",
  slug: "inventory-plan-capabilities",
  definition: "what builds an inventory management plan",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The parts a plan run needs are handed over together rather than one by one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each part is handed over on its own so a run may take only the parts that run needs.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No plan is built here.",
    },
    { decisionKind: "decision-kind/absence", statement: "No type is sent on from here." },
  ],
} as const satisfies Module

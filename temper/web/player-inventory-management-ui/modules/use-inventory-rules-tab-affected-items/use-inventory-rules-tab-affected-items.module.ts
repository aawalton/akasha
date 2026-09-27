import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useInventoryRulesTabAffectedItems = {
  id: "01a0636c-5da1-73f0-9a3f-7723d2fa0066",
  type: "page-type/module",
  slug: "use-inventory-rules-tab-affected-items",
  definition: "the items under the rules tab's rules",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The plan is built again when the item action titles read from their pages change.",
    },
  ],
} as const satisfies Module

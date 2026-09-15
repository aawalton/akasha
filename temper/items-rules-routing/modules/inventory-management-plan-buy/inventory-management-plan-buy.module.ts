import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryManagementPlanBuy = {
  id: "01a06289-2676-71eb-b326-afa48bd70c7a",
  type: "page-type/module",
  slug: "inventory-management-plan-buy",
  definition: "what a buy rule falls short of, put into the plan as a vendor errand",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Buying is planned against a character that is no character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A buy rule met by the account's holdings adds no errand.",
    },
  ],
} as const satisfies Module

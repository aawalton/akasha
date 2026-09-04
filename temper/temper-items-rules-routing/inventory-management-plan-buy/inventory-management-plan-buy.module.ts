import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlanBuy = {
  id: "01a06289-2676-71eb-b326-afa48bd70c7a",
  pageTypeSlug: "module",
  slug: "inventory-management-plan-buy",
  definition: "what a buy rule falls short of, put into the plan as a vendor errand",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Buying is planned against a character that is no character.",
    },
    {
      invariantKind: "departure",
      statement: "A buy rule met by what the account holds adds no errand.",
    },
  ],
} as const satisfies Module

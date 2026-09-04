import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlanTypes = {
  id: "01a06151-370a-7582-a557-5052447bbc7c",
  pageTypeSlug: "module",
  slug: "inventory-management-plan-types",
  definition: "the shape of a management plan, of the stops it makes and of the steps at each",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A plan is a list of venue stops holding the actions taken at that stop.",
    },
    {
      invariantKind: "departure",
      statement: "A character session gathers what one character does before the next takes over.",
    },
  ],
} as const satisfies Module

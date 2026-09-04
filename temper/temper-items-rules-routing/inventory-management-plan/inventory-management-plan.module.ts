import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlan = {
  id: "01a06289-2676-70d1-b558-0f7f5fbd97de",
  pageTypeSlug: "module",
  slug: "inventory-management-plan",
  definition: "the whole errand list the rules come to, ordered by who does what next",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character owed a retrieval waits for the character depositing that item.",
    },
    {
      invariantKind: "departure",
      statement: "A session freeing no venue is skipped rather than repeated.",
    },
    {
      invariantKind: "departure",
      statement: "Planning gives up after a hundred rounds.",
    },
  ],
} as const satisfies Module

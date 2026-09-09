import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryPlanChecklist = {
  id: "01a0615a-a1dd-7b58-b123-f480b766aed5",
  pageTypeSlug: "module",
  slug: "inventory-plan-checklist",
  definition: "a management plan written out as a checklist a player reads while playing",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checklist follows the plan's stops in the order the stops are visited.",
    },
  ],
} as const satisfies Module

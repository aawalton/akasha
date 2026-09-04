import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlanSimulation = {
  id: "01a0615a-a1dc-7109-83cd-300cf2753778",
  pageTypeSlug: "module",
  slug: "inventory-management-plan-simulation",
  definition: "one character's session run through in advance to see what each step leaves behind",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A simulated step changes only the state the simulation carries.",
    },
    {
      invariantKind: "absence",
      statement: "No captured holding is changed by a simulation.",
    },
  ],
} as const satisfies Module

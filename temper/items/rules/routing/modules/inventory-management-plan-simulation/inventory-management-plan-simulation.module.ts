import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryManagementPlanSimulation = {
  id: "01a0615a-a1dc-7109-83cd-300cf2753778",
  type: "page-type/module",
  slug: "inventory-management-plan-simulation",
  definition: "a character's session run through in advance to see what each step leaves behind",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A simulated step changes only the state the simulation has.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No captured holding is changed by a simulation.",
    },
  ],
} as const satisfies Module

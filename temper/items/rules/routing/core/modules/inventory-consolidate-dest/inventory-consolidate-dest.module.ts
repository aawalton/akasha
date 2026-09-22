import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryConsolidateDest = {
  id: "01a06151-3707-766e-bfa9-91d05b3b9c5c",
  type: "page-type/module",
  slug: "inventory-consolidate-dest",
  definition: "whether a destination gathers a thing from every character into one place",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A destination gathering stock is known by the name the destination has.",
    },
  ],
} as const satisfies Module

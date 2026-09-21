import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryItemOutcomes = {
  id: "01a09cdb-91fc-7a30-aff9-71b0686321f2",
  type: "page-type/module",
  slug: "inventory-item-outcomes",
  definition: "the outcome each item held reaches over the whole rule chain",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every item held reaches an outcome rather than the items one rule takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An outcome is reached under the facts and the environment the matcher rules on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rule here decides what an item resolves to.",
    },
  ],
} as const satisfies Module

import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryItemOutcomes = {
  id: "01a09cdb-91fc-7a30-aff9-71b0686321f2",
  type: "module",
  slug: "inventory-item-outcomes",
  definition: "the outcome each item held reaches over the whole rule chain",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every item held reaches an outcome rather than the items one rule takes.",
    },
    {
      invariantKind: "departure",
      statement: "An outcome is reached under the facts and the environment the matcher rules on.",
    },
    {
      invariantKind: "absence",
      statement: "No rule here decides what an item resolves to.",
    },
    {
      invariantKind: "absence",
      statement: "No code here reaches the game.",
    },
  ],
} as const satisfies Module

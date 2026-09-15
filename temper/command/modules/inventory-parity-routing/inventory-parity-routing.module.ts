import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryParityRouting = {
  id: "01a068e2-2270-76c1-aca3-9375d572748b",
  type: "page-type/module",
  slug: "inventory-parity-routing",
  definition: "where an item would go on each side, and whether the two sides agree",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A destination the game resolves by priority is not comparable off the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skew is claimed only where both sides matched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A route shown with one side missing is said to be informational.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two routes agree where their steps agree in order.",
    },
  ],
} as const satisfies Module

import type { Module } from "@akasha/code-system/module"

export const inventoryParityRouting = {
  id: "01a068e2-2270-76c1-aca3-9375d572748b",
  pageTypeSlug: "module",
  slug: "inventory-parity-routing",
  definition: "where an item would go on each side, and whether the two sides agree",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A destination the game resolves by priority is not comparable off the game.",
    },
    {
      invariantKind: "departure",
      statement: "A skew is claimed only where both sides matched.",
    },
    {
      invariantKind: "departure",
      statement: "A route shown with one side missing is said to be informational.",
    },
    {
      invariantKind: "departure",
      statement: "Two routes agree where their steps agree in order.",
    },
  ],
} as const satisfies Module

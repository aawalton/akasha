import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ttcShoppingOptimizer = {
  id: "01a060cf-b0b0-7518-a8fe-69b071ba12a7",
  type: "module",
  slug: "ttc-shopping-optimizer",
  definition: "which listings to buy so that the fewest kiosks are visited",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two items asking the same search ask Tamriel Trade Centre once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item with the fewest candidate listings is settled first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One listing answers one item.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kiosk with a larger share of the items still wanted breaks a tie on price.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item no listing answers comes back among the missing.",
    },
  ],
} as const satisfies Module

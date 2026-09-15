import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const computeItemStock = {
  id: "01a0626e-3e05-7d4e-803d-d88f172652ca",
  type: "module",
  slug: "compute-item-stock",
  definition: "how much of an item an account has, split by who holds it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The bank is counted on its own as well as among the rest of an account's storage.",
    },
  ],
} as const satisfies Module

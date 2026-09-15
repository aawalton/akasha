import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData113 = {
  id: "01a061a3-982c-7378-8480-c780e5070af8",
  type: "module",
  slug: "sets-data-113",
  definition: "part 113 of the gear set table, vanguards-challenge through vengeance-leech",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A set moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module

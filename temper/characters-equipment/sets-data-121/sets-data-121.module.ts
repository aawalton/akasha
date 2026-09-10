import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData121 = {
  id: "01a061a3-982f-709d-b760-3dee49f0dc9e",
  pageTypeSlug: "module",
  slug: "sets-data-121",
  definition: "part 121 of the gear set table, wrathsun through xanmeer-genesis",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
    {
      invariantKind: "gap",
      statement: "A set moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module

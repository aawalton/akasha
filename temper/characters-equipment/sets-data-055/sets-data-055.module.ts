import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData055 = {
  id: "01a061a3-3080-7b37-a0b4-908e22c58d35",
  pageTypeSlug: "module",
  slug: "sets-data-055",
  definition: "part 055 of the gear set table, mad-tinkerer through maligaligs-maelstrom",
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

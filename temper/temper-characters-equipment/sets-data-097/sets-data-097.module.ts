import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData097 = {
  id: "01a061a3-9827-76ba-9fcc-3059d13843d3",
  pageTypeSlug: "module",
  slug: "sets-data-097",
  definition: "part 097 of the gear set table, stonekeeper through stormfist",
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

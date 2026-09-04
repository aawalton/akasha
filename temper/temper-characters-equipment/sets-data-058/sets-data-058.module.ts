import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData058 = {
  id: "01a061a3-3081-75ea-896e-f62377368d79",
  pageTypeSlug: "module",
  slug: "sets-data-058",
  definition: "part 058 of the gear set table, meritorious-service through monomyth-reforged",
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

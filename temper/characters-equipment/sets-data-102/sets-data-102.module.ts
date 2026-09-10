import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData102 = {
  id: "01a061a3-9829-7fdb-a123-0a23f5013d14",
  pageTypeSlug: "module",
  slug: "sets-data-102",
  definition: "part 102 of the gear set table, test-of-resolve through the-ice-furnace",
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

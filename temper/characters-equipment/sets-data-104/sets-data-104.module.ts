import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData104 = {
  id: "01a061a3-982a-733a-8dad-7130523cb8f1",
  pageTypeSlug: "module",
  slug: "sets-data-104",
  definition: "part 104 of the gear set table, threads-of-war through thurvokun",
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

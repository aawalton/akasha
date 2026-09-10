import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData091 = {
  id: "01a061a3-6219-7b52-bbae-f23036e68d82",
  pageTypeSlug: "module",
  slug: "sets-data-091",
  definition: "part 091 of the gear set table, siegemasters-focus through skooma-smuggler",
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

import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData076 = {
  id: "01a061a3-6215-7c9c-aa76-219fa16444a9",
  pageTypeSlug: "module",
  slug: "sets-data-076",
  definition: "part 076 of the gear set table, permafrost through pillagers-profit",
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

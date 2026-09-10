import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData115 = {
  id: "01a061a3-982d-7d79-9821-de16c2494075",
  pageTypeSlug: "module",
  slug: "sets-data-115",
  definition: "part 115 of the gear set table, vicious-death through voidcaller",
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

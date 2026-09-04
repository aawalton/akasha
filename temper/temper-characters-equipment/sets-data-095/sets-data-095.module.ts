import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData095 = {
  id: "01a061a3-621a-74e0-b2ca-044f230dba85",
  pageTypeSlug: "module",
  slug: "sets-data-095",
  definition: "part 095 of the gear set table, spider-cultist-cowl through steadfast-hero",
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

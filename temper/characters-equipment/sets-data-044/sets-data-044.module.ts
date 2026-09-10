import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData044 = {
  id: "01a061a3-0134-70db-b3e7-e7978f73bef2",
  pageTypeSlug: "module",
  slug: "sets-data-044",
  definition: "part 044 of the gear set table, hrothgars-chill through icy-conjurer",
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

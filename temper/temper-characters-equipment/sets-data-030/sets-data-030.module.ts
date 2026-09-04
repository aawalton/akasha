import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData030 = {
  id: "01a061a3-0130-75c2-bb76-cc26990a8915",
  pageTypeSlug: "module",
  slug: "sets-data-030",
  definition: "part 030 of the gear set table, enervating-aura through eternal-vigor",
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

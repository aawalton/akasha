import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData047 = {
  id: "01a061a3-307d-7078-8700-a1dcef2107c8",
  pageTypeSlug: "module",
  slug: "sets-data-047",
  definition: "part 047 of the gear set table, iron-flask through jerensis-bladestorm",
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

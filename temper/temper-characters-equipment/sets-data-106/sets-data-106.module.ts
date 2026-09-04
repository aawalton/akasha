import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData106 = {
  id: "01a061a3-982a-7cfa-8655-33117192cbed",
  pageTypeSlug: "module",
  slug: "sets-data-106",
  definition:
    "part 106 of the gear set table, torc-of-the-last-ayleid-king through transformative-hope",
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

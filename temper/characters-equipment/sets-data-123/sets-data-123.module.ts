import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData123 = {
  id: "01a061a4-18b0-7f37-89cc-e3646ca45a3c",
  pageTypeSlug: "module",
  slug: "sets-data-123",
  definition: "part 123 of the gear set table, zens-redress through zoal-the-ever-wakeful",
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

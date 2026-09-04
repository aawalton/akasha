import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData073 = {
  id: "01a061a3-6214-7af6-a01b-0a7dd14667d1",
  pageTypeSlug: "module",
  slug: "sets-data-073",
  definition:
    "part 073 of the gear set table, perfected-saxhleel-champion through perfected-sul-xans-torment",
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

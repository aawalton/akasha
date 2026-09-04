import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData117 = {
  id: "01a061a3-982d-7c52-8244-4f020918009f",
  pageTypeSlug: "module",
  slug: "sets-data-117",
  definition: "part 117 of the gear set table, warrior-poet through way-of-martial-knowledge",
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

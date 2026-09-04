import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData079 = {
  id: "01a061a3-6216-7505-9d87-1ec9b9ff77a6",
  pageTypeSlug: "module",
  slug: "sets-data-079",
  definition: "part 079 of the gear set table, quick-serpent through rampaging-slash",
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

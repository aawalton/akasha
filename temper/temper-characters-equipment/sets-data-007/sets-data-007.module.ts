import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData007 = {
  id: "01a0619f-59e4-7446-aa7d-a88b18e74e8c",
  pageTypeSlug: "module",
  slug: "sets-data-007",
  definition: "part 007 of the gear set table, ashen-grip through aurorans-thunder",
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

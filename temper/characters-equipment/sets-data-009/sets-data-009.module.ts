import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData009 = {
  id: "01a0619f-59e6-7f83-8977-e17ef5e528d2",
  pageTypeSlug: "module",
  slug: "sets-data-009",
  definition: "part 009 of the gear set table, bahrahas-curse through barkskin",
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

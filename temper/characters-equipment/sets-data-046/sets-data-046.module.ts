import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData046 = {
  id: "01a061a3-0134-7553-9ca4-392186c3e449",
  pageTypeSlug: "module",
  slug: "sets-data-046",
  definition: "part 046 of the gear set table, indomitable-fury through inventors-guard",
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

import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData090 = {
  id: "01a061a3-6219-7366-a208-39f360a55cc4",
  pageTypeSlug: "module",
  slug: "sets-data-090",
  definition: "part 090 of the gear set table, sheer-venom through shroud-of-the-lich",
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

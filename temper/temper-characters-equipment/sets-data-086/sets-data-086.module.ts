import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData086 = {
  id: "01a061a3-6218-74e3-b542-58e4877a896a",
  pageTypeSlug: "module",
  slug: "sets-data-086",
  definition: "part 086 of the gear set table, seeker-synthesis through senche-rahts-grit",
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

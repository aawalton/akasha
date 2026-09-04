import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData033 = {
  id: "01a061a3-0131-7f7b-bf97-d4173fb1442e",
  pageTypeSlug: "module",
  slug: "sets-data-033",
  definition: "part 033 of the gear set table, fellowships-fortitude through fledglings-nest",
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

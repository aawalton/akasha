import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData100 = {
  id: "01a061a3-9828-7640-998d-bf625eaac138",
  pageTypeSlug: "module",
  slug: "sets-data-100",
  definition: "part 100 of the gear set table, syrabanes-grip through talfygs-treachery",
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

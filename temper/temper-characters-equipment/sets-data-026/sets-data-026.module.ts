import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData026 = {
  id: "01a061a3-012f-7af1-8e12-d080b1dfc659",
  pageTypeSlug: "module",
  slug: "sets-data-026",
  definition: "part 026 of the gear set table, dragons-appetite through draugr-hulk",
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

import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData012 = {
  id: "01a0619f-59e8-7142-ba08-72302a34dffc",
  pageTypeSlug: "module",
  slug: "sets-data-012",
  definition: "part 012 of the gear set table, berserking-warrior through black-rose",
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

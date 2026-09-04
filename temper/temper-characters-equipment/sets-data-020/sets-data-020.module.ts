import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData020 = {
  id: "01a0619f-59ed-7157-b28f-79872fe59df4",
  pageTypeSlug: "module",
  slug: "sets-data-020",
  definition: "part 020 of the gear set table, crimson-twilight through curse-eater",
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

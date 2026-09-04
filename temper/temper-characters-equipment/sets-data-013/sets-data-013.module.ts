import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData013 = {
  id: "01a0619f-59e8-7b41-bba9-7613b5b8437d",
  pageTypeSlug: "module",
  slug: "sets-data-013",
  definition: "part 013 of the gear set table, blackfeather-flight through bloodlords-embrace",
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

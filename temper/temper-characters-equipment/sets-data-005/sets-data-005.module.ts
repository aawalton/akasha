import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData005 = {
  id: "01a0619f-59e3-71a3-81ef-ed620b2f305a",
  pageTypeSlug: "module",
  slug: "sets-data-005",
  definition: "part 005 of the gear set table, arkays-charity through armor-of-the-seducer",
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

import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData022 = {
  id: "01a061a3-012d-76d1-8121-4da9194f73cf",
  pageTypeSlug: "module",
  slug: "sets-data-022",
  definition: "part 022 of the gear set table, dauntless-combatant through deadlands-demolisher",
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

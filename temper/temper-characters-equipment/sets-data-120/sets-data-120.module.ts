import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData120 = {
  id: "01a061a3-982e-7966-8c94-9c97757c92ca",
  pageTypeSlug: "module",
  slug: "sets-data-120",
  definition: "part 120 of the gear set table, wise-mage through wrath-of-the-imperium",
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

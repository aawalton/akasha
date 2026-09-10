import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData107 = {
  id: "01a061a3-982b-7e21-bc18-022f07a02a3e",
  pageTypeSlug: "module",
  slug: "sets-data-107",
  definition: "part 107 of the gear set table, trappings-of-invigoration through true-sworn-fury",
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

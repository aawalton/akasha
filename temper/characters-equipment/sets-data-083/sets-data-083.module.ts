import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData083 = {
  id: "01a061a3-6217-75ea-87f4-2aed89e54530",
  pageTypeSlug: "module",
  slug: "sets-data-083",
  definition:
    "part 083 of the gear set table, robes-of-alteration-mastery through robes-of-transmutation",
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

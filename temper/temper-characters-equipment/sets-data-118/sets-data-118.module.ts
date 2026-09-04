import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData118 = {
  id: "01a061a3-982e-740c-a453-03a0b0823013",
  pageTypeSlug: "module",
  slug: "sets-data-118",
  definition: "part 118 of the gear set table, way-of-the-arena through wild-impulse",
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

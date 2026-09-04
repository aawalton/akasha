import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData041 = {
  id: "01a061a3-0133-7ae2-8a8b-a2cbc3e18865",
  pageTypeSlug: "module",
  slug: "sets-data-041",
  definition: "part 041 of the gear set table, heem-jas-retribution through hexos-ward",
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

import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData071 = {
  id: "01a061a3-3085-7fe3-be40-6154b2f3d8c6",
  pageTypeSlug: "module",
  slug: "sets-data-071",
  definition:
    "part 071 of the gear set table, perfected-mantle-of-siroria through perfected-piercing-spray",
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

import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData093 = {
  id: "01a061a3-621a-743b-bcf3-563642ad2eb2",
  pageTypeSlug: "module",
  slug: "sets-data-093",
  definition: "part 093 of the gear set table, snow-treaders through spectral-cloak",
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

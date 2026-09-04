import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData105 = {
  id: "01a061a3-982a-7f65-a30e-e01fc393c814",
  pageTypeSlug: "module",
  slug: "sets-data-105",
  definition: "part 105 of the gear set table, tide-born-wildstalker through toothrow",
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

import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData059 = {
  id: "01a061a3-3081-71ab-9b5f-eca4cbef1fde",
  pageTypeSlug: "module",
  slug: "sets-data-059",
  definition: "part 059 of the gear set table, moon-hunter through mothers-sorrow",
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

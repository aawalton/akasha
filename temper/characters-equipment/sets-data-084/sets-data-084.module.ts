import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData084 = {
  id: "01a061a3-6217-7d12-b9ef-4eaf90d2c56a",
  pageTypeSlug: "module",
  slug: "sets-data-084",
  definition: "part 084 of the gear set table, roksa-the-warped through savage-werewolf",
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

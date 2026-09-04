import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData064 = {
  id: "01a061a3-3083-70ea-81d9-527f65aa52ff",
  pageTypeSlug: "module",
  slug: "sets-data-064",
  definition: "part 064 of the gear set table, noxious-boulder through oblivions-foe",
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

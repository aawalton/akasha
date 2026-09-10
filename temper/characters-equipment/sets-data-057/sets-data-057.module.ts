import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData057 = {
  id: "01a061a3-3081-7fb1-ae06-89f0c47b19c9",
  pageTypeSlug: "module",
  slug: "sets-data-057",
  definition: "part 057 of the gear set table, master-architect through meridias-blessed-armor",
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

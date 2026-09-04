import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData042 = {
  id: "01a061a3-0133-7cef-9ca5-5c06b9c8b2a6",
  pageTypeSlug: "module",
  slug: "sets-data-042",
  definition: "part 042 of the gear set table, hide-of-morihaus through hircines-veneer",
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

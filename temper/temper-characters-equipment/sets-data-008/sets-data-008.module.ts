import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData008 = {
  id: "01a0619f-59e5-7052-ab40-6eacb491641e",
  pageTypeSlug: "module",
  slug: "sets-data-008",
  definition: "part 008 of the gear set table, automated-defense through back-alley-gourmand",
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

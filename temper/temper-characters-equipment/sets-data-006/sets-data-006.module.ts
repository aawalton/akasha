import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData006 = {
  id: "01a0619f-59e3-7312-9043-152fb7857819",
  pageTypeSlug: "module",
  slug: "sets-data-006",
  definition: "part 006 of the gear set table, armor-of-the-trainee through arms-of-the-ancestors",
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

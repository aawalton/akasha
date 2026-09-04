import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData017 = {
  id: "01a0619f-59eb-776d-aa7f-f1621cd6b1cb",
  pageTypeSlug: "module",
  slug: "sets-data-017",
  definition: "part 017 of the gear set table, chokethorn through clever-alchemist",
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

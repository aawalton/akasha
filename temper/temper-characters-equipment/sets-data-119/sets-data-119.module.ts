import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData119 = {
  id: "01a061a3-982e-7102-bb0f-f5afc93c6dca",
  pageTypeSlug: "module",
  slug: "sets-data-119",
  definition: "part 119 of the gear set table, wilderqueens-arch through wisdom-of-vanus",
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

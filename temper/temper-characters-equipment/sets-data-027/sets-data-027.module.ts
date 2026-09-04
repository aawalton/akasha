import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData027 = {
  id: "01a061a3-012f-7f43-ab2e-a512a0d4f3ab",
  pageTypeSlug: "module",
  slug: "sets-data-027",
  definition: "part 027 of the gear set table, draugrkins-grip through drozakars-claws",
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

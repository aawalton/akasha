import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData101 = {
  id: "01a061a3-9829-7676-adfc-98aa068d6aee",
  pageTypeSlug: "module",
  slug: "sets-data-101",
  definition: "part 101 of the gear set table, tarnished-nightmare through telvanni-enforcer",
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

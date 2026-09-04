import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData002 = {
  id: "01a0619f-59e0-7956-a49c-6d7ee46f218a",
  pageTypeSlug: "module",
  slug: "sets-data-002",
  definition: "part 002 of the gear set table, aetheric-lancer through alessian-order",
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

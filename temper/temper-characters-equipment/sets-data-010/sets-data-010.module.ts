import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData010 = {
  id: "01a0619f-59e6-7e98-8091-1da5b237100f",
  pageTypeSlug: "module",
  slug: "sets-data-010",
  definition: "part 010 of the gear set table, baron-thirsk through bastion-of-the-heartland",
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

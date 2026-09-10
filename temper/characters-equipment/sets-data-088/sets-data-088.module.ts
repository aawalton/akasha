import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData088 = {
  id: "01a061a3-6219-7419-906f-14895323268f",
  pageTypeSlug: "module",
  slug: "sets-data-088",
  definition: "part 088 of the gear set table, shacklebreaker through shalidors-curse",
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

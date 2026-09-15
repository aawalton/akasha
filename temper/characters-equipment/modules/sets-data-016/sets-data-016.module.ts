import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData016 = {
  id: "01a0619f-59ea-73ad-a024-8945d19add2b",
  type: "module",
  slug: "sets-data-016",
  definition: "part 016 of the gear set table, caluurions-legacy through chimeras-rebuke",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A set moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module

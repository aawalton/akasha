import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData018 = {
  id: "01a0619f-59eb-774a-8868-2cdaa188edaf",
  type: "module",
  slug: "sets-data-018",
  definition: "part 018 of the gear set table, coldharbours-favorite through corpseburster",
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

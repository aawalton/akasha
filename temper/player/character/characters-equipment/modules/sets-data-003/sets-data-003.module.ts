import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData003 = {
  id: "01a0619f-59e1-7a67-bb49-f21e1f7ceae0",
  type: "page-type/module",
  slug: "sets-data-003",
  definition: "part 003 of the gear set table, alessias-bulwark through ancient-dragonguard",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module

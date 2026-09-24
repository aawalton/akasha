import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData080 = {
  id: "01a061a3-6216-7bcc-a03c-347d9a634903",
  type: "page-type/module",
  slug: "sets-data-080",
  definition: "part 080 of the gear set table, rangers-gait through reawakened-hierophant",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module

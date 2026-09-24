import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData101 = {
  id: "01a061a3-9829-7676-adfc-98aa068d6aee",
  type: "page-type/module",
  slug: "sets-data-101",
  definition: "part 101 of the gear set table, tarnished-nightmare through telvanni-enforcer",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module

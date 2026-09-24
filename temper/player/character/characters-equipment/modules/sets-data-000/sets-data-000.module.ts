import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData000 = {
  id: "01a0619d-2caa-7226-be72-6ecbc3be7403",
  type: "page-type/module",
  slug: "sets-data-000",
  definition: "part 000 of the gear set table, no-set through aegis-caller",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module

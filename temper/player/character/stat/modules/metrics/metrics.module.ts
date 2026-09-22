import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const metrics = {
  id: "01a06131-abb7-7c5f-81a0-69154a33d704",
  type: "page-type/module",
  slug: "metrics",
  definition: "every character stat indexed by its id, with the ones carrying a formula kept apart",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "This table is gathered from the sixteen data groups in the order the groups are named.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A stat moved to another group changes the order this table answers its ids in.",
    },
  ],
} as const satisfies Module

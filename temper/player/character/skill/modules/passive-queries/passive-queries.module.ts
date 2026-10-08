import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const passiveQueries = {
  id: "01a06187-b3a4-7d21-b96e-890c450998e3",
  type: "page-type/module",
  slug: "passive-queries",
  definition: "what a character's slotted skills and worn armour answer about its passives",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The empty slot sentinel counts toward no skill line.",
    },
  ],
  createdAt: "2026-09-02T09:51:18.436Z",
  updatedAt: "2026-09-21T15:38:18.000Z",
} as const satisfies Module

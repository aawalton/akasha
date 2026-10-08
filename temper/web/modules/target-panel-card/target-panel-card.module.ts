import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const targetPanelCard = {
  id: "01a0642c-5b82-7888-a925-140adcf25275",
  type: "page-type/module",
  slug: "target-panel-card",
  definition: "a panel card with a character's target",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.746Z",
  updatedAt: "2026-09-27T11:47:37.000Z",
} as const satisfies Module

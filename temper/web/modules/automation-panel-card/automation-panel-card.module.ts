import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const automationPanelCard = {
  id: "01a06589-8d4e-7000-b705-cd1447962c5f",
  type: "page-type/module",
  slug: "automation-panel-card",
  definition: "the card with a character's automation toggles",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-03T04:31:48.558Z",
  updatedAt: "2026-09-27T11:33:36.000Z",
} as const satisfies Module

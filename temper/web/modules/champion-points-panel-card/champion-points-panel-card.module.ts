import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const championPointsPanelCard = {
  id: "01a06421-f74b-722c-9330-74c477580012",
  type: "page-type/module",
  slug: "champion-points-panel-card",
  definition: "the champion points the account has earned against the most there are",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is read from the champion points completion category page.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:27:32.000Z",
} as const satisfies Module

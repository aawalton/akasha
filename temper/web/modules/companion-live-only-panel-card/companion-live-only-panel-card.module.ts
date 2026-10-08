import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionLiveOnlyPanelCard = {
  id: "01a0641f-8bee-7721-aab7-e59938f7ef2b",
  type: "page-type/module",
  slug: "companion-live-only-panel-card",
  definition: "a panel card drawing a companion the game holds and no plan does",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:56:24.174Z",
  updatedAt: "2026-09-27T11:41:54.000Z",
} as const satisfies Module

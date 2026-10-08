import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionArmorPanelCard = {
  id: "01a06421-251d-72e8-80e0-6ed2f7403311",
  type: "page-type/module",
  slug: "companion-armor-panel-card",
  definition: "a panel card stating the armor a companion wears",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages and the companion catalog's own pages.",
    },
  ],
  createdAt: "2026-09-02T21:58:08.925Z",
  updatedAt: "2026-09-27T11:45:21.000Z",
} as const satisfies Module

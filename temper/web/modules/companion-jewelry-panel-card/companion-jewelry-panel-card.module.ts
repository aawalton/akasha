import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionJewelryPanelCard = {
  id: "01a06421-251e-7014-98f4-c77091e7eb25",
  type: "page-type/module",
  slug: "companion-jewelry-panel-card",
  definition: "a panel card stating the jewelry a companion wears",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title and empty choices are read from catalog pages.",
    },
  ],
  createdAt: "2026-09-02T21:58:08.926Z",
  updatedAt: "2026-09-27T11:45:02.000Z",
} as const satisfies Module

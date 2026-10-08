import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shoppingNextLocationPanelCard = {
  id: "01a063a1-8cc1-7007-9b9d-d9462663912b",
  type: "page-type/module",
  slug: "shopping-next-location-panel-card",
  definition: "the next place on a shopping route and what is bought there",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The card's wording is read from phrase pages rather than written in its code.",
    },
  ],
  createdAt: "2026-09-02T19:38:46.849Z",
  updatedAt: "2026-09-27T11:42:58.000Z",
} as const satisfies Module

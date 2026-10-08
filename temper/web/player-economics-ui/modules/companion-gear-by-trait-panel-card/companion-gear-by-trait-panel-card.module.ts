import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionGearByTraitPanelCard = {
  id: "01a063a1-8cc1-7002-9ca6-b359c4f2532f",
  type: "page-type/module",
  slug: "companion-gear-by-trait-panel-card",
  definition: "the gear a player still needs, filed by trait",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The card's wording is read from phrase pages rather than written in its code.",
    },
  ],
  createdAt: "2026-09-02T19:38:46.849Z",
  updatedAt: "2026-09-27T11:38:49.000Z",
} as const satisfies Module

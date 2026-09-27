import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionGearByPricePanelCard = {
  id: "01a063a1-8cc1-7001-9790-51327f6c3879",
  type: "page-type/module",
  slug: "companion-gear-by-price-panel-card",
  definition: "the gear a player still needs, filed by what it costs",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A price bucket is held by id, and its label is read from phrase pages.",
    },
  ],
} as const satisfies Module

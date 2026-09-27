import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionGearByCompanionPanelCard = {
  id: "01a063a1-8cc1-7000-b772-229eab01131b",
  type: "page-type/module",
  slug: "companion-gear-by-companion-panel-card",
  definition: "the gear a player still needs, filed under each companion",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The card's wording is read from phrase pages rather than written in its code.",
    },
  ],
} as const satisfies Module

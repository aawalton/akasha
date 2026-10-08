import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const armorCard = {
  id: "01a0642d-9a17-7abb-8e55-5319438ebc16",
  type: "page-type/module",
  slug: "armor-card",
  definition: "an armor slot: its set, trait, enchant, quality and weight, each pickable",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The weights offered are drawn again whenever the gear tables are read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages and the gear catalog's own pages.",
    },
  ],
  createdAt: "2026-09-02T22:11:45.303Z",
  updatedAt: "2026-09-27T11:44:38.000Z",
} as const satisfies Module

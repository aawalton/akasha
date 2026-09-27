import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const weaponCard = {
  id: "01a0642d-9a17-71b0-8afa-a9b9f5057fc6",
  type: "page-type/module",
  slug: "weapon-card",
  definition: "a weapon slot: its type, set, trait, enchant and quality, each pickable",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The weapon types offered are drawn again whenever the gear tables are read again.",
    },
  ],
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoPlayerEquipmentConstantsData = {
  id: "01a060d9-498b-744f-8dc9-b2222b4f4b29",
  type: "page-type/module",
  slug: "eso-player-equipment-constants-data",
  definition: "the numbers the game gives player weapon types, armor weights and qualities",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "These numbers were written out from the player equipment constant pages.",
    },
  ],
} as const satisfies Module

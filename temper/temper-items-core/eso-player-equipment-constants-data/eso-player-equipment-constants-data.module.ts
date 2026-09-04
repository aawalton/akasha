import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const esoPlayerEquipmentConstantsData = {
  id: "01a060d9-498b-744f-8dc9-b2222b4f4b29",
  pageTypeSlug: "module",
  slug: "eso-player-equipment-constants-data",
  definition: "the numbers the game gives player weapon types, armor weights and qualities",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "These numbers were written out from the player equipment constant pages.",
    },
    {
      invariantKind: "gap",
      statement: "No vocabulary in akasha names every weapon type and armor weight yet.",
    },
  ],
} as const satisfies Module

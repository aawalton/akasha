import type { Module } from "@akasha/code-system/module"

export const mapPinsZoneAchievement = {
  id: "01a06269-2b10-7be6-8fd7-e3a288a28890",
  pageTypeSlug: "module",
  slug: "map-pins-zone-achievement",
  definition: "the achievement pin kinds counted for each zone",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module

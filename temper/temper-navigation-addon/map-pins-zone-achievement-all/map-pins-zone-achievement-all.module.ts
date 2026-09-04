import type { Module } from "@akasha/code-system/module"

export const mapPinsZoneAchievementAll = {
  id: "01a06269-2b0f-7500-886d-b52fac535848",
  pageTypeSlug: "module",
  slug: "map-pins-zone-achievement-all",
  definition: "every achievement counted for each zone",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module

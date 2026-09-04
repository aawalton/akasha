import type { Module } from "@akasha/code-system/module"

export const mapPinsFishingAchievements = {
  id: "01a06269-2aab-7282-8596-c76fba78efef",
  pageTypeSlug: "module",
  slug: "map-pins-fishing-achievements",
  definition: "the achievement behind each fishing zone",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module

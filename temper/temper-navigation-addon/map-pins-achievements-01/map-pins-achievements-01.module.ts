import type { Module } from "@akasha/code-system/module"

export const mapPinsAchievements01 = {
  id: "01a06269-2a3f-7bda-bb13-4be8c4920e7d",
  pageTypeSlug: "module",
  slug: "map-pins-achievements-01",
  definition: "one run of the achievement pin places by zone",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      invariantKind: "departure",
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module

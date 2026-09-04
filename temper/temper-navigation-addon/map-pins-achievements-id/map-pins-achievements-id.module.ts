import type { Module } from "@akasha/code-system/module"

export const mapPinsAchievementsId = {
  id: "01a06269-2a43-74b9-bf45-f2523005841a",
  pageTypeSlug: "module",
  slug: "map-pins-achievements-id",
  definition: "the achievement id behind each achievement pin kind",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module

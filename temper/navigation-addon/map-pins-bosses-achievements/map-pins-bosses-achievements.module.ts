import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const mapPinsBossesAchievements = {
  id: "01a06269-2a46-7e88-85de-57a6723d98a1",
  pageTypeSlug: "module",
  type: "module",
  slug: "map-pins-bosses-achievements",
  definition: "the achievement behind each world boss",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module

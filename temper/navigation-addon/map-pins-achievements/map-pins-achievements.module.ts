import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const mapPinsAchievements = {
  id: "01a06269-2a42-797a-84d2-ce0b7f3396d0",
  type: "module",
  slug: "map-pins-achievements",
  definition: "the achievement pin places by zone, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module

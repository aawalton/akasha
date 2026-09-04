import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionColors = {
  id: "01a060f9-babe-7d15-8b17-8c3ff34e4b9a",
  pageTypeSlug: "module",
  slug: "dungeon-champion-colors",
  definition:
    "a four-number color turned into the shapes the game's color picker and textures take",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A color with no fourth number is fully opaque.",
    },
  ],
} as const satisfies Module

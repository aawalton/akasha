import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const alikrDesert55610 = {
  id: "01a0d5d9-f71d-74f5-8d96-88d6bf5324a2",
  type: "page-type/temper-world-skyshard",
  slug: "alikr-desert-556-10",
  title: "Alik'r Desert skyshard 10 of achievement 556",
  esoAchievementId: 556,
  shardNumber: 10,
  worldZone: "temper-world-zone/alikr-desert",
  mapPositions: [
    { mapFolder: "alikr", mapTile: "aldunz_base", mapX: 0.146, mapY: 0.436 },
    { mapFolder: "alikr", mapTile: "alikr_base", mapX: 0.6412, mapY: 0.6435, placeKinds: [2] },
  ],
} as const satisfies TemperWorldSkyshard

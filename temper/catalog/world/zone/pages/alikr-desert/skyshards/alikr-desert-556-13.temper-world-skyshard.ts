import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const alikrDesert55613 = {
  id: "01a0d5d9-f71d-79b1-8f01-066aec489cfe",
  type: "page-type/temper-world-skyshard",
  slug: "alikr-desert-556-13",
  title: "Alik'r Desert skyshard 13 of achievement 556",
  esoAchievementId: 556,
  shardNumber: 13,
  worldZone: "temper-world-zone/alikr-desert",
  mapPositions: [
    { mapFolder: "alikr", mapTile: "alikr_base", mapX: 0.8312, mapY: 0.5806, placeKinds: [2] },
    { mapFolder: "alikr", mapTile: "sandblownmine_base", mapX: 0.854, mapY: 0.347 },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const alikrDesert55614 = {
  id: "01a0d5d9-f71d-70b5-9ff4-d735a88a1c17",
  type: "page-type/temper-world-skyshard",
  slug: "alikr-desert-556-14",
  title: "Alik'r Desert skyshard 14 of achievement 556",
  esoAchievementId: 556,
  shardNumber: 14,
  worldZone: "temper-world-zone/alikr-desert",
  mapPositions: [
    { mapFolder: "alikr", mapTile: "alikr_base", mapX: 0.2224, mapY: 0.5678, placeKinds: [2] },
    { mapFolder: "alikr", mapTile: "santaki_base", mapX: 0.917, mapY: 0.709 },
  ],
} as const satisfies TemperWorldSkyshard

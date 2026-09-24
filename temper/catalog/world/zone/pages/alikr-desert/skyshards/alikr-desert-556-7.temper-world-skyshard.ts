import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const alikrDesert5567 = {
  id: "01a0d5d9-f71d-7a70-ab49-828127848aaf",
  type: "page-type/temper-world-skyshard",
  slug: "alikr-desert-556-7",
  title: "Alik'r Desert skyshard 7 of achievement 556",
  esoAchievementId: 556,
  shardNumber: 7,
  worldZone: "temper-world-zone/alikr-desert",
  mapPositions: [
    { mapFolder: "alikr", mapTile: "alikr_base", mapX: 0.7738, mapY: 0.4364, placeKinds: [1] },
    { mapFolder: "alikr", mapTile: "kozanset_base", mapX: 0.6501, mapY: 0.3348 },
  ],
} as const satisfies TemperWorldSkyshard

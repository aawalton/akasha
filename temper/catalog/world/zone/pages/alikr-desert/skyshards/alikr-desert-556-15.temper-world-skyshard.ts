import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const alikrDesert55615 = {
  id: "01a0d5d9-f71d-73a1-b0c2-88b0b73a86e2",
  type: "page-type/temper-world-skyshard",
  slug: "alikr-desert-556-15",
  title: "Alik'r Desert skyshard 15 of achievement 556",
  esoAchievementId: 556,
  shardNumber: 15,
  worldZone: "temper-world-zone/alikr-desert",
  mapPositions: [
    { mapFolder: "alikr", mapTile: "alikr_base", mapX: 0.9008, mapY: 0.5207, placeKinds: [2] },
    { mapFolder: "alikr", mapTile: "yldzuun_base", mapX: 0.695, mapY: 0.329 },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const alikrDesert55616 = {
  id: "01a0d5d9-f71d-72a0-9c42-ed4934719d63",
  type: "page-type/temper-world-skyshard",
  slug: "alikr-desert-556-16",
  title: "Alik'r Desert skyshard 16 of achievement 556",
  esoAchievementId: 556,
  shardNumber: 16,
  worldZone: "temper-world-zone/alikr-desert",
  mapPositions: [
    { mapFolder: "alikr", mapTile: "alikr_base", mapX: 0.705, mapY: 0.389, placeKinds: [3] },
    { mapFolder: "alikr", mapTile: "lostcity_base", mapX: 0.471, mapY: 0.58 },
  ],
} as const satisfies TemperWorldSkyshard

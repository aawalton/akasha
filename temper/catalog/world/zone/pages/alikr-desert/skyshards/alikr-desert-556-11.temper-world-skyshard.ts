import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const alikrDesert55611 = {
  id: "01a0d5d9-f71d-7e11-a7ac-b45ba8643a4a",
  type: "page-type/temper-world-skyshard",
  slug: "alikr-desert-556-11",
  title: "Alik'r Desert skyshard 11 of achievement 556",
  esoAchievementId: 556,
  shardNumber: 11,
  worldZone: "temper-world-zone/alikr-desert",
  mapPositions: [
    { mapFolder: "alikr", mapTile: "alikr_base", mapX: 0.6482, mapY: 0.3484, placeKinds: [2] },
    { mapFolder: "alikr", mapTile: "coldrockdiggings_base", mapX: 0.903, mapY: 0.262 },
  ],
} as const satisfies TemperWorldSkyshard

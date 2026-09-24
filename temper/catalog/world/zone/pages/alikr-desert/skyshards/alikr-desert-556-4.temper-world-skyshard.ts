import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const alikrDesert5564 = {
  id: "01a0d5d9-f71d-7960-b5eb-23f92a91006c",
  type: "page-type/temper-world-skyshard",
  slug: "alikr-desert-556-4",
  title: "Alik'r Desert skyshard 4 of achievement 556",
  esoAchievementId: 556,
  shardNumber: 4,
  worldZone: "temper-world-zone/alikr-desert",
  mapPositions: [
    { mapFolder: "alikr", mapTile: "alikr_base", mapX: 0.5214, mapY: 0.6649, placeKinds: [1] },
    { mapFolder: "alikr", mapTile: "bergama_base", mapX: 0.4265, mapY: 0.6168 },
  ],
} as const satisfies TemperWorldSkyshard

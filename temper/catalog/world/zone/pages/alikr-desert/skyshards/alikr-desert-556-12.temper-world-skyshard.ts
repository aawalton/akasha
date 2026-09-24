import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const alikrDesert55612 = {
  id: "01a0d5d9-f71d-7774-809c-bd96a34e1147",
  type: "page-type/temper-world-skyshard",
  slug: "alikr-desert-556-12",
  title: "Alik'r Desert skyshard 12 of achievement 556",
  esoAchievementId: 556,
  shardNumber: 12,
  worldZone: "temper-world-zone/alikr-desert",
  mapPositions: [
    { mapFolder: "alikr", mapTile: "alikr_base", mapX: 0.4054, mapY: 0.5892, placeKinds: [2] },
    { mapFolder: "alikr", mapTile: "divadschagrinmine_base", mapX: 0.408, mapY: 0.533 },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const alikrDesert5561 = {
  id: "01a0d5d9-f71c-784f-94a9-ef357f809632",
  type: "page-type/temper-world-skyshard",
  slug: "alikr-desert-556-1",
  title: "Alik'r Desert skyshard 1 of achievement 556",
  esoAchievementId: 556,
  shardNumber: 1,
  worldZone: "temper-world-zone/alikr-desert",
  mapPositions: [
    { mapFolder: "alikr", mapTile: "alikr_base", mapX: 0.2462, mapY: 0.4904, placeKinds: [1] },
    { mapFolder: "alikr", mapTile: "sentinel_base", mapX: 0.3814, mapY: 0.6455 },
  ],
} as const satisfies TemperWorldSkyshard

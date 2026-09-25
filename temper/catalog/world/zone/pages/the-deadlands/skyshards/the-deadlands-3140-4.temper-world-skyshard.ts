import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theDeadlands31404 = {
  id: "01a0d5dc-e51d-7d46-986d-865b89ed4785",
  type: "page-type/temper-world-skyshard",
  slug: "the-deadlands-3140-4",
  title: "The Deadlands skyshard 4 of achievement 3140",
  esoAchievementId: 3140,
  shardNumber: 4,
  worldZone: "temper-world-zone/the-deadlands",
  mapPositions: [
    { mapFolder: "deadlands", mapTile: "u32_fargravezone_base", mapX: 0.602, mapY: 0.347 },
    { mapFolder: "deadlands", mapTile: "u32_theshambles_base", mapX: 0.4894, mapY: 0.5019 },
  ],
} as const satisfies TemperWorldSkyshard

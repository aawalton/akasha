import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theDeadlands31403 = {
  id: "01a0d5dc-e51c-7b95-807a-e187c1dd56ae",
  type: "page-type/temper-world-skyshard",
  slug: "the-deadlands-3140-3",
  title: "The Deadlands skyshard 3 of achievement 3140",
  esoAchievementId: 3140,
  shardNumber: 3,
  worldZone: "temper-world-zone/the-deadlands",
  mapPositions: [
    { mapFolder: "deadlands", mapTile: "u32deadlandszone_base", mapX: 0.6565, mapY: 0.3027 },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theDeadlands31401 = {
  id: "01a0d5dc-e51c-7fa4-a87e-013937ca01af",
  type: "page-type/temper-world-skyshard",
  slug: "the-deadlands-3140-1",
  title: "The Deadlands skyshard 1 of achievement 3140",
  esoAchievementId: 3140,
  shardNumber: 1,
  worldZone: "temper-world-zone/the-deadlands",
  mapPositions: [
    { mapFolder: "deadlands", mapTile: "u32deadlandszone_base", mapX: 0.4641, mapY: 0.6774 },
  ],
} as const satisfies TemperWorldSkyshard

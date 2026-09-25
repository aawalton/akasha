import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theDeadlands31402 = {
  id: "01a0d5dc-e51c-747a-ad83-5cab4a562f9a",
  type: "page-type/temper-world-skyshard",
  slug: "the-deadlands-3140-2",
  title: "The Deadlands skyshard 2 of achievement 3140",
  esoAchievementId: 3140,
  shardNumber: 2,
  worldZone: "temper-world-zone/the-deadlands",
  mapPositions: [
    { mapFolder: "deadlands", mapTile: "u32deadlandszone_base", mapX: 0.7115, mapY: 0.3896 },
  ],
} as const satisfies TemperWorldSkyshard

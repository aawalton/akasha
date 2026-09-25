import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theDeadlands31406 = {
  id: "01a0d5dc-e51d-779d-a2a0-d1883240d492",
  type: "page-type/temper-world-skyshard",
  slug: "the-deadlands-3140-6",
  title: "The Deadlands skyshard 6 of achievement 3140",
  esoAchievementId: 3140,
  shardNumber: 6,
  worldZone: "temper-world-zone/the-deadlands",
  mapPositions: [
    {
      mapFolder: "deadlands",
      mapTile: "u32_folly_delve_base",
      mapX: 0.7549,
      mapY: 0.5525,
      placeKinds: [2],
    },
    {
      mapFolder: "deadlands",
      mapTile: "u32deadlandszone_base",
      mapX: 0.8935,
      mapY: 0.2685,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theDeadlands31405 = {
  id: "01a0d5dc-e51d-72c9-82fc-211f74db5320",
  type: "page-type/temper-world-skyshard",
  slug: "the-deadlands-3140-5",
  title: "The Deadlands skyshard 5 of achievement 3140",
  esoAchievementId: 3140,
  shardNumber: 5,
  worldZone: "temper-world-zone/the-deadlands",
  mapPositions: [
    {
      mapFolder: "deadlands",
      mapTile: "u32_dreaded_refuge_ext_base",
      mapX: 0.2632,
      mapY: 0.2483,
      placeKinds: [2],
    },
    {
      mapFolder: "deadlands",
      mapTile: "u32deadlandszone_base",
      mapX: 0.1455,
      mapY: 0.536,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

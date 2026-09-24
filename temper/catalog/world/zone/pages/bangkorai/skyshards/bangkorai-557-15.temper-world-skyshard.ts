import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const bangkorai55715 = {
  id: "01a0d5db-49a3-794d-8575-e57208a88be1",
  type: "page-type/temper-world-skyshard",
  slug: "bangkorai-557-15",
  title: "Bangkorai skyshard 15 of achievement 557",
  esoAchievementId: 557,
  shardNumber: 15,
  worldZone: "temper-world-zone/bangkorai",
  mapPositions: [
    {
      mapFolder: "bangkorai",
      mapTile: "bangkorai_base",
      mapX: 0.647,
      mapY: 0.421,
      placeKinds: [2],
    },
    { mapFolder: "bangkorai", mapTile: "viridianwatch_base", mapX: 0.119, mapY: 0.333 },
  ],
} as const satisfies TemperWorldSkyshard

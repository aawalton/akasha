import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const bangkorai55716 = {
  id: "01a0d5db-49a3-73c4-b3ad-e939c9780d07",
  type: "page-type/temper-world-skyshard",
  slug: "bangkorai-557-16",
  title: "Bangkorai skyshard 16 of achievement 557",
  esoAchievementId: 557,
  shardNumber: 16,
  worldZone: "temper-world-zone/bangkorai",
  mapPositions: [
    {
      mapFolder: "bangkorai",
      mapTile: "bangkorai_base",
      mapX: 0.233,
      mapY: 0.899,
      placeKinds: [3],
    },
    { mapFolder: "bangkorai", mapTile: "razakswheel_base", mapX: 0.69, mapY: 0.45 },
  ],
} as const satisfies TemperWorldSkyshard

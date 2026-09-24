import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const bangkorai55714 = {
  id: "01a0d5db-49a3-7c2b-b16e-28cafaf918e1",
  type: "page-type/temper-world-skyshard",
  slug: "bangkorai-557-14",
  title: "Bangkorai skyshard 14 of achievement 557",
  esoAchievementId: 557,
  shardNumber: 14,
  worldZone: "temper-world-zone/bangkorai",
  mapPositions: [
    {
      mapFolder: "bangkorai",
      mapTile: "bangkorai_base",
      mapX: 0.712,
      mapY: 0.198,
      placeKinds: [2],
    },
    { mapFolder: "bangkorai", mapTile: "trollstoothpick_base", mapX: 0.656, mapY: 0.334 },
  ],
} as const satisfies TemperWorldSkyshard

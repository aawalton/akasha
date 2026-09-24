import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const bangkorai55713 = {
  id: "01a0d5db-49a3-7cf3-b098-1694f592f0ae",
  type: "page-type/temper-world-skyshard",
  slug: "bangkorai-557-13",
  title: "Bangkorai skyshard 13 of achievement 557",
  esoAchievementId: 557,
  shardNumber: 13,
  worldZone: "temper-world-zone/bangkorai",
  mapPositions: [
    { mapFolder: "bangkorai", mapTile: "bangkorai_base", mapX: 0.246, mapY: 0.66, placeKinds: [2] },
    { mapFolder: "bangkorai", mapTile: "rubblebutte_base", mapX: 0.656, mapY: 0.857 },
  ],
} as const satisfies TemperWorldSkyshard

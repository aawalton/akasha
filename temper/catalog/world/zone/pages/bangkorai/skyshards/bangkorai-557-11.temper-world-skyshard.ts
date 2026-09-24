import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const bangkorai55711 = {
  id: "01a0d5db-49a2-72f6-966c-c4b838429af6",
  type: "page-type/temper-world-skyshard",
  slug: "bangkorai-557-11",
  title: "Bangkorai skyshard 11 of achievement 557",
  esoAchievementId: 557,
  shardNumber: 11,
  worldZone: "temper-world-zone/bangkorai",
  mapPositions: [
    {
      mapFolder: "bangkorai",
      mapTile: "bangkorai_base",
      mapX: 0.557,
      mapY: 0.752,
      placeKinds: [2],
    },
    { mapFolder: "bangkorai", mapTile: "jaggerjaw_base", mapX: 0.532, mapY: 0.826 },
  ],
} as const satisfies TemperWorldSkyshard

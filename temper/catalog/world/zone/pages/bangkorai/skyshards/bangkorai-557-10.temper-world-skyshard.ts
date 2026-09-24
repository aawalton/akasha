import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const bangkorai55710 = {
  id: "01a0d5db-49a2-7dde-aa11-cca7c48b1e56",
  type: "page-type/temper-world-skyshard",
  slug: "bangkorai-557-10",
  title: "Bangkorai skyshard 10 of achievement 557",
  esoAchievementId: 557,
  shardNumber: 10,
  worldZone: "temper-world-zone/bangkorai",
  mapPositions: [
    {
      mapFolder: "bangkorai",
      mapTile: "bangkorai_base",
      mapX: 0.454,
      mapY: 0.504,
      placeKinds: [2],
    },
    { mapFolder: "bangkorai", mapTile: "cryptoftheexiles_base", mapX: 0.678, mapY: 0.342 },
  ],
} as const satisfies TemperWorldSkyshard

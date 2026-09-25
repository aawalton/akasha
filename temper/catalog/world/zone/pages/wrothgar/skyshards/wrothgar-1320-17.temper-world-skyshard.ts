import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const wrothgar132017 = {
  id: "01a0d5de-dadd-7590-80c4-3ca507246f96",
  type: "page-type/temper-world-skyshard",
  slug: "wrothgar-1320-17",
  title: "Wrothgar skyshard 17 of achievement 1320",
  esoAchievementId: 1320,
  shardNumber: 17,
  worldZone: "temper-world-zone/wrothgar",
  mapPositions: [
    {
      mapFolder: "wrothgar",
      mapTile: "watchershold_base",
      mapX: 0.7644,
      mapY: 0.6611,
      placeKinds: [2],
    },
    {
      mapFolder: "wrothgar",
      mapTile: "wrothgar_base",
      mapX: 0.1984,
      mapY: 0.8451,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

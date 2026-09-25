import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const wrothgar132010 = {
  id: "01a0d5de-dadd-764c-9b32-a9a0d0b65a3d",
  type: "page-type/temper-world-skyshard",
  slug: "wrothgar-1320-10",
  title: "Wrothgar skyshard 10 of achievement 1320",
  esoAchievementId: 1320,
  shardNumber: 10,
  worldZone: "temper-world-zone/wrothgar",
  mapPositions: [
    {
      mapFolder: "wrothgar",
      mapTile: "oldorsiniummap06_base",
      mapX: 0.6095,
      mapY: 0.7278,
      placeKinds: [3],
    },
    {
      mapFolder: "wrothgar",
      mapTile: "wrothgar_base",
      mapX: 0.1718,
      mapY: 0.6599,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard

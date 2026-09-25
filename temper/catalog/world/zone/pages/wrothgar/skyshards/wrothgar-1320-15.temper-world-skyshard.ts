import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const wrothgar132015 = {
  id: "01a0d5de-dadd-71be-bbe2-d0931b47f56a",
  type: "page-type/temper-world-skyshard",
  slug: "wrothgar-1320-15",
  title: "Wrothgar skyshard 15 of achievement 1320",
  esoAchievementId: 1320,
  shardNumber: 15,
  worldZone: "temper-world-zone/wrothgar",
  mapPositions: [
    {
      mapFolder: "wrothgar",
      mapTile: "wrothgar_base",
      mapX: 0.7107,
      mapY: 0.3779,
      placeKinds: [2],
    },
    {
      mapFolder: "wrothgar",
      mapTile: "zthenganaz_base",
      mapX: 0.1164,
      mapY: 0.1165,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

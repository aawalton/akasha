import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const wrothgar13205 = {
  id: "01a0d5de-dade-7a60-b348-935cdcc8d56d",
  type: "page-type/temper-world-skyshard",
  slug: "wrothgar-1320-5",
  title: "Wrothgar skyshard 5 of achievement 1320",
  esoAchievementId: 1320,
  shardNumber: 5,
  worldZone: "temper-world-zone/wrothgar",
  mapPositions: [
    { mapFolder: "wrothgar", mapTile: "morkul_base", mapX: 0.1247, mapY: 0.4609, placeKinds: [1] },
    {
      mapFolder: "wrothgar",
      mapTile: "wrothgar_base",
      mapX: 0.4653,
      mapY: 0.4621,
      placeKinds: [1],
    },
  ],
} as const satisfies TemperWorldSkyshard

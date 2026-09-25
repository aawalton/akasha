import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const wrothgar132016 = {
  id: "01a0d5de-dadd-7ba2-93a5-28c7256a05bb",
  type: "page-type/temper-world-skyshard",
  slug: "wrothgar-1320-16",
  title: "Wrothgar skyshard 16 of achievement 1320",
  esoAchievementId: 1320,
  shardNumber: 16,
  worldZone: "temper-world-zone/wrothgar",
  mapPositions: [
    {
      mapFolder: "wrothgar",
      mapTile: "kennelrun_base",
      mapX: 0.9001,
      mapY: 0.7077,
      placeKinds: [2],
    },
    {
      mapFolder: "wrothgar",
      mapTile: "wrothgar_base",
      mapX: 0.5689,
      mapY: 0.6969,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

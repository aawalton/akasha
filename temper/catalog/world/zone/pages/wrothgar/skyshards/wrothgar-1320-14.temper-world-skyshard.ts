import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const wrothgar132014 = {
  id: "01a0d5de-dadd-7ba9-9cf3-db3f352cb3c1",
  type: "page-type/temper-world-skyshard",
  slug: "wrothgar-1320-14",
  title: "Wrothgar skyshard 14 of achievement 1320",
  esoAchievementId: 1320,
  shardNumber: 14,
  worldZone: "temper-world-zone/wrothgar",
  mapPositions: [
    {
      mapFolder: "wrothgar",
      mapTile: "thukozods_base",
      mapX: 0.2869,
      mapY: 0.4652,
      placeKinds: [2],
    },
    {
      mapFolder: "wrothgar",
      mapTile: "wrothgar_base",
      mapX: 0.2957,
      mapY: 0.7386,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

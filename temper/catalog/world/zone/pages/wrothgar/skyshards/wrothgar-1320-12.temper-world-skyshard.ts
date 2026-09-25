import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const wrothgar132012 = {
  id: "01a0d5de-dadd-755b-9779-514efccaf656",
  type: "page-type/temper-world-skyshard",
  slug: "wrothgar-1320-12",
  title: "Wrothgar skyshard 12 of achievement 1320",
  esoAchievementId: 1320,
  shardNumber: 12,
  worldZone: "temper-world-zone/wrothgar",
  mapPositions: [
    {
      mapFolder: "wrothgar",
      mapTile: "argentmine2_base",
      mapX: 0.1854,
      mapY: 0.8436,
      placeKinds: [2],
    },
    {
      mapFolder: "wrothgar",
      mapTile: "wrothgar_base",
      mapX: 0.5405,
      mapY: 0.5826,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

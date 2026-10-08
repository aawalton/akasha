import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn7277 = {
  id: "01a0d5e2-03c0-75f5-be02-90313b674533",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-727-7",
  title: "Craglorn skyshard 7 of achievement 727",
  esoAchievementId: 727,
  shardNumber: 7,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    { mapFolder: "craglorn", mapTile: "burriedsands_base", mapX: 0.692, mapY: 0.151 },
    {
      mapFolder: "craglorn",
      mapTile: "craglorn_base",
      mapX: 0.1468,
      mapY: 0.4594,
      placeKinds: [2],
    },
  ],
  createdAt: "2026-09-25T00:05:54.240Z",
  updatedAt: "2026-09-25T00:05:57.000Z",
} as const satisfies TemperWorldSkyshard

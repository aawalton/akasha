import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn7279 = {
  id: "01a0d5e2-03c0-7f93-9063-58564a991317",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-727-9",
  title: "Craglorn skyshard 9 of achievement 727",
  esoAchievementId: 727,
  shardNumber: 9,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    { mapFolder: "craglorn", mapTile: "balamath_base", mapX: 0.643, mapY: 0.575 },
    {
      mapFolder: "craglorn",
      mapTile: "craglorn_base",
      mapX: 0.8132,
      mapY: 0.5757,
      placeKinds: [2],
    },
  ],
  createdAt: "2026-09-25T00:05:54.240Z",
  updatedAt: "2026-09-25T00:05:57.000Z",
} as const satisfies TemperWorldSkyshard

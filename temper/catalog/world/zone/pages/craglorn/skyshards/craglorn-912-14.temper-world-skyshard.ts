import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn91214 = {
  id: "01a0d5e2-03c0-7ad7-aaef-1ddf94a5c370",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-912-14",
  title: "Craglorn skyshard 14 of achievement 912",
  esoAchievementId: 912,
  shardNumber: 14,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    {
      mapFolder: "craglorn",
      mapTile: "craglorn_base",
      mapX: 0.5827,
      mapY: 0.4257,
      placeKinds: [2],
    },
    { mapFolder: "craglorn", mapTile: "ilthagsundertower_base", mapX: 0.379, mapY: 0.163 },
  ],
} as const satisfies TemperWorldSkyshard

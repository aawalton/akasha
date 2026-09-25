import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn91217 = {
  id: "01a0d5e2-03c1-7d89-aa45-9ff975e95f40",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-912-17",
  title: "Craglorn skyshard 17 of achievement 912",
  esoAchievementId: 912,
  shardNumber: 17,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    {
      mapFolder: "craglorn",
      mapTile: "craglorn_base",
      mapX: 0.0868,
      mapY: 0.3064,
      placeKinds: [2],
    },
    { mapFolder: "craglorn", mapTile: "fearfang_base", mapX: 0.572, mapY: 0.51 },
  ],
} as const satisfies TemperWorldSkyshard

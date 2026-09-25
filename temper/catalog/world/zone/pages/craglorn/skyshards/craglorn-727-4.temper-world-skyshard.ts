import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn7274 = {
  id: "01a0d5e2-03c0-77fa-8e77-4c3b0678ef3b",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-727-4",
  title: "Craglorn skyshard 4 of achievement 727",
  esoAchievementId: 727,
  shardNumber: 4,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    {
      mapFolder: "craglorn",
      mapTile: "craglorn_base",
      mapX: 0.4415,
      mapY: 0.4684,
      placeKinds: [5],
    },
    { mapFolder: "craglorn", mapTile: "rkhardahrk", mapX: 0.463, mapY: 0.381 },
  ],
} as const satisfies TemperWorldSkyshard

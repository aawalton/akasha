import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn7276 = {
  id: "01a0d5e2-03c0-7da1-a2ee-2c90201953bc",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-727-6",
  title: "Craglorn skyshard 6 of achievement 727",
  esoAchievementId: 727,
  shardNumber: 6,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    { mapFolder: "craglorn", mapTile: "chiselshriek_base", mapX: 0.863, mapY: 0.224 },
    {
      mapFolder: "craglorn",
      mapTile: "craglorn_base",
      mapX: 0.7198,
      mapY: 0.4387,
      placeKinds: [5],
    },
  ],
} as const satisfies TemperWorldSkyshard

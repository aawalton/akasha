import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn72712 = {
  id: "01a0d5e2-03c0-7280-9214-29e70491eb6b",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-727-12",
  title: "Craglorn skyshard 12 of achievement 727",
  esoAchievementId: 727,
  shardNumber: 12,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    {
      mapFolder: "craglorn",
      mapTile: "craglorn_base",
      mapX: 0.5375,
      mapY: 0.5407,
      placeKinds: [5],
    },
    { mapFolder: "craglorn", mapTile: "hircineshaunt_base", mapX: 0.329, mapY: 0.661 },
  ],
} as const satisfies TemperWorldSkyshard

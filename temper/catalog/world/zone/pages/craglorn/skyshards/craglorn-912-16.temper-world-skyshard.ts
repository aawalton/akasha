import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn91216 = {
  id: "01a0d5e2-03c1-7277-be07-d26325ffcd2b",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-912-16",
  title: "Craglorn skyshard 16 of achievement 912",
  esoAchievementId: 912,
  shardNumber: 16,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    {
      mapFolder: "craglorn",
      mapTile: "craglorn_base",
      mapX: 0.6622,
      mapY: 0.3317,
      placeKinds: [2],
    },
    { mapFolder: "craglorn", mapTile: "howlingsepulchersoverland_base", mapX: 0.528, mapY: 0.534 },
  ],
} as const satisfies TemperWorldSkyshard

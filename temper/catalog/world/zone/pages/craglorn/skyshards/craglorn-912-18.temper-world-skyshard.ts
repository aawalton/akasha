import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn91218 = {
  id: "01a0d5e2-03c1-7383-a4ad-cfb77c7d88cb",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-912-18",
  title: "Craglorn skyshard 18 of achievement 912",
  esoAchievementId: 912,
  shardNumber: 18,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    {
      mapFolder: "craglorn",
      mapTile: "craglorn_base",
      mapX: 0.5478,
      mapY: 0.2512,
      placeKinds: [2],
    },
    { mapFolder: "craglorn", mapTile: "exarchsstronghold_base", mapX: 0.626, mapY: 0.558 },
  ],
} as const satisfies TemperWorldSkyshard

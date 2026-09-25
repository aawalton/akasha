import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn72710 = {
  id: "01a0d5e2-03c0-7f76-af3b-d19f46e4b31c",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-727-10",
  title: "Craglorn skyshard 10 of achievement 727",
  esoAchievementId: 727,
  shardNumber: 10,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    {
      mapFolder: "craglorn",
      mapTile: "craglorn_base",
      mapX: 0.4686,
      mapY: 0.6635,
      placeKinds: [5],
    },
    { mapFolder: "craglorn", mapTile: "thaliasretreat_base", mapX: 0.463, mapY: 0.292 },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const eastmarch6885 = {
  id: "01a0d5dd-a09d-74a8-89e5-ed96e7204077",
  type: "page-type/temper-world-skyshard",
  slug: "eastmarch-688-5",
  title: "Eastmarch skyshard 5 of achievement 688",
  esoAchievementId: 688,
  shardNumber: 5,
  worldZone: "temper-world-zone/eastmarch",
  mapPositions: [
    {
      mapFolder: "eastmarch",
      mapTile: "eastmarch_base",
      mapX: 0.308,
      mapY: 0.582,
      placeKinds: [1],
    },
    { mapFolder: "eastmarch", mapTile: "fortamol_base", mapX: 0.733, mapY: 0.109 },
  ],
} as const satisfies TemperWorldSkyshard

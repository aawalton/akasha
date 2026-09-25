import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const eastmarch68815 = {
  id: "01a0d5dd-a09d-7d26-a4e6-7c1172432b60",
  type: "page-type/temper-world-skyshard",
  slug: "eastmarch-688-15",
  title: "Eastmarch skyshard 15 of achievement 688",
  esoAchievementId: 688,
  shardNumber: 15,
  worldZone: "temper-world-zone/eastmarch",
  mapPositions: [
    {
      mapFolder: "eastmarch",
      mapTile: "eastmarch_base",
      mapX: 0.637,
      mapY: 0.653,
      placeKinds: [2],
    },
    { mapFolder: "eastmarch", mapTile: "stormcragcrypt_base", mapX: 0.322, mapY: 0.317 },
  ],
} as const satisfies TemperWorldSkyshard

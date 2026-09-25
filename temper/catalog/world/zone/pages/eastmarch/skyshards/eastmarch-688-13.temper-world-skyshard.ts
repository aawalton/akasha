import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const eastmarch68813 = {
  id: "01a0d5dd-a09c-7150-9a11-5b2696c99ff5",
  type: "page-type/temper-world-skyshard",
  slug: "eastmarch-688-13",
  title: "Eastmarch skyshard 13 of achievement 688",
  esoAchievementId: 688,
  shardNumber: 13,
  worldZone: "temper-world-zone/eastmarch",
  mapPositions: [
    {
      mapFolder: "eastmarch",
      mapTile: "eastmarch_base",
      mapX: 0.564,
      mapY: 0.432,
      placeKinds: [2],
    },
    { mapFolder: "eastmarch", mapTile: "icehammersvault_base", mapX: 0.13, mapY: 0.376 },
  ],
} as const satisfies TemperWorldSkyshard

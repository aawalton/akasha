import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const eastmarch68814 = {
  id: "01a0d5dd-a09d-7ba3-9221-4c437f1a1933",
  type: "page-type/temper-world-skyshard",
  slug: "eastmarch-688-14",
  title: "Eastmarch skyshard 14 of achievement 688",
  esoAchievementId: 688,
  shardNumber: 14,
  worldZone: "temper-world-zone/eastmarch",
  mapPositions: [
    {
      mapFolder: "eastmarch",
      mapTile: "eastmarch_base",
      mapX: 0.511,
      mapY: 0.618,
      placeKinds: [2],
    },
    { mapFolder: "eastmarch", mapTile: "oldsordscave_base", mapX: 0.314, mapY: 0.731 },
  ],
  createdAt: "2026-09-25T00:01:06.717Z",
  updatedAt: "2026-09-25T00:01:10.000Z",
} as const satisfies TemperWorldSkyshard

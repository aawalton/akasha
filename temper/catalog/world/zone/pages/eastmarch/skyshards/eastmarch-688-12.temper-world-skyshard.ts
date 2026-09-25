import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const eastmarch68812 = {
  id: "01a0d5dd-a09c-7e69-a7fd-1911ed0e9580",
  type: "page-type/temper-world-skyshard",
  slug: "eastmarch-688-12",
  title: "Eastmarch skyshard 12 of achievement 688",
  esoAchievementId: 688,
  shardNumber: 12,
  worldZone: "temper-world-zone/eastmarch",
  mapPositions: [
    {
      mapFolder: "eastmarch",
      mapTile: "eastmarch_base",
      mapX: 0.176,
      mapY: 0.558,
      placeKinds: [2],
    },
    { mapFolder: "eastmarch", mapTile: "thefrigidgrotto_base", mapX: 0.541, mapY: 0.719 },
  ],
} as const satisfies TemperWorldSkyshard

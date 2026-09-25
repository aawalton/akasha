import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const eastmarch68816 = {
  id: "01a0d5dd-a09d-7c90-92af-e71dac1c5176",
  type: "page-type/temper-world-skyshard",
  slug: "eastmarch-688-16",
  title: "Eastmarch skyshard 16 of achievement 688",
  esoAchievementId: 688,
  shardNumber: 16,
  worldZone: "temper-world-zone/eastmarch",
  mapPositions: [
    {
      mapFolder: "eastmarch",
      mapTile: "eastmarch_base",
      mapX: 0.474,
      mapY: 0.283,
      placeKinds: [3],
    },
    { mapFolder: "eastmarch", mapTile: "hallofthedead_base", mapX: 0.505, mapY: 0.525 },
    {
      mapFolder: "eastmarch",
      mapTile: "windhelm_base",
      mapX: 0.3344,
      mapY: 0.4542,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard

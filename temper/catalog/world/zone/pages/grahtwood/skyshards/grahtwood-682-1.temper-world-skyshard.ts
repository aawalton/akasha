import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const grahtwood6821 = {
  id: "01a0d5dc-7dd2-7c72-837e-47ec3d205e5a",
  type: "page-type/temper-world-skyshard",
  slug: "grahtwood-682-1",
  title: "Grahtwood skyshard 1 of achievement 682",
  esoAchievementId: 682,
  shardNumber: 1,
  worldZone: "temper-world-zone/grahtwood",
  mapPositions: [
    {
      mapFolder: "grahtwood",
      mapTile: "grahtwood_base",
      mapX: 0.739,
      mapY: 0.678,
      placeKinds: [1],
    },
    { mapFolder: "grahtwood", mapTile: "haven_base", mapX: 0.384, mapY: 0.249 },
  ],
} as const satisfies TemperWorldSkyshard

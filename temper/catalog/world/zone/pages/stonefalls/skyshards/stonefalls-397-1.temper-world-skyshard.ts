import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stonefalls3971 = {
  id: "01a0d5d6-c613-7c76-933e-795b1967ff3e",
  type: "page-type/temper-world-skyshard",
  slug: "stonefalls-397-1",
  title: "Stonefalls skyshard 1 of achievement 397",
  esoAchievementId: 397,
  shardNumber: 1,
  worldZone: "temper-world-zone/stonefalls",
  mapPositions: [
    { mapFolder: "stonefalls", mapTile: "davonswatch_base", mapX: 0.0953, mapY: 0.5117 },
    {
      mapFolder: "stonefalls",
      mapTile: "stonefalls_base",
      mapX: 0.777,
      mapY: 0.346,
      placeKinds: [1],
    },
  ],
} as const satisfies TemperWorldSkyshard

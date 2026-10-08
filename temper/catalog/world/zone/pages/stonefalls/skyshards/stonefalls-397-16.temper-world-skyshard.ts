import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stonefalls39716 = {
  id: "01a0d5d9-b16f-719f-9109-f462a8ad9eff",
  type: "page-type/temper-world-skyshard",
  slug: "stonefalls-397-16",
  title: "Stonefalls skyshard 16 of achievement 397",
  esoAchievementId: 397,
  shardNumber: 16,
  worldZone: "temper-world-zone/stonefalls",
  mapPositions: [
    { mapFolder: "stonefalls", mapTile: "crowswood_base", mapX: 0.2447, mapY: 0.9636 },
    {
      mapFolder: "stonefalls",
      mapTile: "davonswatch_base",
      mapX: 0.8752,
      mapY: 0.5854,
      placeKinds: [3],
    },
    {
      mapFolder: "stonefalls",
      mapTile: "stonefalls_base",
      mapX: 0.9334,
      mapY: 0.3608,
      placeKinds: [3],
    },
  ],
  createdAt: "2026-09-24T23:56:48.879Z",
  updatedAt: "2026-09-24T23:56:51.000Z",
} as const satisfies TemperWorldSkyshard

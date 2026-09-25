import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const summerset184515 = {
  id: "01a0d5e5-0fff-7a6e-b9e8-8e8dd3dcb8d5",
  type: "page-type/temper-world-skyshard",
  slug: "summerset-1845-15",
  title: "Summerset skyshard 15 of achievement 1845",
  esoAchievementId: 1845,
  shardNumber: 15,
  worldZone: "temper-world-zone/summerset",
  mapPositions: [
    {
      mapFolder: "summerset",
      mapTile: "archonsgrove_base",
      mapX: 0.5428,
      mapY: 0.705,
      placeKinds: [2],
    },
    {
      mapFolder: "summerset",
      mapTile: "summerset_base",
      mapX: 0.5786,
      mapY: 0.5836,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const summerset184512 = {
  id: "01a0d5e5-0fff-7b22-b4f8-10579042e89b",
  type: "page-type/temper-world-skyshard",
  slug: "summerset-1845-12",
  title: "Summerset skyshard 12 of achievement 1845",
  esoAchievementId: 1845,
  shardNumber: 12,
  worldZone: "temper-world-zone/summerset",
  mapPositions: [
    {
      mapFolder: "summerset",
      mapTile: "summerset_base",
      mapX: 0.4521,
      mapY: 0.7077,
      placeKinds: [3],
    },
    {
      mapFolder: "summerset",
      mapTile: "sunhold_base",
      mapX: 0.3738,
      mapY: 0.3466,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard

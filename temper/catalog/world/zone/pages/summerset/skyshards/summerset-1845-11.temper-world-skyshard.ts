import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const summerset184511 = {
  id: "01a0d5e5-0fff-7d45-8c0c-f0a7ad301154",
  type: "page-type/temper-world-skyshard",
  slug: "summerset-1845-11",
  title: "Summerset skyshard 11 of achievement 1845",
  esoAchievementId: 1845,
  shardNumber: 11,
  worldZone: "temper-world-zone/summerset",
  mapPositions: [
    {
      mapFolder: "summerset",
      mapTile: "sum_karnwasten_base",
      mapX: 0.5995,
      mapY: 0.5956,
      placeKinds: [3],
    },
    {
      mapFolder: "summerset",
      mapTile: "summerset_base",
      mapX: 0.3013,
      mapY: 0.2087,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard

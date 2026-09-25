import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const summerset184513 = {
  id: "01a0d5e5-0fff-7ca0-a202-0f4e7e7c739d",
  type: "page-type/temper-world-skyshard",
  slug: "summerset-1845-13",
  title: "Summerset skyshard 13 of achievement 1845",
  esoAchievementId: 1845,
  shardNumber: 13,
  worldZone: "temper-world-zone/summerset",
  mapPositions: [
    {
      mapFolder: "summerset",
      mapTile: "kingshavenint1_base",
      mapX: 0.1975,
      mapY: 0.3843,
      placeKinds: [2],
    },
    {
      mapFolder: "summerset",
      mapTile: "summerset_base",
      mapX: 0.4892,
      mapY: 0.2751,
      placeKinds: [2],
    },
    {
      mapFolder: "summerset",
      mapTile: "summerset_base",
      mapX: 0.3581,
      mapY: 0.3249,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

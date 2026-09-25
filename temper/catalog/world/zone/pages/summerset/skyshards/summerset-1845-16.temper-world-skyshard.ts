import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const summerset184516 = {
  id: "01a0d5e5-0fff-7fc1-8fb8-ee6a8a65828a",
  type: "page-type/temper-world-skyshard",
  slug: "summerset-1845-16",
  title: "Summerset skyshard 16 of achievement 1845",
  esoAchievementId: 1845,
  shardNumber: 16,
  worldZone: "temper-world-zone/summerset",
  mapPositions: [
    {
      mapFolder: "summerset",
      mapTile: "summerset_base",
      mapX: 0.4963,
      mapY: 0.5445,
      placeKinds: [2, 4],
    },
    {
      mapFolder: "summerset",
      mapTile: "torhamekhard_01_base",
      mapX: 0.4683,
      mapY: 0.712,
      placeKinds: [2, 4],
    },
    {
      mapFolder: "summerset",
      mapTile: "torhamekhard_02_base",
      mapX: 0.4683,
      mapY: 0.712,
      placeKinds: [2, 4],
    },
  ],
} as const satisfies TemperWorldSkyshard

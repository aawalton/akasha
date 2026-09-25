import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const summerset184514 = {
  id: "01a0d5e5-0fff-77b5-9ae0-35af8c0643df",
  type: "page-type/temper-world-skyshard",
  slug: "summerset-1845-14",
  title: "Summerset skyshard 14 of achievement 1845",
  esoAchievementId: 1845,
  shardNumber: 14,
  worldZone: "temper-world-zone/summerset",
  mapPositions: [
    {
      mapFolder: "summerset",
      mapTile: "etonnir_01_base",
      mapX: 0.1481,
      mapY: 0.5968,
      placeKinds: [2, 4],
    },
    {
      mapFolder: "summerset",
      mapTile: "summerset_base",
      mapX: 0.5096,
      mapY: 0.3272,
      placeKinds: [2, 4],
    },
  ],
} as const satisfies TemperWorldSkyshard

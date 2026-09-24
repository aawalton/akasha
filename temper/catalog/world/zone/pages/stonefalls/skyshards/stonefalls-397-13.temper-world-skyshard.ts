import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stonefalls39713 = {
  id: "01a0d5d9-b16f-76ce-b805-401f1d9c3188",
  type: "page-type/temper-world-skyshard",
  slug: "stonefalls-397-13",
  title: "Stonefalls skyshard 13 of achievement 397",
  esoAchievementId: 397,
  shardNumber: 13,
  worldZone: "temper-world-zone/stonefalls",
  mapPositions: [
    { mapFolder: "stonefalls", mapTile: "hightidehollow_base", mapX: 0.6713, mapY: 0.666 },
    {
      mapFolder: "stonefalls",
      mapTile: "stonefalls_base",
      mapX: 0.3575,
      mapY: 0.4488,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

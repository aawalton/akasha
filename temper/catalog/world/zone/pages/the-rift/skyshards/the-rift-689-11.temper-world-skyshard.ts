import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theRift68911 = {
  id: "01a0d5e0-2f71-774e-a6c0-f6c0c149ab4b",
  type: "page-type/temper-world-skyshard",
  slug: "the-rift-689-11",
  title: "The Rift skyshard 11 of achievement 689",
  esoAchievementId: 689,
  shardNumber: 11,
  worldZone: "temper-world-zone/the-rift",
  mapPositions: [
    { mapFolder: "therift", mapTile: "brokenhelm_base", mapX: 0.872, mapY: 0.645 },
    { mapFolder: "therift", mapTile: "therift_base", mapX: 0.828, mapY: 0.588, placeKinds: [2] },
  ],
} as const satisfies TemperWorldSkyshard

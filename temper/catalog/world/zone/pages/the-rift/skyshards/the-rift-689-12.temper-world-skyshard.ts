import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theRift68912 = {
  id: "01a0d5e0-2f71-73c1-8ba3-6ac12636d3d9",
  type: "page-type/temper-world-skyshard",
  slug: "the-rift-689-12",
  title: "The Rift skyshard 12 of achievement 689",
  esoAchievementId: 689,
  shardNumber: 12,
  worldZone: "temper-world-zone/the-rift",
  mapPositions: [
    { mapFolder: "therift", mapTile: "ebonmeretower_base", mapX: 0.398, mapY: 0.419 },
    { mapFolder: "therift", mapTile: "therift_base", mapX: 0.498, mapY: 0.472, placeKinds: [2] },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theRift68913 = {
  id: "01a0d5e0-2f71-7cae-a158-7a0bcbe2dd33",
  type: "page-type/temper-world-skyshard",
  slug: "the-rift-689-13",
  title: "The Rift skyshard 13 of achievement 689",
  esoAchievementId: 689,
  shardNumber: 13,
  worldZone: "temper-world-zone/the-rift",
  mapPositions: [
    { mapFolder: "therift", mapTile: "fortgreenwall_base", mapX: 0.525, mapY: 0.447 },
    { mapFolder: "therift", mapTile: "therift_base", mapX: 0.718, mapY: 0.404, placeKinds: [2] },
  ],
} as const satisfies TemperWorldSkyshard

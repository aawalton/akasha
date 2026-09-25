import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const auridon69513 = {
  id: "01a0d5df-3d92-7bf3-91bc-25b73e543d18",
  type: "page-type/temper-world-skyshard",
  slug: "auridon-695-13",
  title: "Auridon skyshard 13 of achievement 695",
  esoAchievementId: 695,
  shardNumber: 13,
  worldZone: "temper-world-zone/auridon",
  mapPositions: [
    { mapFolder: "auridon", mapTile: "auridon_base", mapX: 0.1957, mapY: 0.2111, placeKinds: [2] },
    { mapFolder: "auridon", mapTile: "mehrunesspite_base", mapX: 0.694, mapY: 0.256 },
  ],
} as const satisfies TemperWorldSkyshard

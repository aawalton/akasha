import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const auridon69511 = {
  id: "01a0d5df-3d92-78b4-9bb9-7a0c9d5462cf",
  type: "page-type/temper-world-skyshard",
  slug: "auridon-695-11",
  title: "Auridon skyshard 11 of achievement 695",
  esoAchievementId: 695,
  shardNumber: 11,
  worldZone: "temper-world-zone/auridon",
  mapPositions: [
    { mapFolder: "auridon", mapTile: "auridon_base", mapX: 0.5811, mapY: 0.8546, placeKinds: [2] },
    { mapFolder: "auridon", mapTile: "delsclaim_base", mapX: 0.316, mapY: 0.219 },
  ],
} as const satisfies TemperWorldSkyshard

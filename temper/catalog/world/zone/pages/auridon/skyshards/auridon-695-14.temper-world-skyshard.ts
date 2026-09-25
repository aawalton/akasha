import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const auridon69514 = {
  id: "01a0d5df-3d92-714c-9439-08b41f20b485",
  type: "page-type/temper-world-skyshard",
  slug: "auridon-695-14",
  title: "Auridon skyshard 14 of achievement 695",
  esoAchievementId: 695,
  shardNumber: 14,
  worldZone: "temper-world-zone/auridon",
  mapPositions: [
    { mapFolder: "auridon", mapTile: "auridon_base", mapX: 0.5434, mapY: 0.6983, placeKinds: [2] },
    { mapFolder: "auridon", mapTile: "ondil_base", mapX: 0.835, mapY: 0.624 },
  ],
} as const satisfies TemperWorldSkyshard

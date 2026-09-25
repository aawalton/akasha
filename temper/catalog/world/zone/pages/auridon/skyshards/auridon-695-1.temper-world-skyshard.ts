import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const auridon6951 = {
  id: "01a0d5df-3d91-7b0c-9202-1edc91fd5180",
  type: "page-type/temper-world-skyshard",
  slug: "auridon-695-1",
  title: "Auridon skyshard 1 of achievement 695",
  esoAchievementId: 695,
  shardNumber: 1,
  worldZone: "temper-world-zone/auridon",
  mapPositions: [
    { mapFolder: "auridon", mapTile: "auridon_base", mapX: 0.6005, mapY: 0.898, placeKinds: [1] },
    { mapFolder: "auridon", mapTile: "vulkhelguard_base", mapX: 0.3965, mapY: 0.405 },
  ],
} as const satisfies TemperWorldSkyshard

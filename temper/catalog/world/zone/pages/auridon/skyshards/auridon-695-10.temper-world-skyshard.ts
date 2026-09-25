import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const auridon69510 = {
  id: "01a0d5df-3d92-70c2-abc2-2c80b3f5e932",
  type: "page-type/temper-world-skyshard",
  slug: "auridon-695-10",
  title: "Auridon skyshard 10 of achievement 695",
  esoAchievementId: 695,
  shardNumber: 10,
  worldZone: "temper-world-zone/auridon",
  mapPositions: [
    { mapFolder: "auridon", mapTile: "auridon_base", mapX: 0.4348, mapY: 0.402, placeKinds: [2] },
    { mapFolder: "auridon", mapTile: "bewan_base", mapX: 0.8706, mapY: 0.6995 },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const auridon69515 = {
  id: "01a0d5df-3d92-7506-843e-5dbca5d3557e",
  type: "page-type/temper-world-skyshard",
  slug: "auridon-695-15",
  title: "Auridon skyshard 15 of achievement 695",
  esoAchievementId: 695,
  shardNumber: 15,
  worldZone: "temper-world-zone/auridon",
  mapPositions: [
    { mapFolder: "auridon", mapTile: "auridon_base", mapX: 0.5773, mapY: 0.3214, placeKinds: [2] },
    { mapFolder: "auridon", mapTile: "wansalen_base", mapX: 0.2766, mapY: 0.5446 },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const auridon69512 = {
  id: "01a0d5df-3d92-7889-a550-c7e674edb0be",
  type: "page-type/temper-world-skyshard",
  slug: "auridon-695-12",
  title: "Auridon skyshard 12 of achievement 695",
  esoAchievementId: 695,
  shardNumber: 12,
  worldZone: "temper-world-zone/auridon",
  mapPositions: [
    { mapFolder: "auridon", mapTile: "auridon_base", mapX: 0.5607, mapY: 0.558, placeKinds: [2] },
    { mapFolder: "auridon", mapTile: "entilasfolly_base", mapX: 0.8189, mapY: 0.7917 },
  ],
} as const satisfies TemperWorldSkyshard

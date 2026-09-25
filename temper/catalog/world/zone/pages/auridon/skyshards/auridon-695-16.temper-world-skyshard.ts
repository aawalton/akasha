import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const auridon69516 = {
  id: "01a0d5df-3d92-722c-9de1-1847b7f41889",
  type: "page-type/temper-world-skyshard",
  slug: "auridon-695-16",
  title: "Auridon skyshard 16 of achievement 695",
  esoAchievementId: 695,
  shardNumber: 16,
  worldZone: "temper-world-zone/auridon",
  mapPositions: [
    { mapFolder: "auridon", mapTile: "auridon_base", mapX: 0.4195, mapY: 0.6759, placeKinds: [3] },
    { mapFolder: "auridon", mapTile: "toothmaulgully_base", mapX: 0.635, mapY: 0.669 },
  ],
} as const satisfies TemperWorldSkyshard

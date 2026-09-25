import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theRift68910 = {
  id: "01a0d5e0-2f71-79a5-9379-3449ae582eff",
  type: "page-type/temper-world-skyshard",
  slug: "the-rift-689-10",
  title: "The Rift skyshard 10 of achievement 689",
  esoAchievementId: 689,
  shardNumber: 10,
  worldZone: "temper-world-zone/the-rift",
  mapPositions: [
    { mapFolder: "therift", mapTile: "avancheznel_base", mapX: 0.11, mapY: 0.64 },
    { mapFolder: "therift", mapTile: "therift_base", mapX: 0.385, mapY: 0.574, placeKinds: [2] },
  ],
} as const satisfies TemperWorldSkyshard

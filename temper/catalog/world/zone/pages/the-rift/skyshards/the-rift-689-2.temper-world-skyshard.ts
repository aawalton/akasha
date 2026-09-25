import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theRift6892 = {
  id: "01a0d5e0-2f72-7448-a050-e7ca3b802aef",
  type: "page-type/temper-world-skyshard",
  slug: "the-rift-689-2",
  title: "The Rift skyshard 2 of achievement 689",
  esoAchievementId: 689,
  shardNumber: 2,
  worldZone: "temper-world-zone/the-rift",
  mapPositions: [
    { mapFolder: "therift", mapTile: "shorsstone_base", mapX: 0.292, mapY: 0.446 },
    { mapFolder: "therift", mapTile: "therift_base", mapX: 0.647, mapY: 0.291 },
  ],
} as const satisfies TemperWorldSkyshard

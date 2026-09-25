import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theRift6899 = {
  id: "01a0d5e0-2f72-7f85-90e9-12a73db69a6d",
  type: "page-type/temper-world-skyshard",
  slug: "the-rift-689-9",
  title: "The Rift skyshard 9 of achievement 689",
  esoAchievementId: 689,
  shardNumber: 9,
  worldZone: "temper-world-zone/the-rift",
  mapPositions: [
    { mapFolder: "therift", mapTile: "riften_base", mapX: 0.798, mapY: 0.185 },
    { mapFolder: "therift", mapTile: "therift_base", mapX: 0.719, mapY: 0.445 },
  ],
} as const satisfies TemperWorldSkyshard

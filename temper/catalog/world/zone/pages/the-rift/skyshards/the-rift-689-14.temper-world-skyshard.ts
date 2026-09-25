import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theRift68914 = {
  id: "01a0d5e0-2f72-7de2-a3d9-0f216834acf4",
  type: "page-type/temper-world-skyshard",
  slug: "the-rift-689-14",
  title: "The Rift skyshard 14 of achievement 689",
  esoAchievementId: 689,
  shardNumber: 14,
  worldZone: "temper-world-zone/the-rift",
  mapPositions: [
    { mapFolder: "therift", mapTile: "shroudhearth_base", mapX: 0.779, mapY: 0.612 },
    { mapFolder: "therift", mapTile: "therift_base", mapX: 0.134, mapY: 0.294, placeKinds: [2] },
  ],
} as const satisfies TemperWorldSkyshard

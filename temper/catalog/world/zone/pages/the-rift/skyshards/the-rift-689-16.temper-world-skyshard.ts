import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theRift68916 = {
  id: "01a0d5e0-2f72-7471-b98d-bc0649826019",
  type: "page-type/temper-world-skyshard",
  slug: "the-rift-689-16",
  title: "The Rift skyshard 16 of achievement 689",
  esoAchievementId: 689,
  shardNumber: 16,
  worldZone: "temper-world-zone/the-rift",
  mapPositions: [
    { mapFolder: "therift", mapTile: "thelionsden_base", mapX: 0.63, mapY: 0.399 },
    { mapFolder: "therift", mapTile: "therift_base", mapX: 0.059, mapY: 0.427, placeKinds: [3] },
  ],
} as const satisfies TemperWorldSkyshard

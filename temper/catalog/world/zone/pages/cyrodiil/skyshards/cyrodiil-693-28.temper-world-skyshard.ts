import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69328 = {
  id: "01a0d5dd-bdb4-773a-8fa9-aa4849210284",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-693-28",
  title: "Cyrodiil skyshard 28 of achievement 693",
  esoAchievementId: 693,
  shardNumber: 28,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.5831, mapY: 0.1949, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "redrubycave_base", mapX: 0.76, mapY: 0.291 },
  ],
} as const satisfies TemperWorldSkyshard

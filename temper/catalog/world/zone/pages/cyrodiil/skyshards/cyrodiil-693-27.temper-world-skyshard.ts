import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69327 = {
  id: "01a0d5dd-bdb4-7fd1-908c-90a8d39adbf6",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-693-27",
  title: "Cyrodiil skyshard 27 of achievement 693",
  esoAchievementId: 693,
  shardNumber: 27,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.1544, mapY: 0.2411, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "lipsandtarn_base", mapX: 0.733, mapY: 0.196 },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69442 = {
  id: "01a0d5dd-bdb4-74bd-8bc7-09a4da6c0104",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-694-42",
  title: "Cyrodiil skyshard 42 of achievement 694",
  esoAchievementId: 694,
  shardNumber: 42,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.3165, mapY: 0.5627, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "haynotecave_base", mapX: 0.539, mapY: 0.186 },
  ],
} as const satisfies TemperWorldSkyshard

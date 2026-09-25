import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69325 = {
  id: "01a0d5dd-bdb4-7fb4-bbf1-ca939ec36316",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-693-25",
  title: "Cyrodiil skyshard 25 of achievement 693",
  esoAchievementId: 693,
  shardNumber: 25,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.4217, mapY: 0.1465, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "capstonecave_base", mapX: 0.694, mapY: 0.134 },
  ],
} as const satisfies TemperWorldSkyshard

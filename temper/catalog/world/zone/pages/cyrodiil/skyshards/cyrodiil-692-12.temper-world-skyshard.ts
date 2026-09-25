import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69212 = {
  id: "01a0d5dd-bdb3-7495-8a95-ffc7a2d55011",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-692-12",
  title: "Cyrodiil skyshard 12 of achievement 692",
  esoAchievementId: 692,
  shardNumber: 12,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.7103, mapY: 0.4903, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "muckvalleycavern_base", mapX: 0.1752, mapY: 0.6967 },
  ],
} as const satisfies TemperWorldSkyshard

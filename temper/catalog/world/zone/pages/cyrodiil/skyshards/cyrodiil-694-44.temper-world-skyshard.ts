import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69444 = {
  id: "01a0d5dd-bdb4-74f5-a4aa-24fbc29c8e3e",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-694-44",
  title: "Cyrodiil skyshard 44 of achievement 694",
  esoAchievementId: 694,
  shardNumber: 44,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.4548, mapY: 0.7252, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "potholecavern_base", mapX: 0.6, mapY: 0.45 },
  ],
} as const satisfies TemperWorldSkyshard

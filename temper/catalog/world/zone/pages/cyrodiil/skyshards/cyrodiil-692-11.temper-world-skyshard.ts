import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69211 = {
  id: "01a0d5dd-bdb3-7da2-b5f5-cfe194fc6caf",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-692-11",
  title: "Cyrodiil skyshard 11 of achievement 692",
  esoAchievementId: 692,
  shardNumber: 11,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.8074, mapY: 0.2506, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "kingscrest_base", mapX: 0.725, mapY: 0.453 },
  ],
} as const satisfies TemperWorldSkyshard

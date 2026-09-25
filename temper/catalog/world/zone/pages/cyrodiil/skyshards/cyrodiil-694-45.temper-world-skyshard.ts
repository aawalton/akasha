import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69445 = {
  id: "01a0d5dd-bdb4-7403-b038-7f1f6a65fd8c",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-694-45",
  title: "Cyrodiil skyshard 45 of achievement 694",
  esoAchievementId: 694,
  shardNumber: 45,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.2056, mapY: 0.5074, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "serpenthollowcave_base", mapX: 0.257, mapY: 0.637 },
  ],
} as const satisfies TemperWorldSkyshard

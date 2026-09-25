import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69210 = {
  id: "01a0d5dd-bdb3-7dac-a8ee-eed0f34bf1e3",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-692-10",
  title: "Cyrodiil skyshard 10 of achievement 692",
  esoAchievementId: 692,
  shardNumber: 10,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.6726, mapY: 0.5961, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "crackedwoodcave_base", mapX: 0.3558, mapY: 0.3702 },
  ],
} as const satisfies TemperWorldSkyshard

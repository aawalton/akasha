import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69443 = {
  id: "01a0d5dd-bdb4-7bdd-97c9-c656c7e2f4fb",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-694-43",
  title: "Cyrodiil skyshard 43 of achievement 694",
  esoAchievementId: 694,
  shardNumber: 43,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.3628, mapY: 0.6982, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "nisincave_base", mapX: 0.194, mapY: 0.723 },
  ],
} as const satisfies TemperWorldSkyshard

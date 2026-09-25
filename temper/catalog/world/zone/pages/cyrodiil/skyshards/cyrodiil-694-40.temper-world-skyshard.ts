import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69440 = {
  id: "01a0d5dd-bdb4-7c0a-803e-7eb2ab7ded23",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-694-40",
  title: "Cyrodiil skyshard 40 of achievement 694",
  esoAchievementId: 694,
  shardNumber: 40,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.5377, mapY: 0.81, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "bloodmaynecave_base", mapX: 0.153, mapY: 0.486 },
  ],
} as const satisfies TemperWorldSkyshard

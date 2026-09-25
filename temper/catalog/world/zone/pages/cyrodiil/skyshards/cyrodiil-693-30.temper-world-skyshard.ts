import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69330 = {
  id: "01a0d5dd-bdb4-78f9-9230-d6793b18797a",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-693-30",
  title: "Cyrodiil skyshard 30 of achievement 693",
  esoAchievementId: 693,
  shardNumber: 30,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.3612, mapY: 0.221, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "underpallcave_base", mapX: 0.77, mapY: 0.441 },
  ],
} as const satisfies TemperWorldSkyshard

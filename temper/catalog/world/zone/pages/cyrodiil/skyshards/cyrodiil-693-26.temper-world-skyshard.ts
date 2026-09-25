import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69326 = {
  id: "01a0d5dd-bdb4-7e1c-9b13-f453ab86e974",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-693-26",
  title: "Cyrodiil skyshard 26 of achievement 693",
  esoAchievementId: 693,
  shardNumber: 26,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.3547, mapY: 0.1348, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "echocave_base", mapX: 0.421, mapY: 0.227 },
  ],
} as const satisfies TemperWorldSkyshard

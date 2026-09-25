import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil6928 = {
  id: "01a0d5dd-bdb3-76f4-8c25-e293e8045190",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-692-8",
  title: "Cyrodiil skyshard 8 of achievement 692",
  esoAchievementId: 692,
  shardNumber: 8,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.7796, mapY: 0.2086, placeKinds: [4] },
  ],
} as const satisfies TemperWorldSkyshard

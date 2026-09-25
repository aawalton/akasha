import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69329 = {
  id: "01a0d5dd-bdb4-7b07-9d61-ae7f24c9f0d3",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-693-29",
  title: "Cyrodiil skyshard 29 of achievement 693",
  esoAchievementId: 693,
  shardNumber: 29,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.5027, mapY: 0.2148, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "toadstoolhollow_base", mapX: 0.48, mapY: 0.53 },
    { mapFolder: "cyrodiil", mapTile: "toadstoolhollowlower_base", mapX: 0.4, mapY: 0.64 },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69215 = {
  id: "01a0d5dd-bdb3-7a71-be6c-ed9972ce2970",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-692-15",
  title: "Cyrodiil skyshard 15 of achievement 692",
  esoAchievementId: 692,
  shardNumber: 15,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.8067, mapY: 0.461, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "vahtacen_base", mapX: 0.14, mapY: 0.78 },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69213 = {
  id: "01a0d5dd-bdb3-7f45-8670-b4ea08fd73d0",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-692-13",
  title: "Cyrodiil skyshard 13 of achievement 692",
  esoAchievementId: 692,
  shardNumber: 13,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.7211, mapY: 0.6949, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "newtcave_base", mapX: 0.38, mapY: 0.324 },
  ],
} as const satisfies TemperWorldSkyshard

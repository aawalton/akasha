import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69214 = {
  id: "01a0d5dd-bdb3-77a4-a80c-28a3ff25889f",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-692-14",
  title: "Cyrodiil skyshard 14 of achievement 692",
  esoAchievementId: 692,
  shardNumber: 14,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.7587, mapY: 0.3474, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "quickwatercave_base", mapX: 0.3965, mapY: 0.5494 },
  ],
} as const satisfies TemperWorldSkyshard

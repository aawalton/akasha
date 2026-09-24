import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const khenarthisRoost4311 = {
  id: "01a0d5dc-0fad-7b28-898b-4aa5314e0d64",
  type: "page-type/temper-world-skyshard",
  slug: "khenarthis-roost-431-1",
  title: "Khenarthi's Roost skyshard 1 of achievement 431",
  esoAchievementId: 431,
  shardNumber: 1,
  worldZone: "temper-world-zone/khenarthis-roost",
  mapPositions: [
    { mapFolder: "auridon", mapTile: "khenarthisroost_base", mapX: 0.5893, mapY: 0.8093 },
  ],
} as const satisfies TemperWorldSkyshard

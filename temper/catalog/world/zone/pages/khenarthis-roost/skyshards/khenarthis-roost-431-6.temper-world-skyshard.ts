import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const khenarthisRoost4316 = {
  id: "01a0d5dc-0fae-7a81-8852-1171e3926a16",
  type: "page-type/temper-world-skyshard",
  slug: "khenarthis-roost-431-6",
  title: "Khenarthi's Roost skyshard 6 of achievement 431",
  esoAchievementId: 431,
  shardNumber: 6,
  worldZone: "temper-world-zone/khenarthis-roost",
  mapPositions: [
    { mapFolder: "auridon", mapTile: "khenarthisroost_base", mapX: 0.2809, mapY: 0.3642 },
  ],
} as const satisfies TemperWorldSkyshard

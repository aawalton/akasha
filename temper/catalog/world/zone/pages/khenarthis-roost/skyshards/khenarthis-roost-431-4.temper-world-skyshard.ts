import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const khenarthisRoost4314 = {
  id: "01a0d5dc-0fae-7650-b4df-e046e8abf7d6",
  type: "page-type/temper-world-skyshard",
  slug: "khenarthis-roost-431-4",
  title: "Khenarthi's Roost skyshard 4 of achievement 431",
  esoAchievementId: 431,
  shardNumber: 4,
  worldZone: "temper-world-zone/khenarthis-roost",
  mapPositions: [
    { mapFolder: "auridon", mapTile: "khenarthisroost_base", mapX: 0.6827, mapY: 0.5788 },
  ],
} as const satisfies TemperWorldSkyshard

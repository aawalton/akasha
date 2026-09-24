import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const khenarthisRoost4313 = {
  id: "01a0d5dc-0fae-768b-a1b3-bcc59abd1562",
  type: "page-type/temper-world-skyshard",
  slug: "khenarthis-roost-431-3",
  title: "Khenarthi's Roost skyshard 3 of achievement 431",
  esoAchievementId: 431,
  shardNumber: 3,
  worldZone: "temper-world-zone/khenarthis-roost",
  mapPositions: [
    { mapFolder: "auridon", mapTile: "khenarthisroost_base", mapX: 0.1628, mapY: 0.5554 },
  ],
} as const satisfies TemperWorldSkyshard

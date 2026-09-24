import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const khenarthisRoost4315 = {
  id: "01a0d5dc-0fae-71a1-8e29-a508be3ebfe6",
  type: "page-type/temper-world-skyshard",
  slug: "khenarthis-roost-431-5",
  title: "Khenarthi's Roost skyshard 5 of achievement 431",
  esoAchievementId: 431,
  shardNumber: 5,
  worldZone: "temper-world-zone/khenarthis-roost",
  mapPositions: [
    {
      mapFolder: "auridon",
      mapTile: "khenarthisroost_base",
      mapX: 0.4294,
      mapY: 0.4062,
      placeKinds: [1],
    },
    { mapFolder: "auridon", mapTile: "mistral_base", mapX: 0.1479, mapY: 0.3446 },
  ],
} as const satisfies TemperWorldSkyshard

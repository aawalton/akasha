import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const solstice44617 = {
  id: "01a0d5e5-c3ce-7c79-aed5-976bbb6ce428",
  type: "page-type/temper-world-skyshard",
  slug: "solstice-4461-7",
  title: "Solstice skyshard 7 of achievement 4461",
  esoAchievementId: 4461,
  shardNumber: 7,
  worldZone: "temper-world-zone/solstice",
  mapPositions: [
    {
      mapFolder: "solstice",
      mapTile: "u46_base_lotwc",
      mapX: 0.3692,
      mapY: 0.7918,
      placeKinds: [2],
    },
    {
      mapFolder: "solstice",
      mapTile: "u48_overland_base",
      mapX: 0.6596,
      mapY: 0.3624,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

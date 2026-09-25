import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const solstice44054 = {
  id: "01a0d5e5-c3ce-7929-a64d-6e357f3284ab",
  type: "page-type/temper-world-skyshard",
  slug: "solstice-4405-4",
  title: "Solstice skyshard 4 of achievement 4405",
  esoAchievementId: 4405,
  shardNumber: 4,
  worldZone: "temper-world-zone/solstice",
  mapPositions: [
    {
      mapFolder: "solstice",
      mapTile: "u46_base_lostvillage",
      mapX: 0.8643,
      mapY: 0.4639,
      placeKinds: [2],
    },
    {
      mapFolder: "solstice",
      mapTile: "u48_overland_base",
      mapX: 0.3116,
      mapY: 0.5953,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const solstice44052 = {
  id: "01a0d5e5-c3ce-72cb-a1bc-9d6be1e5c67c",
  type: "page-type/temper-world-skyshard",
  slug: "solstice-4405-2",
  title: "Solstice skyshard 2 of achievement 4405",
  esoAchievementId: 4405,
  shardNumber: 2,
  worldZone: "temper-world-zone/solstice",
  mapPositions: [
    {
      mapFolder: "solstice",
      mapTile: "u46_base_sanguinehdlv",
      mapX: 0.4642,
      mapY: 0.6046,
      placeKinds: [2],
    },
    {
      mapFolder: "solstice",
      mapTile: "u48_overland_base",
      mapX: 0.4752,
      mapY: 0.7099,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

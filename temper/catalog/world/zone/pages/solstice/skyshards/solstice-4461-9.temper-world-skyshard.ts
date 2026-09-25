import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const solstice44619 = {
  id: "01a0d5e5-c3ce-75db-9836-509def765088",
  type: "page-type/temper-world-skyshard",
  slug: "solstice-4461-9",
  title: "Solstice skyshard 9 of achievement 4461",
  esoAchievementId: 4461,
  shardNumber: 9,
  worldZone: "temper-world-zone/solstice",
  mapPositions: [
    {
      mapFolder: "solstice",
      mapTile: "u48_delve_sithis_crest_01",
      mapX: 0.7976,
      mapY: 0.4933,
      placeKinds: [2],
    },
    {
      mapFolder: "solstice",
      mapTile: "u48_overland_base",
      mapX: 0.7218,
      mapY: 0.6866,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

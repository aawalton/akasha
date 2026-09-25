import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const solstice44618 = {
  id: "01a0d5e5-c3ce-74ba-996d-6b680d869bd9",
  type: "page-type/temper-world-skyshard",
  slug: "solstice-4461-8",
  title: "Solstice skyshard 8 of achievement 4461",
  esoAchievementId: 4461,
  shardNumber: 8,
  worldZone: "temper-world-zone/solstice",
  mapPositions: [
    {
      mapFolder: "solstice",
      mapTile: "u48_overland_base",
      mapX: 0.6148,
      mapY: 0.5053,
      placeKinds: [2],
    },
    {
      mapFolder: "solstice",
      mapTile: "u48_ssl_delve_base_2",
      mapX: 0.205,
      mapY: 0.4721,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const solstice44616 = {
  id: "01a0d5e5-c3ce-7906-8388-d612e702e384",
  type: "page-type/temper-world-skyshard",
  slug: "solstice-4461-6",
  title: "Solstice skyshard 6 of achievement 4461",
  esoAchievementId: 4461,
  shardNumber: 6,
  worldZone: "temper-world-zone/solstice",
  mapPositions: [
    {
      mapFolder: "solstice",
      mapTile: "u48_base_calindvalegardenspd",
      mapX: 0.3676,
      mapY: 0.5107,
      placeKinds: [3],
    },
    {
      mapFolder: "solstice",
      mapTile: "u48_overland_base",
      mapX: 0.7332,
      mapY: 0.5725,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard

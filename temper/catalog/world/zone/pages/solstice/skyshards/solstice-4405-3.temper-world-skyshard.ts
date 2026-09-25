import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const solstice44053 = {
  id: "01a0d5e5-c3ce-79d9-b44f-53d9821408b4",
  type: "page-type/temper-world-skyshard",
  slug: "solstice-4405-3",
  title: "Solstice skyshard 3 of achievement 4405",
  esoAchievementId: 4405,
  shardNumber: 3,
  worldZone: "temper-world-zone/solstice",
  mapPositions: [
    {
      mapFolder: "solstice",
      mapTile: "u46_carapacecaverns_base",
      mapX: 0.7064,
      mapY: 0.7852,
      placeKinds: [2],
    },
    {
      mapFolder: "solstice",
      mapTile: "u48_overland_base",
      mapX: 0.2761,
      mapY: 0.4573,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

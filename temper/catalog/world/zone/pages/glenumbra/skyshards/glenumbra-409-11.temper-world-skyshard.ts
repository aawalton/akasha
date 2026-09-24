import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const glenumbra40911 = {
  id: "01a0d5db-68af-7bab-8638-1243cb9054a7",
  type: "page-type/temper-world-skyshard",
  slug: "glenumbra-409-11",
  title: "Glenumbra skyshard 11 of achievement 409",
  esoAchievementId: 409,
  shardNumber: 11,
  worldZone: "temper-world-zone/glenumbra",
  mapPositions: [
    {
      mapFolder: "glenumbra",
      mapTile: "glenumbra_base",
      mapX: 0.272,
      mapY: 0.678,
      placeKinds: [2],
    },
    { mapFolder: "glenumbra", mapTile: "silumm_base", mapX: 0.256, mapY: 0.213 },
  ],
} as const satisfies TemperWorldSkyshard

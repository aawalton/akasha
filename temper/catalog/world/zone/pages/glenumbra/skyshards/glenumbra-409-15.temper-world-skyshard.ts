import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const glenumbra40915 = {
  id: "01a0d5db-68b0-7596-a2d4-598c164bee1c",
  type: "page-type/temper-world-skyshard",
  slug: "glenumbra-409-15",
  title: "Glenumbra skyshard 15 of achievement 409",
  esoAchievementId: 409,
  shardNumber: 15,
  worldZone: "temper-world-zone/glenumbra",
  mapPositions: [
    { mapFolder: "glenumbra", mapTile: "crosswych_base", mapX: 0.253, mapY: 0.461 },
    { mapFolder: "glenumbra", mapTile: "cryptwatchfort_base", mapX: 0.746, mapY: 0.264 },
    {
      mapFolder: "glenumbra",
      mapTile: "glenumbra_base",
      mapX: 0.766,
      mapY: 0.138,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

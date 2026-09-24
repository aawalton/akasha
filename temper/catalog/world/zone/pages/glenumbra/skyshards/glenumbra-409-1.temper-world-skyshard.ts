import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const glenumbra4091 = {
  id: "01a0d5db-68af-7104-b76d-380be5254709",
  type: "page-type/temper-world-skyshard",
  slug: "glenumbra-409-1",
  title: "Glenumbra skyshard 1 of achievement 409",
  esoAchievementId: 409,
  shardNumber: 1,
  worldZone: "temper-world-zone/glenumbra",
  mapPositions: [
    { mapFolder: "glenumbra", mapTile: "daggerfall_base", mapX: 0.695, mapY: 0.447 },
    {
      mapFolder: "glenumbra",
      mapTile: "glenumbra_base",
      mapX: 0.319,
      mapY: 0.755,
      placeKinds: [1],
    },
  ],
} as const satisfies TemperWorldSkyshard

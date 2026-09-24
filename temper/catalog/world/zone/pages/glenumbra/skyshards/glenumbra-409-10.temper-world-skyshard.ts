import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const glenumbra40910 = {
  id: "01a0d5db-68af-7a82-9e50-3016d7b46c63",
  type: "page-type/temper-world-skyshard",
  slug: "glenumbra-409-10",
  title: "Glenumbra skyshard 10 of achievement 409",
  esoAchievementId: 409,
  shardNumber: 10,
  worldZone: "temper-world-zone/glenumbra",
  mapPositions: [
    { mapFolder: "glenumbra", mapTile: "glenumbra_base", mapX: 0.35, mapY: 0.727, placeKinds: [2] },
    { mapFolder: "glenumbra", mapTile: "ilessantower_base", mapX: 0.841, mapY: 0.312 },
  ],
} as const satisfies TemperWorldSkyshard

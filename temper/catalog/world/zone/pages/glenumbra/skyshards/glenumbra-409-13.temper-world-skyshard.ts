import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const glenumbra40913 = {
  id: "01a0d5db-68b0-7366-ae68-578160394719",
  type: "page-type/temper-world-skyshard",
  slug: "glenumbra-409-13",
  title: "Glenumbra skyshard 13 of achievement 409",
  esoAchievementId: 409,
  shardNumber: 13,
  worldZone: "temper-world-zone/glenumbra",
  mapPositions: [
    { mapFolder: "glenumbra", mapTile: "enduum_base", mapX: 0.406, mapY: 0.861 },
    {
      mapFolder: "glenumbra",
      mapTile: "glenumbra_base",
      mapX: 0.343,
      mapY: 0.333,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

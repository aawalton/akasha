import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const glenumbra40914 = {
  id: "01a0d5db-68b0-74c4-bdb2-8184114e10ec",
  type: "page-type/temper-world-skyshard",
  slug: "glenumbra-409-14",
  title: "Glenumbra skyshard 14 of achievement 409",
  esoAchievementId: 409,
  shardNumber: 14,
  worldZone: "temper-world-zone/glenumbra",
  mapPositions: [
    { mapFolder: "glenumbra", mapTile: "eboncrypt_base", mapX: 0.402, mapY: 0.116 },
    {
      mapFolder: "glenumbra",
      mapTile: "glenumbra_base",
      mapX: 0.608,
      mapY: 0.185,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

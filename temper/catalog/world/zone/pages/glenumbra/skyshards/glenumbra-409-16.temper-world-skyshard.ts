import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const glenumbra40916 = {
  id: "01a0d5db-68b0-7845-93f2-1b3c24c93459",
  type: "page-type/temper-world-skyshard",
  slug: "glenumbra-409-16",
  title: "Glenumbra skyshard 16 of achievement 409",
  esoAchievementId: 409,
  shardNumber: 16,
  worldZone: "temper-world-zone/glenumbra",
  mapPositions: [
    { mapFolder: "glenumbra", mapTile: "badmanscave_base", mapX: 0.332, mapY: 0.509 },
    { mapFolder: "glenumbra", mapTile: "glenumbra_base", mapX: 0.2, mapY: 0.739, placeKinds: [3] },
  ],
} as const satisfies TemperWorldSkyshard

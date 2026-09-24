import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const glenumbra4099 = {
  id: "01a0d5db-68b0-724a-a0f2-ab4f7544fc12",
  type: "page-type/temper-world-skyshard",
  slug: "glenumbra-409-9",
  title: "Glenumbra skyshard 9 of achievement 409",
  esoAchievementId: 409,
  shardNumber: 9,
  worldZone: "temper-world-zone/glenumbra",
  mapPositions: [
    { mapFolder: "glenumbra", mapTile: "crosswych_base", mapX: 0.377, mapY: 0.325 },
    {
      mapFolder: "glenumbra",
      mapTile: "glenumbra_base",
      mapX: 0.787,
      mapY: 0.116,
      placeKinds: [1],
    },
  ],
} as const satisfies TemperWorldSkyshard

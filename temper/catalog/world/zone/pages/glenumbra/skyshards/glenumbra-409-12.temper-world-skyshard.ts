import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const glenumbra40912 = {
  id: "01a0d5db-68af-71e2-9dbd-b6c27aa604cc",
  type: "page-type/temper-world-skyshard",
  slug: "glenumbra-409-12",
  title: "Glenumbra skyshard 12 of achievement 409",
  esoAchievementId: 409,
  shardNumber: 12,
  worldZone: "temper-world-zone/glenumbra",
  mapPositions: [
    { mapFolder: "glenumbra", mapTile: "glenumbra_base", mapX: 0.698, mapY: 0.53, placeKinds: [2] },
    { mapFolder: "glenumbra", mapTile: "minesofkhuras_base", mapX: 0.446, mapY: 0.664 },
  ],
} as const satisfies TemperWorldSkyshard

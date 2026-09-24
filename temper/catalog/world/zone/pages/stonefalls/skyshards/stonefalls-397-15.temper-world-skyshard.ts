import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stonefalls39715 = {
  id: "01a0d5d9-b16f-771a-80f4-cd09df309118",
  type: "page-type/temper-world-skyshard",
  slug: "stonefalls-397-15",
  title: "Stonefalls skyshard 15 of achievement 397",
  esoAchievementId: 397,
  shardNumber: 15,
  worldZone: "temper-world-zone/stonefalls",
  mapPositions: [
    { mapFolder: "stonefalls", mapTile: "sheogorathstongue_base", mapX: 0.5813, mapY: 0.2625 },
    {
      mapFolder: "stonefalls",
      mapTile: "stonefalls_base",
      mapX: 0.211,
      mapY: 0.5405,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

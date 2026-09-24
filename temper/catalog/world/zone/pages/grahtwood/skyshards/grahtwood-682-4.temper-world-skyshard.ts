import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const grahtwood6824 = {
  id: "01a0d5dc-7dd3-7cc1-b8bc-23837fc5dea2",
  type: "page-type/temper-world-skyshard",
  slug: "grahtwood-682-4",
  title: "Grahtwood skyshard 4 of achievement 682",
  esoAchievementId: 682,
  shardNumber: 4,
  worldZone: "temper-world-zone/grahtwood",
  mapPositions: [
    { mapFolder: "grahtwood", mapTile: "eldenrootgroundfloor_base", mapX: 0.754, mapY: 0.626 },
    {
      mapFolder: "grahtwood",
      mapTile: "grahtwood_base",
      mapX: 0.621,
      mapY: 0.526,
      placeKinds: [1],
    },
  ],
} as const satisfies TemperWorldSkyshard

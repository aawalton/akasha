import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const grahtwood68212 = {
  id: "01a0d5dc-7dd3-7d5d-b376-2df1eb3d5379",
  type: "page-type/temper-world-skyshard",
  slug: "grahtwood-682-12",
  title: "Grahtwood skyshard 12 of achievement 682",
  esoAchievementId: 682,
  shardNumber: 12,
  worldZone: "temper-world-zone/grahtwood",
  mapPositions: [
    { mapFolder: "grahtwood", mapTile: "burrootkwamamine_base", mapX: 0.781, mapY: 0.443 },
    {
      mapFolder: "grahtwood",
      mapTile: "grahtwood_base",
      mapX: 0.484,
      mapY: 0.445,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

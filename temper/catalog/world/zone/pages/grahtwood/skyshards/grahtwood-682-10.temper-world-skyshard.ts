import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const grahtwood68210 = {
  id: "01a0d5dc-7dd2-7ca1-8199-bdf1ad0a1874",
  type: "page-type/temper-world-skyshard",
  slug: "grahtwood-682-10",
  title: "Grahtwood skyshard 10 of achievement 682",
  esoAchievementId: 682,
  shardNumber: 10,
  worldZone: "temper-world-zone/grahtwood",
  mapPositions: [
    {
      mapFolder: "grahtwood",
      mapTile: "grahtwood_base",
      mapX: 0.562,
      mapY: 0.665,
      placeKinds: [2],
    },
    { mapFolder: "grahtwood", mapTile: "nesalas_base", mapX: 0.575, mapY: 0.577 },
  ],
} as const satisfies TemperWorldSkyshard

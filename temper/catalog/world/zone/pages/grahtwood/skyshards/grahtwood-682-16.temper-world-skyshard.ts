import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const grahtwood68216 = {
  id: "01a0d5dc-7dd3-712f-8d5e-cd7033821997",
  type: "page-type/temper-world-skyshard",
  slug: "grahtwood-682-16",
  title: "Grahtwood skyshard 16 of achievement 682",
  esoAchievementId: 682,
  shardNumber: 16,
  worldZone: "temper-world-zone/grahtwood",
  mapPositions: [
    {
      mapFolder: "grahtwood",
      mapTile: "grahtwood_base",
      mapX: 0.658,
      mapY: 0.597,
      placeKinds: [3],
    },
    { mapFolder: "grahtwood", mapTile: "rootsunder_base", mapX: 0.289, mapY: 0.661 },
  ],
} as const satisfies TemperWorldSkyshard

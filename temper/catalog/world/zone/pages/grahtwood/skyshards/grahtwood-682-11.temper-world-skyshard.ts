import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const grahtwood68211 = {
  id: "01a0d5dc-7dd3-709a-9751-d0124b3f0954",
  type: "page-type/temper-world-skyshard",
  slug: "grahtwood-682-11",
  title: "Grahtwood skyshard 11 of achievement 682",
  esoAchievementId: 682,
  shardNumber: 11,
  worldZone: "temper-world-zone/grahtwood",
  mapPositions: [
    { mapFolder: "grahtwood", mapTile: "dessicatedcave_base", mapX: 0.62, mapY: 0.463 },
    {
      mapFolder: "grahtwood",
      mapTile: "grahtwood_base",
      mapX: 0.806,
      mapY: 0.509,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

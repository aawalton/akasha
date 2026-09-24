import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const grahtwood68215 = {
  id: "01a0d5dc-7dd3-77f0-a461-34bf95379510",
  type: "page-type/temper-world-skyshard",
  slug: "grahtwood-682-15",
  title: "Grahtwood skyshard 15 of achievement 682",
  esoAchievementId: 682,
  shardNumber: 15,
  worldZone: "temper-world-zone/grahtwood",
  mapPositions: [
    {
      mapFolder: "grahtwood",
      mapTile: "grahtwood_base",
      mapX: 0.523,
      mapY: 0.598,
      placeKinds: [2],
    },
    { mapFolder: "grahtwood", mapTile: "mobarmine_base", mapX: 0.396, mapY: 0.477 },
  ],
} as const satisfies TemperWorldSkyshard

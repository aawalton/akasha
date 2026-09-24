import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const grahtwood68213 = {
  id: "01a0d5dc-7dd3-709f-9856-d5212e33024b",
  type: "page-type/temper-world-skyshard",
  slug: "grahtwood-682-13",
  title: "Grahtwood skyshard 13 of achievement 682",
  esoAchievementId: 682,
  shardNumber: 13,
  worldZone: "temper-world-zone/grahtwood",
  mapPositions: [
    {
      mapFolder: "grahtwood",
      mapTile: "grahtwood_base",
      mapX: 0.722,
      mapY: 0.362,
      placeKinds: [2],
    },
    { mapFolder: "grahtwood", mapTile: "vindeathcave_base", mapX: 0.738, mapY: 0.746 },
  ],
} as const satisfies TemperWorldSkyshard

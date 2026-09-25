import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const wrothgar132013 = {
  id: "01a0d5de-dadd-77e1-8dd8-d4e991f3f729",
  type: "page-type/temper-world-skyshard",
  slug: "wrothgar-1320-13",
  title: "Wrothgar skyshard 13 of achievement 1320",
  esoAchievementId: 1320,
  shardNumber: 13,
  worldZone: "temper-world-zone/wrothgar",
  mapPositions: [
    {
      mapFolder: "wrothgar",
      mapTile: "coldperchcavern_base",
      mapX: 0.3289,
      mapY: 0.8272,
      placeKinds: [2],
    },
    { mapFolder: "wrothgar", mapTile: "wrothgar_base", mapX: 0.8116, mapY: 0.596, placeKinds: [2] },
  ],
} as const satisfies TemperWorldSkyshard

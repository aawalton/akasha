import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const wrothgar132011 = {
  id: "01a0d5de-dadd-782c-86e2-b5c5a7087f91",
  type: "page-type/temper-world-skyshard",
  slug: "wrothgar-1320-11",
  title: "Wrothgar skyshard 11 of achievement 1320",
  esoAchievementId: 1320,
  shardNumber: 11,
  worldZone: "temper-world-zone/wrothgar",
  mapPositions: [
    {
      mapFolder: "wrothgar",
      mapTile: "rkindaleftoutside_base",
      mapX: 0.2644,
      mapY: 0.3887,
      placeKinds: [3],
    },
    { mapFolder: "wrothgar", mapTile: "wrothgar_base", mapX: 0.895, mapY: 0.4718, placeKinds: [3] },
  ],
} as const satisfies TemperWorldSkyshard

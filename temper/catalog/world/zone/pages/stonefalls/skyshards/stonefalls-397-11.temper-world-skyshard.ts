import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stonefalls39711 = {
  id: "01a0d5d9-b16f-7e10-b5a8-bbdf6008fcd6",
  type: "page-type/temper-world-skyshard",
  slug: "stonefalls-397-11",
  title: "Stonefalls skyshard 11 of achievement 397",
  esoAchievementId: 397,
  shardNumber: 11,
  worldZone: "temper-world-zone/stonefalls",
  mapPositions: [
    { mapFolder: "stonefalls", mapTile: "emberflintmine_base", mapX: 0.7284, mapY: 0.5864 },
    {
      mapFolder: "stonefalls",
      mapTile: "stonefalls_base",
      mapX: 0.6432,
      mapY: 0.5915,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

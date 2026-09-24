import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stonefalls39710 = {
  id: "01a0d5d9-b16f-75d9-9e0e-625a53a4cb7d",
  type: "page-type/temper-world-skyshard",
  slug: "stonefalls-397-10",
  title: "Stonefalls skyshard 10 of achievement 397",
  esoAchievementId: 397,
  shardNumber: 10,
  worldZone: "temper-world-zone/stonefalls",
  mapPositions: [
    { mapFolder: "stonefalls", mapTile: "innerseaarmature_base", mapX: 0.4384, mapY: 0.2726 },
    {
      mapFolder: "stonefalls",
      mapTile: "stonefalls_base",
      mapX: 0.7166,
      mapY: 0.3932,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

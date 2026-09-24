import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stonefalls39712 = {
  id: "01a0d5d9-b16f-7b69-add5-b103b35e4edb",
  type: "page-type/temper-world-skyshard",
  slug: "stonefalls-397-12",
  title: "Stonefalls skyshard 12 of achievement 397",
  esoAchievementId: 397,
  shardNumber: 12,
  worldZone: "temper-world-zone/stonefalls",
  mapPositions: [
    { mapFolder: "stonefalls", mapTile: "mephalasnest_base", mapX: 0.5612, mapY: 0.3496 },
    {
      mapFolder: "stonefalls",
      mapTile: "stonefalls_base",
      mapX: 0.5833,
      mapY: 0.5944,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

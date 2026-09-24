import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stonefalls39714 = {
  id: "01a0d5d9-b16f-7626-9ecb-d6cdb5b3a57b",
  type: "page-type/temper-world-skyshard",
  slug: "stonefalls-397-14",
  title: "Stonefalls skyshard 14 of achievement 397",
  esoAchievementId: 397,
  shardNumber: 14,
  worldZone: "temper-world-zone/stonefalls",
  mapPositions: [
    { mapFolder: "stonefalls", mapTile: "softloamcavern_base", mapX: 0.4197, mapY: 0.7056 },
    {
      mapFolder: "stonefalls",
      mapTile: "stonefalls_base",
      mapX: 0.29,
      mapY: 0.5582,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const hewsBane13476 = {
  id: "01a0d5e0-4ade-708f-b86a-02f204affdbc",
  type: "page-type/temper-world-skyshard",
  slug: "hews-bane-1347-6",
  title: "Hew's Bane skyshard 6 of achievement 1347",
  esoAchievementId: 1347,
  shardNumber: 6,
  worldZone: "temper-world-zone/hews-bane",
  mapPositions: [
    {
      mapFolder: "thievesguild",
      mapTile: "hewsbane_base",
      mapX: 0.324,
      mapY: 0.7891,
      placeKinds: [2],
    },
    {
      mapFolder: "thievesguild",
      mapTile: "sharktoothgrotto1_base",
      mapX: 0.6611,
      mapY: 0.386,
      placeKinds: [2],
    },
    {
      mapFolder: "thievesguild",
      mapTile: "sharktoothgrotto2_base",
      mapX: 0.6611,
      mapY: 0.386,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

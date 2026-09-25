import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const eastmarch68811 = {
  id: "01a0d5dd-a09c-70fb-bfca-9967215428b7",
  type: "page-type/temper-world-skyshard",
  slug: "eastmarch-688-11",
  title: "Eastmarch skyshard 11 of achievement 688",
  esoAchievementId: 688,
  shardNumber: 11,
  worldZone: "temper-world-zone/eastmarch",
  mapPositions: [
    {
      mapFolder: "eastmarch",
      mapTile: "eastmarch_base",
      mapX: 0.624,
      mapY: 0.264,
      placeKinds: [2],
    },
    { mapFolder: "eastmarch", mapTile: "thechillhollow_base", mapX: 0.338, mapY: 0.887 },
  ],
} as const satisfies TemperWorldSkyshard

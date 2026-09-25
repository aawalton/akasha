import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const murkmire22916 = {
  id: "01a0d5dc-c91b-7b05-9277-5c362f2fd185",
  type: "page-type/temper-world-skyshard",
  slug: "murkmire-2291-6",
  title: "Murkmire skyshard 6 of achievement 2291",
  esoAchievementId: 2291,
  shardNumber: 6,
  worldZone: "temper-world-zone/murkmire",
  mapPositions: [
    {
      mapFolder: "murkmire",
      mapTile: "murkmire_base",
      mapX: 0.4653,
      mapY: 0.3691,
      placeKinds: [2],
    },
    {
      mapFolder: "murkmire",
      mapTile: "teethofsithis01_base",
      mapX: 0.6542,
      mapY: 0.5523,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

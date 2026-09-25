import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const murkmire22915 = {
  id: "01a0d5dc-c91b-7990-97ac-c8349572d1f7",
  type: "page-type/temper-world-skyshard",
  slug: "murkmire-2291-5",
  title: "Murkmire skyshard 5 of achievement 2291",
  esoAchievementId: 2291,
  shardNumber: 5,
  worldZone: "temper-world-zone/murkmire",
  mapPositions: [
    { mapFolder: "murkmire", mapTile: "murkmire_base", mapX: 0.203, mapY: 0.5157, placeKinds: [2] },
    {
      mapFolder: "murkmire",
      mapTile: "tsofeercavern01",
      mapX: 0.2663,
      mapY: 0.8301,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const greenshade68314 = {
  id: "01a0d5de-2b0c-73e9-965b-beb05fc6e85c",
  type: "page-type/temper-world-skyshard",
  slug: "greenshade-683-14",
  title: "Greenshade skyshard 14 of achievement 683",
  esoAchievementId: 683,
  shardNumber: 14,
  worldZone: "temper-world-zone/greenshade",
  mapPositions: [
    {
      mapFolder: "greenshade",
      mapTile: "greenshade_base",
      mapX: 0.63,
      mapY: 0.45,
      placeKinds: [2],
    },
    { mapFolder: "greenshade", mapTile: "harridanslair_base", mapX: 0.737, mapY: 0.748 },
  ],
} as const satisfies TemperWorldSkyshard

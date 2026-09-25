import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const greenshade68312 = {
  id: "01a0d5de-2b0c-72fc-9eb6-b3ee144af11b",
  type: "page-type/temper-world-skyshard",
  slug: "greenshade-683-12",
  title: "Greenshade skyshard 12 of achievement 683",
  esoAchievementId: 683,
  shardNumber: 12,
  worldZone: "temper-world-zone/greenshade",
  mapPositions: [
    {
      mapFolder: "greenshade",
      mapTile: "greenshade_base",
      mapX: 0.369,
      mapY: 0.684,
      placeKinds: [2],
    },
    { mapFolder: "greenshade", mapTile: "narilnagaia_base", mapX: 0.266, mapY: 0.732 },
  ],
} as const satisfies TemperWorldSkyshard

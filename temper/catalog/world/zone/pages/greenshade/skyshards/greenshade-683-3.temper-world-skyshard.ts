import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const greenshade6833 = {
  id: "01a0d5de-2b0c-7530-b983-880766014382",
  type: "page-type/temper-world-skyshard",
  slug: "greenshade-683-3",
  title: "Greenshade skyshard 3 of achievement 683",
  esoAchievementId: 683,
  shardNumber: 3,
  worldZone: "temper-world-zone/greenshade",
  mapPositions: [
    {
      mapFolder: "greenshade",
      mapTile: "greenshade_base",
      mapX: 0.679,
      mapY: 0.484,
      placeKinds: [1],
    },
    { mapFolder: "greenshade", mapTile: "marbruk_base", mapX: 0.334, mapY: 0.197 },
  ],
} as const satisfies TemperWorldSkyshard

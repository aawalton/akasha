import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const greenshade68310 = {
  id: "01a0d5de-2b0b-7d64-ab6c-58620ce38af0",
  type: "page-type/temper-world-skyshard",
  slug: "greenshade-683-10",
  title: "Greenshade skyshard 10 of achievement 683",
  esoAchievementId: 683,
  shardNumber: 10,
  worldZone: "temper-world-zone/greenshade",
  mapPositions: [
    {
      mapFolder: "greenshade",
      mapTile: "greenshade_base",
      mapX: 0.742,
      mapY: 0.613,
      placeKinds: [2],
    },
    { mapFolder: "greenshade", mapTile: "gurzagsmine_base", mapX: 0.613, mapY: 0.573 },
  ],
} as const satisfies TemperWorldSkyshard

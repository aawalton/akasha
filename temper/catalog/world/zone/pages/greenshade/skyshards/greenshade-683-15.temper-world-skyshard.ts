import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const greenshade68315 = {
  id: "01a0d5de-2b0c-7bd5-956c-ddea83274896",
  type: "page-type/temper-world-skyshard",
  slug: "greenshade-683-15",
  title: "Greenshade skyshard 15 of achievement 683",
  esoAchievementId: 683,
  shardNumber: 15,
  worldZone: "temper-world-zone/greenshade",
  mapPositions: [
    { mapFolder: "greenshade", mapTile: "barrowtrench_base", mapX: 0.54, mapY: 0.562 },
    {
      mapFolder: "greenshade",
      mapTile: "greenshade_base",
      mapX: 0.294,
      mapY: 0.152,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

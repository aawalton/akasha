import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const greenshade68316 = {
  id: "01a0d5de-2b0c-74cc-9ae4-72402c0642be",
  type: "page-type/temper-world-skyshard",
  slug: "greenshade-683-16",
  title: "Greenshade skyshard 16 of achievement 683",
  esoAchievementId: 683,
  shardNumber: 16,
  worldZone: "temper-world-zone/greenshade",
  mapPositions: [
    {
      mapFolder: "greenshade",
      mapTile: "greenshade_base",
      mapX: 0.388,
      mapY: 0.449,
      placeKinds: [3],
    },
    { mapFolder: "greenshade", mapTile: "rulanyilsfall_base", mapX: 0.681, mapY: 0.415 },
  ],
} as const satisfies TemperWorldSkyshard

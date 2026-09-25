import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const greenshade68313 = {
  id: "01a0d5de-2b0c-79bb-b5a2-a1c360249a5f",
  type: "page-type/temper-world-skyshard",
  slug: "greenshade-683-13",
  title: "Greenshade skyshard 13 of achievement 683",
  esoAchievementId: 683,
  shardNumber: 13,
  worldZone: "temper-world-zone/greenshade",
  mapPositions: [
    {
      mapFolder: "greenshade",
      mapTile: "greenshade_base",
      mapX: 0.308,
      mapY: 0.399,
      placeKinds: [2],
    },
    { mapFolder: "greenshade", mapTile: "theunderroot_base", mapX: 0.47, mapY: 0.24 },
  ],
} as const satisfies TemperWorldSkyshard

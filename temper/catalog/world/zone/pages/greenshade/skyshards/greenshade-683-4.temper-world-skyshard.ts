import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const greenshade6834 = {
  id: "01a0d5de-2b0c-7f29-bece-1324fda991a8",
  type: "page-type/temper-world-skyshard",
  slug: "greenshade-683-4",
  title: "Greenshade skyshard 4 of achievement 683",
  esoAchievementId: 683,
  shardNumber: 4,
  worldZone: "temper-world-zone/greenshade",
  mapPositions: [
    {
      mapFolder: "greenshade",
      mapTile: "greenshade_base",
      mapX: 0.159,
      mapY: 0.699,
      placeKinds: [1],
    },
    { mapFolder: "greenshade", mapTile: "woodhearth_base", mapX: 0.486, mapY: 0.741 },
  ],
} as const satisfies TemperWorldSkyshard

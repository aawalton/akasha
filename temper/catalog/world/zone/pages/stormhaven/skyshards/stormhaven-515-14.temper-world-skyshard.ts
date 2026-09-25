import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stormhaven51514 = {
  id: "01a0d5dd-463a-7d39-9148-ab4b27ddc181",
  type: "page-type/temper-world-skyshard",
  slug: "stormhaven-515-14",
  title: "Stormhaven skyshard 14 of achievement 515",
  esoAchievementId: 515,
  shardNumber: 14,
  worldZone: "temper-world-zone/stormhaven",
  mapPositions: [
    { mapFolder: "stormhaven", mapTile: "pariahcatacombs_base", mapX: 0.752, mapY: 0.319 },
    {
      mapFolder: "stormhaven",
      mapTile: "stormhaven_base",
      mapX: 0.458,
      mapY: 0.43,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

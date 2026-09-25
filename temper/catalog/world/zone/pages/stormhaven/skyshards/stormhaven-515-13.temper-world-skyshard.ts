import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stormhaven51513 = {
  id: "01a0d5dd-463a-7569-9eec-cc1d9252e445",
  type: "page-type/temper-world-skyshard",
  slug: "stormhaven-515-13",
  title: "Stormhaven skyshard 13 of achievement 515",
  esoAchievementId: 515,
  shardNumber: 13,
  worldZone: "temper-world-zone/stormhaven",
  mapPositions: [
    { mapFolder: "stormhaven", mapTile: "norvulkruins_base", mapX: 0.352, mapY: 0.532 },
    {
      mapFolder: "stormhaven",
      mapTile: "stormhaven_base",
      mapX: 0.605,
      mapY: 0.367,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

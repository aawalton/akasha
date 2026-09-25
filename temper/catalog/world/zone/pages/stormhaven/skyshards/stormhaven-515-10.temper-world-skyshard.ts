import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stormhaven51510 = {
  id: "01a0d5dd-4639-7469-a054-1e23e4e7e552",
  type: "page-type/temper-world-skyshard",
  slug: "stormhaven-515-10",
  title: "Stormhaven skyshard 10 of achievement 515",
  esoAchievementId: 515,
  shardNumber: 10,
  worldZone: "temper-world-zone/stormhaven",
  mapPositions: [
    { mapFolder: "stormhaven", mapTile: "bearclawmine_base", mapX: 0.178, mapY: 0.479 },
    {
      mapFolder: "stormhaven",
      mapTile: "stormhaven_base",
      mapX: 0.786,
      mapY: 0.433,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

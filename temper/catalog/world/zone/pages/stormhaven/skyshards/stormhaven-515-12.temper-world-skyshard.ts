import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stormhaven51512 = {
  id: "01a0d5dd-4639-7ea7-825c-4079f16217c6",
  type: "page-type/temper-world-skyshard",
  slug: "stormhaven-515-12",
  title: "Stormhaven skyshard 12 of achievement 515",
  esoAchievementId: 515,
  shardNumber: 12,
  worldZone: "temper-world-zone/stormhaven",
  mapPositions: [
    { mapFolder: "stormhaven", mapTile: "koeglinmine_base", mapX: 0.4, mapY: 0.12 },
    {
      mapFolder: "stormhaven",
      mapTile: "stormhaven_base",
      mapX: 0.237,
      mapY: 0.494,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

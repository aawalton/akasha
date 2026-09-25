import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stormhaven51516 = {
  id: "01a0d5dd-463a-789e-bbac-d555cf8cd5e3",
  type: "page-type/temper-world-skyshard",
  slug: "stormhaven-515-16",
  title: "Stormhaven skyshard 16 of achievement 515",
  esoAchievementId: 515,
  shardNumber: 16,
  worldZone: "temper-world-zone/stormhaven",
  mapPositions: [
    { mapFolder: "stormhaven", mapTile: "bonesnapruins_base", mapX: 0.25, mapY: 0.64 },
    { mapFolder: "stormhaven", mapTile: "bonesnapruinssecret_base", mapX: 0.25, mapY: 0.73 },
    {
      mapFolder: "stormhaven",
      mapTile: "stormhaven_base",
      mapX: 0.317,
      mapY: 0.496,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard

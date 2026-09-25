import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const malabalTor68416 = {
  id: "01a0d5e0-f5f7-71f0-b520-bddd07e8e5f4",
  type: "page-type/temper-world-skyshard",
  slug: "malabal-tor-684-16",
  title: "Malabal Tor skyshard 16 of achievement 684",
  esoAchievementId: 684,
  shardNumber: 16,
  worldZone: "temper-world-zone/malabal-tor",
  mapPositions: [
    { mapFolder: "malabaltor", mapTile: "crimsoncove02_base", mapX: 0.8249, mapY: 0.4646 },
    {
      mapFolder: "malabaltor",
      mapTile: "malabaltor_base",
      mapX: 0.385,
      mapY: 0.406,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard

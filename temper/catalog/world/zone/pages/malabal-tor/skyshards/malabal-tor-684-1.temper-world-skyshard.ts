import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const malabalTor6841 = {
  id: "01a0d5e0-f5f6-78d1-a940-10212defd9b1",
  type: "page-type/temper-world-skyshard",
  slug: "malabal-tor-684-1",
  title: "Malabal Tor skyshard 1 of achievement 684",
  esoAchievementId: 684,
  shardNumber: 1,
  worldZone: "temper-world-zone/malabal-tor",
  mapPositions: [
    {
      mapFolder: "malabaltor",
      mapTile: "malabaltor_base",
      mapX: 0.187,
      mapY: 0.499,
      placeKinds: [1],
    },
    { mapFolder: "malabaltor", mapTile: "velynharbor_base", mapX: 0.79, mapY: 0.45 },
  ],
} as const satisfies TemperWorldSkyshard

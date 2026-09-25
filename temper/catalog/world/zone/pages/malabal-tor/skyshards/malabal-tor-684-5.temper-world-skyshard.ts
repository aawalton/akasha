import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const malabalTor6845 = {
  id: "01a0d5e0-f5f7-708a-b433-41927f27148c",
  type: "page-type/temper-world-skyshard",
  slug: "malabal-tor-684-5",
  title: "Malabal Tor skyshard 5 of achievement 684",
  esoAchievementId: 684,
  shardNumber: 5,
  worldZone: "temper-world-zone/malabal-tor",
  mapPositions: [
    {
      mapFolder: "malabaltor",
      mapTile: "malabaltor_base",
      mapX: 0.545,
      mapY: 0.444,
      placeKinds: [1],
    },
    { mapFolder: "malabaltor", mapTile: "vulkwasten_base", mapX: 0.462, mapY: 0.25 },
  ],
} as const satisfies TemperWorldSkyshard

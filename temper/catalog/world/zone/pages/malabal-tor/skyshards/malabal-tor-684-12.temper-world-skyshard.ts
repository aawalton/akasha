import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const malabalTor68412 = {
  id: "01a0d5e0-f5f7-775c-aa22-8f36e788d60e",
  type: "page-type/temper-world-skyshard",
  slug: "malabal-tor-684-12",
  title: "Malabal Tor skyshard 12 of achievement 684",
  esoAchievementId: 684,
  shardNumber: 12,
  worldZone: "temper-world-zone/malabal-tor",
  mapPositions: [
    { mapFolder: "malabaltor", mapTile: "hoarvorpit_base", mapX: 0.44, mapY: 0.128 },
    {
      mapFolder: "malabaltor",
      mapTile: "malabaltor_base",
      mapX: 0.473,
      mapY: 0.563,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

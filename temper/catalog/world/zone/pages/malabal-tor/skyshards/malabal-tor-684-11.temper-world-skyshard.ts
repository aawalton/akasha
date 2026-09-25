import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const malabalTor68411 = {
  id: "01a0d5e0-f5f6-7163-b36a-617990f7d0be",
  type: "page-type/temper-world-skyshard",
  slug: "malabal-tor-684-11",
  title: "Malabal Tor skyshard 11 of achievement 684",
  esoAchievementId: 684,
  shardNumber: 11,
  worldZone: "temper-world-zone/malabal-tor",
  mapPositions: [
    { mapFolder: "malabaltor", mapTile: "deadmansdrop_base", mapX: 0.191, mapY: 0.135 },
    {
      mapFolder: "malabaltor",
      mapTile: "malabaltor_base",
      mapX: 0.349,
      mapY: 0.412,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

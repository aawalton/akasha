import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const malabalTor68413 = {
  id: "01a0d5e0-f5f7-72d1-9189-39f93aba0eb2",
  type: "page-type/temper-world-skyshard",
  slug: "malabal-tor-684-13",
  title: "Malabal Tor skyshard 13 of achievement 684",
  esoAchievementId: 684,
  shardNumber: 13,
  worldZone: "temper-world-zone/malabal-tor",
  mapPositions: [
    {
      mapFolder: "malabaltor",
      mapTile: "malabaltor_base",
      mapX: 0.708,
      mapY: 0.492,
      placeKinds: [2],
    },
    { mapFolder: "malabaltor", mapTile: "rootsofsilvenar_base", mapX: 0.571, mapY: 0.403 },
  ],
} as const satisfies TemperWorldSkyshard

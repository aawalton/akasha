import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const malabalTor68414 = {
  id: "01a0d5e0-f5f7-7b6d-997a-49af1577eb8b",
  type: "page-type/temper-world-skyshard",
  slug: "malabal-tor-684-14",
  title: "Malabal Tor skyshard 14 of achievement 684",
  esoAchievementId: 684,
  shardNumber: 14,
  worldZone: "temper-world-zone/malabal-tor",
  mapPositions: [
    {
      mapFolder: "malabaltor",
      mapTile: "malabaltor_base",
      mapX: 0.623,
      mapY: 0.829,
      placeKinds: [2],
    },
    { mapFolder: "malabaltor", mapTile: "shaelruins_base", mapX: 0.312, mapY: 0.898 },
  ],
} as const satisfies TemperWorldSkyshard

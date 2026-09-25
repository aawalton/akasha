import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const malabalTor68415 = {
  id: "01a0d5e0-f5f7-79a5-88c3-65dd93637c53",
  type: "page-type/temper-world-skyshard",
  slug: "malabal-tor-684-15",
  title: "Malabal Tor skyshard 15 of achievement 684",
  esoAchievementId: 684,
  shardNumber: 15,
  worldZone: "temper-world-zone/malabal-tor",
  mapPositions: [
    {
      mapFolder: "malabaltor",
      mapTile: "malabaltor_base",
      mapX: 0.38,
      mapY: 0.623,
      placeKinds: [2],
    },
    { mapFolder: "malabaltor", mapTile: "tomboftheapostates_base", mapX: 0.541, mapY: 0.168 },
  ],
} as const satisfies TemperWorldSkyshard

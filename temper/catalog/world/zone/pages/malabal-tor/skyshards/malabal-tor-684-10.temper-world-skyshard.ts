import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const malabalTor68410 = {
  id: "01a0d5e0-f5f6-7294-9bde-a77bfea6953b",
  type: "page-type/temper-world-skyshard",
  slug: "malabal-tor-684-10",
  title: "Malabal Tor skyshard 10 of achievement 684",
  esoAchievementId: 684,
  shardNumber: 10,
  worldZone: "temper-world-zone/malabal-tor",
  mapPositions: [
    {
      mapFolder: "malabaltor",
      mapTile: "baandaritradingpost_base",
      mapX: 0.196,
      mapY: 0.259,
      placeKinds: [2],
    },
    { mapFolder: "malabaltor", mapTile: "blackvineruins_base", mapX: 0.379, mapY: 0.875 },
    {
      mapFolder: "malabaltor",
      mapTile: "malabaltor_base",
      mapX: 0.788,
      mapY: 0.298,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

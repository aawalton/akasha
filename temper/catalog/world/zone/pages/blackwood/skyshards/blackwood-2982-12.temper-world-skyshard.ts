import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const blackwood298212 = {
  id: "01a0d5e2-da2a-7dd0-87a3-60d64129d18e",
  type: "page-type/temper-world-skyshard",
  slug: "blackwood-2982-12",
  title: "Blackwood skyshard 12 of achievement 2982",
  esoAchievementId: 2982,
  shardNumber: 12,
  worldZone: "temper-world-zone/blackwood",
  mapPositions: [
    {
      mapFolder: "blackwood",
      mapTile: "blackwood_base",
      mapX: 0.4584,
      mapY: 0.3125,
      placeKinds: [3],
    },
    {
      mapFolder: "blackwood",
      mapTile: "zhmain_base",
      mapX: 0.7774193286,
      mapY: 0.6221995949,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard

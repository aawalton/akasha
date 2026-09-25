import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const blackwood298218 = {
  id: "01a0d5e2-da2a-7862-93da-e38f751ebf05",
  type: "page-type/temper-world-skyshard",
  slug: "blackwood-2982-18",
  title: "Blackwood skyshard 18 of achievement 2982",
  esoAchievementId: 2982,
  shardNumber: 18,
  worldZone: "temper-world-zone/blackwood",
  mapPositions: [
    {
      mapFolder: "blackwood",
      mapTile: "blackwood_base",
      mapX: 0.8397,
      mapY: 0.6944,
      placeKinds: [2],
    },
    {
      mapFolder: "blackwood",
      mapTile: "vunalk1_base",
      mapX: 0.8564519882,
      mapY: 0.21213454,
      placeKinds: [2],
    },
    {
      mapFolder: "blackwood",
      mapTile: "vunalk2_base",
      mapX: 0.8564519882,
      mapY: 0.21213454,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

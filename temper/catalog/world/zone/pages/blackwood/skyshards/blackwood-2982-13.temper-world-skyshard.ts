import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const blackwood298213 = {
  id: "01a0d5e2-da2a-7211-923b-4af8d09001b3",
  type: "page-type/temper-world-skyshard",
  slug: "blackwood-2982-13",
  title: "Blackwood skyshard 13 of achievement 2982",
  esoAchievementId: 2982,
  shardNumber: 13,
  worldZone: "temper-world-zone/blackwood",
  mapPositions: [
    {
      mapFolder: "blackwood",
      mapTile: "blackwood_base",
      mapX: 0.5481,
      mapY: 0.7722,
      placeKinds: [2],
    },
    {
      mapFolder: "blackwood",
      mapTile: "u30_xanmeeroverlook_ext_base",
      mapX: 0.6831104159,
      mapY: 0.514709711,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

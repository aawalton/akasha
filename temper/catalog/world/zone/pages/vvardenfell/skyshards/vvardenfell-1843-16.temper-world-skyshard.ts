import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const vvardenfell184316 = {
  id: "01a0d5e1-c15e-7513-8a56-5d8c7f413b2b",
  type: "page-type/temper-world-skyshard",
  slug: "vvardenfell-1843-16",
  title: "Vvardenfell skyshard 16 of achievement 1843",
  esoAchievementId: 1843,
  shardNumber: 16,
  worldZone: "temper-world-zone/vvardenfell",
  mapPositions: [
    {
      mapFolder: "vvardenfell",
      mapTile: "matusakin_base",
      mapX: 0.5316,
      mapY: 0.7329,
      placeKinds: [2],
    },
    {
      mapFolder: "vvardenfell",
      mapTile: "vvardenfell_base",
      mapX: 0.7981,
      mapY: 0.6899,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

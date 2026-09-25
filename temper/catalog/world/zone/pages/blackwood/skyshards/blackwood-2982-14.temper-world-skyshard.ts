import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const blackwood298214 = {
  id: "01a0d5e2-da2a-7ba2-9c50-2bab7d54f6ee",
  type: "page-type/temper-world-skyshard",
  slug: "blackwood-2982-14",
  title: "Blackwood skyshard 14 of achievement 2982",
  esoAchievementId: 2982,
  shardNumber: 14,
  worldZone: "temper-world-zone/blackwood",
  mapPositions: [
    {
      mapFolder: "blackwood",
      mapTile: "blackwood_base",
      mapX: 0.2071,
      mapY: 0.5011,
      placeKinds: [2],
    },
    {
      mapFolder: "blackwood",
      mapTile: "u30_undertowcavern_base",
      mapX: 0.5237,
      mapY: 0.4037,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

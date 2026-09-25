import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const blackwood298217 = {
  id: "01a0d5e2-da2a-7bf0-a2a2-2da3d636da00",
  type: "page-type/temper-world-skyshard",
  slug: "blackwood-2982-17",
  title: "Blackwood skyshard 17 of achievement 2982",
  esoAchievementId: 2982,
  shardNumber: 17,
  worldZone: "temper-world-zone/blackwood",
  mapPositions: [
    {
      mapFolder: "blackwood",
      mapTile: "blackwood_base",
      mapX: 0.6411,
      mapY: 0.1772,
      placeKinds: [2],
    },
    {
      mapFolder: "blackwood",
      mapTile: "u30_bloodruncave_base",
      mapX: 0.537,
      mapY: 0.2982,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

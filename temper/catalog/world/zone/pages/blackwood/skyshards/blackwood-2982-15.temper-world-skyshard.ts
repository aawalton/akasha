import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const blackwood298215 = {
  id: "01a0d5e2-da2a-731a-9195-c8a1ebe22b5d",
  type: "page-type/temper-world-skyshard",
  slug: "blackwood-2982-15",
  title: "Blackwood skyshard 15 of achievement 2982",
  esoAchievementId: 2982,
  shardNumber: 15,
  worldZone: "temper-world-zone/blackwood",
  mapPositions: [
    {
      mapFolder: "blackwood",
      mapTile: "blackwood_base",
      mapX: 0.7404,
      mapY: 0.5157,
      placeKinds: [2],
    },
    {
      mapFolder: "blackwood",
      mapTile: "vaultdelve_ext02_base",
      mapX: 0.87927109,
      mapY: 0.3477600514,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

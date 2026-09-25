import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const blackwood298211 = {
  id: "01a0d5e2-da2a-71fe-96a5-27278958fd1f",
  type: "page-type/temper-world-skyshard",
  slug: "blackwood-2982-11",
  title: "Blackwood skyshard 11 of achievement 2982",
  esoAchievementId: 2982,
  shardNumber: 11,
  worldZone: "temper-world-zone/blackwood",
  mapPositions: [
    {
      mapFolder: "blackwood",
      mapTile: "blackwood_base",
      mapX: 0.5772,
      mapY: 0.6437,
      placeKinds: [3],
    },
    {
      mapFolder: "blackwood",
      mapTile: "u30_silenthalls_ext02_base",
      mapX: 0.4526678025,
      mapY: 0.734939754,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard

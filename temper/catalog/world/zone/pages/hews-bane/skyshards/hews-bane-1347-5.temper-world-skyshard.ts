import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const hewsBane13475 = {
  id: "01a0d5e0-4ade-7fda-a4a1-9370bb266bcf",
  type: "page-type/temper-world-skyshard",
  slug: "hews-bane-1347-5",
  title: "Hew's Bane skyshard 5 of achievement 1347",
  esoAchievementId: 1347,
  shardNumber: 5,
  worldZone: "temper-world-zone/hews-bane",
  mapPositions: [
    {
      mapFolder: "thievesguild",
      mapTile: "bahrahasgloom_base",
      mapX: 0.2563,
      mapY: 0.5249,
      placeKinds: [2],
    },
    {
      mapFolder: "thievesguild",
      mapTile: "bahrahasgloom_secret1_base",
      mapX: 0.2563,
      mapY: 0.5249,
      placeKinds: [2],
    },
    {
      mapFolder: "thievesguild",
      mapTile: "bahrahasgloom_secret2_base",
      mapX: 0.2563,
      mapY: 0.5249,
      placeKinds: [2],
    },
    {
      mapFolder: "thievesguild",
      mapTile: "bahrahasgloom_secret3_base",
      mapX: 0.2563,
      mapY: 0.5249,
      placeKinds: [2],
    },
    {
      mapFolder: "thievesguild",
      mapTile: "hewsbane_base",
      mapX: 0.4716,
      mapY: 0.4243,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const hewsBane13471 = {
  id: "01a0d5e0-4ade-784b-8000-261d4e42f529",
  type: "page-type/temper-world-skyshard",
  slug: "hews-bane-1347-1",
  title: "Hew's Bane skyshard 1 of achievement 1347",
  esoAchievementId: 1347,
  shardNumber: 1,
  worldZone: "temper-world-zone/hews-bane",
  mapPositions: [
    {
      mapFolder: "thievesguild",
      mapTile: "abahslanding_base",
      mapX: 0.5524,
      mapY: 0.4211,
      placeKinds: [1],
    },
    {
      mapFolder: "thievesguild",
      mapTile: "hewsbane_base",
      mapX: 0.6813,
      mapY: 0.4093,
      placeKinds: [1],
    },
  ],
} as const satisfies TemperWorldSkyshard

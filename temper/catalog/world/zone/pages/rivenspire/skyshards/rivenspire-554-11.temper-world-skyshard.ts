import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const rivenspire55411 = {
  id: "01a0d5df-d861-7295-a620-0a7031b950be",
  type: "page-type/temper-world-skyshard",
  slug: "rivenspire-554-11",
  title: "Rivenspire skyshard 11 of achievement 554",
  esoAchievementId: 554,
  shardNumber: 11,
  worldZone: "temper-world-zone/rivenspire",
  mapPositions: [
    { mapFolder: "rivenspire", mapTile: "erokii_base", mapX: 0.526, mapY: 0.879 },
    {
      mapFolder: "rivenspire",
      mapTile: "rivenspire_base",
      mapX: 0.4,
      mapY: 0.311,
      placeKinds: [2],
    },
  ],
  createdAt: "2026-09-25T00:03:32.065Z",
  updatedAt: "2026-09-25T00:03:34.000Z",
} as const satisfies TemperWorldSkyshard

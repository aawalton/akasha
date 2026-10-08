import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const rivenspire5541 = {
  id: "01a0d5df-d860-760d-ac01-2a817aed156b",
  type: "page-type/temper-world-skyshard",
  slug: "rivenspire-554-1",
  title: "Rivenspire skyshard 1 of achievement 554",
  esoAchievementId: 554,
  shardNumber: 1,
  worldZone: "temper-world-zone/rivenspire",
  mapPositions: [
    {
      mapFolder: "rivenspire",
      mapTile: "rivenspire_base",
      mapX: 0.447,
      mapY: 0.602,
      placeKinds: [1],
    },
    { mapFolder: "rivenspire", mapTile: "shornhelm_base", mapX: 0.614, mapY: 0.804 },
  ],
  createdAt: "2026-09-25T00:03:32.064Z",
  updatedAt: "2026-09-25T00:03:34.000Z",
} as const satisfies TemperWorldSkyshard

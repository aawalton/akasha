import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const rivenspire55414 = {
  id: "01a0d5df-d861-7905-8919-4f5427e5b99a",
  type: "page-type/temper-world-skyshard",
  slug: "rivenspire-554-14",
  title: "Rivenspire skyshard 14 of achievement 554",
  esoAchievementId: 554,
  shardNumber: 14,
  worldZone: "temper-world-zone/rivenspire",
  mapPositions: [
    { mapFolder: "rivenspire", mapTile: "orcsfingerruins_base", mapX: 0.179, mapY: 0.348 },
    {
      mapFolder: "rivenspire",
      mapTile: "rivenspire_base",
      mapX: 0.809,
      mapY: 0.351,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

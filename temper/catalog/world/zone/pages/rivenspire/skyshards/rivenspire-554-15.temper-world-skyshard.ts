import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const rivenspire55415 = {
  id: "01a0d5df-d861-7fb1-a60e-4a7133d88f01",
  type: "page-type/temper-world-skyshard",
  slug: "rivenspire-554-15",
  title: "Rivenspire skyshard 15 of achievement 554",
  esoAchievementId: 554,
  shardNumber: 15,
  worldZone: "temper-world-zone/rivenspire",
  mapPositions: [
    {
      mapFolder: "rivenspire",
      mapTile: "rivenspire_base",
      mapX: 0.67,
      mapY: 0.604,
      placeKinds: [2],
    },
    { mapFolder: "rivenspire", mapTile: "tribulationcrypt_base", mapX: 0.3343, mapY: 0.7741 },
  ],
} as const satisfies TemperWorldSkyshard

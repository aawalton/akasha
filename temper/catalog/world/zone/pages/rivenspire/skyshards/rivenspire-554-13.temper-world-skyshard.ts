import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const rivenspire55413 = {
  id: "01a0d5df-d861-7c14-89ea-eecf34f69c0d",
  type: "page-type/temper-world-skyshard",
  slug: "rivenspire-554-13",
  title: "Rivenspire skyshard 13 of achievement 554",
  esoAchievementId: 554,
  shardNumber: 13,
  worldZone: "temper-world-zone/rivenspire",
  mapPositions: [
    { mapFolder: "rivenspire", mapTile: "hildunessecretrefuge_base", mapX: 0.578, mapY: 0.502 },
    {
      mapFolder: "rivenspire",
      mapTile: "rivenspire_base",
      mapX: 0.699,
      mapY: 0.184,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

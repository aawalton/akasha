import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const rivenspire55416 = {
  id: "01a0d5df-d861-7192-9ada-3cc39d3c1ab7",
  type: "page-type/temper-world-skyshard",
  slug: "rivenspire-554-16",
  title: "Rivenspire skyshard 16 of achievement 554",
  esoAchievementId: 554,
  shardNumber: 16,
  worldZone: "temper-world-zone/rivenspire",
  mapPositions: [
    { mapFolder: "rivenspire", mapTile: "obsidianscar_base", mapX: 0.846, mapY: 0.595 },
    {
      mapFolder: "rivenspire",
      mapTile: "rivenspire_base",
      mapX: 0.556,
      mapY: 0.456,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard

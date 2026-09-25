import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const rivenspire55412 = {
  id: "01a0d5df-d861-7dd6-8df7-378235d35d57",
  type: "page-type/temper-world-skyshard",
  slug: "rivenspire-554-12",
  title: "Rivenspire skyshard 12 of achievement 554",
  esoAchievementId: 554,
  shardNumber: 12,
  worldZone: "temper-world-zone/rivenspire",
  mapPositions: [
    { mapFolder: "rivenspire", mapTile: "flyleafcatacombs_base", mapX: 0.611, mapY: 0.354 },
    {
      mapFolder: "rivenspire",
      mapTile: "rivenspire_base",
      mapX: 0.145,
      mapY: 0.592,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

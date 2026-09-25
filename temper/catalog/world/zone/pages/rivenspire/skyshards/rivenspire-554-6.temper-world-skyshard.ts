import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const rivenspire5546 = {
  id: "01a0d5df-d862-77e6-a581-9b3d9de08577",
  type: "page-type/temper-world-skyshard",
  slug: "rivenspire-554-6",
  title: "Rivenspire skyshard 6 of achievement 554",
  esoAchievementId: 554,
  shardNumber: 6,
  worldZone: "temper-world-zone/rivenspire",
  mapPositions: [
    { mapFolder: "rivenspire", mapTile: "northpoint_base", mapX: 0.731, mapY: 0.201 },
    {
      mapFolder: "rivenspire",
      mapTile: "rivenspire_base",
      mapX: 0.831,
      mapY: 0.166,
      placeKinds: [1],
    },
  ],
} as const satisfies TemperWorldSkyshard

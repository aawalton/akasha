import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const shadowfen6871 = {
  id: "01a0d5dc-5a9b-7d45-aa45-f13747256c00",
  type: "page-type/temper-world-skyshard",
  slug: "shadowfen-687-1",
  title: "Shadowfen skyshard 1 of achievement 687",
  esoAchievementId: 687,
  shardNumber: 1,
  worldZone: "temper-world-zone/shadowfen",
  mapPositions: [
    {
      mapFolder: "shadowfen",
      mapTile: "shadowfen_base",
      mapX: 0.445,
      mapY: 0.2722,
      placeKinds: [1],
    },
    { mapFolder: "shadowfen", mapTile: "stormhold_base", mapX: 0.4468, mapY: 0.4943 },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const shadowfen68715 = {
  id: "01a0d5dc-5a9c-7c5b-8213-a9dc7a8b9561",
  type: "page-type/temper-world-skyshard",
  slug: "shadowfen-687-15",
  title: "Shadowfen skyshard 15 of achievement 687",
  esoAchievementId: 687,
  shardNumber: 15,
  worldZone: "temper-world-zone/shadowfen",
  mapPositions: [
    {
      mapFolder: "shadowfen",
      mapTile: "shadowfen_base",
      mapX: 0.2899,
      mapY: 0.1693,
      placeKinds: [2],
    },
    { mapFolder: "shadowfen", mapTile: "shrineofblackworm_base", mapX: 0.8597, mapY: 0.6901 },
  ],
} as const satisfies TemperWorldSkyshard

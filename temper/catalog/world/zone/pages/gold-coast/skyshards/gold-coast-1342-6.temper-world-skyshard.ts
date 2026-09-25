import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const goldCoast13426 = {
  id: "01a0d5df-9143-762a-867b-5fb191366f28",
  type: "page-type/temper-world-skyshard",
  slug: "gold-coast-1342-6",
  title: "Gold Coast skyshard 6 of achievement 1342",
  esoAchievementId: 1342,
  shardNumber: 6,
  worldZone: "temper-world-zone/gold-coast",
  mapPositions: [
    {
      mapFolder: "darkbrotherhood",
      mapTile: "garlasagea_base",
      mapX: 0.7741,
      mapY: 0.6648,
      placeKinds: [2],
    },
    {
      mapFolder: "darkbrotherhood",
      mapTile: "goldcoast_base",
      mapX: 0.5793,
      mapY: 0.4534,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

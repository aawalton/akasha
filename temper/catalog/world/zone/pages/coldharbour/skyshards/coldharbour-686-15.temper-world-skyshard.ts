import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const coldharbour68615 = {
  id: "01a0d5db-1fa1-756b-9fa2-12327ef3c888",
  type: "page-type/temper-world-skyshard",
  slug: "coldharbour-686-15",
  title: "Coldharbour skyshard 15 of achievement 686",
  esoAchievementId: 686,
  shardNumber: 15,
  worldZone: "temper-world-zone/coldharbour",
  mapPositions: [
    {
      mapFolder: "coldharbor",
      mapTile: "coldharbour_base",
      mapX: 0.6604,
      mapY: 0.3758,
      placeKinds: [2],
    },
    { mapFolder: "coldharbor", mapTile: "wailingmaw_base", mapX: 0.7675, mapY: 0.7018 },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const coldharbour68612 = {
  id: "01a0d5db-1fa1-7bfb-ad3f-0c845105c6ba",
  type: "page-type/temper-world-skyshard",
  slug: "coldharbour-686-12",
  title: "Coldharbour skyshard 12 of achievement 686",
  esoAchievementId: 686,
  shardNumber: 12,
  worldZone: "temper-world-zone/coldharbour",
  mapPositions: [
    {
      mapFolder: "coldharbor",
      mapTile: "coldharbour_base",
      mapX: 0.4223,
      mapY: 0.7878,
      placeKinds: [2],
    },
    { mapFolder: "coldharbor", mapTile: "depravedgrotto_base", mapX: 0.282, mapY: 0.2672 },
  ],
} as const satisfies TemperWorldSkyshard

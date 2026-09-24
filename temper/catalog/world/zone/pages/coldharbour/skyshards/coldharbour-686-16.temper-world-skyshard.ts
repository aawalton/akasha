import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const coldharbour68616 = {
  id: "01a0d5db-1fa1-711f-bc0e-4cee7a734ea7",
  type: "page-type/temper-world-skyshard",
  slug: "coldharbour-686-16",
  title: "Coldharbour skyshard 16 of achievement 686",
  esoAchievementId: 686,
  shardNumber: 16,
  worldZone: "temper-world-zone/coldharbour",
  mapPositions: [
    {
      mapFolder: "coldharbor",
      mapTile: "coldharbour_base",
      mapX: 0.7116,
      mapY: 0.6352,
      placeKinds: [3],
    },
    { mapFolder: "coldharbor", mapTile: "villageofthelost_base", mapX: 0.3271, mapY: 0.5004 },
  ],
} as const satisfies TemperWorldSkyshard

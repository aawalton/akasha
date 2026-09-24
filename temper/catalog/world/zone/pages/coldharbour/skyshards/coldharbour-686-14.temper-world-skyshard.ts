import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const coldharbour68614 = {
  id: "01a0d5db-1fa1-7524-b1b8-268a6448f540",
  type: "page-type/temper-world-skyshard",
  slug: "coldharbour-686-14",
  title: "Coldharbour skyshard 14 of achievement 686",
  esoAchievementId: 686,
  shardNumber: 14,
  worldZone: "temper-world-zone/coldharbour",
  mapPositions: [
    { mapFolder: "coldharbor", mapTile: "caveoftrophies_base", mapX: 0.5614, mapY: 0.7433 },
    {
      mapFolder: "coldharbor",
      mapTile: "coldharbour_base",
      mapX: 0.6704,
      mapY: 0.5746,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const coldharbour68613 = {
  id: "01a0d5db-1fa1-751c-abd6-fd6dcf3978a5",
  type: "page-type/temper-world-skyshard",
  slug: "coldharbour-686-13",
  title: "Coldharbour skyshard 13 of achievement 686",
  esoAchievementId: 686,
  shardNumber: 13,
  worldZone: "temper-world-zone/coldharbour",
  mapPositions: [
    {
      mapFolder: "coldharbor",
      mapTile: "coldharbour_base",
      mapX: 0.4541,
      mapY: 0.5096,
      placeKinds: [2],
    },
    { mapFolder: "coldharbor", mapTile: "malsorrastomb_base", mapX: 0.3663, mapY: 0.4108 },
  ],
} as const satisfies TemperWorldSkyshard

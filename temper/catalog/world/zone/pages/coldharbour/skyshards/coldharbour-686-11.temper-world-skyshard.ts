import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const coldharbour68611 = {
  id: "01a0d5db-1fa1-787f-8474-72fdbd401051",
  type: "page-type/temper-world-skyshard",
  slug: "coldharbour-686-11",
  title: "Coldharbour skyshard 11 of achievement 686",
  esoAchievementId: 686,
  shardNumber: 11,
  worldZone: "temper-world-zone/coldharbour",
  mapPositions: [
    {
      mapFolder: "coldharbor",
      mapTile: "coldharbour_base",
      mapX: 0.6838,
      mapY: 0.7244,
      placeKinds: [2],
    },
    { mapFolder: "coldharbor", mapTile: "vaultofhamanforgefire_base", mapX: 0.5268, mapY: 0.1484 },
  ],
} as const satisfies TemperWorldSkyshard

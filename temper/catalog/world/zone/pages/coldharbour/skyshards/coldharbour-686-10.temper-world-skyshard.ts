import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const coldharbour68610 = {
  id: "01a0d5db-1fa1-7aee-bf39-16e6eb7b0b7f",
  type: "page-type/temper-world-skyshard",
  slug: "coldharbour-686-10",
  title: "Coldharbour skyshard 10 of achievement 686",
  esoAchievementId: 686,
  shardNumber: 10,
  worldZone: "temper-world-zone/coldharbour",
  mapPositions: [
    { mapFolder: "coldharbor", mapTile: "aba-loria_base", mapX: 0.2696, mapY: 0.4304 },
    {
      mapFolder: "coldharbor",
      mapTile: "coldharbour_base",
      mapX: 0.4127,
      mapY: 0.5344,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

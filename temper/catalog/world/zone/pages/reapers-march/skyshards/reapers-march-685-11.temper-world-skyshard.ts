import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const reapersMarch68511 = {
  id: "01a0d5d9-d4aa-7d27-989b-a103600e8a4e",
  type: "page-type/temper-world-skyshard",
  slug: "reapers-march-685-11",
  title: "Reaper's March skyshard 11 of achievement 685",
  esoAchievementId: 685,
  shardNumber: 11,
  worldZone: "temper-world-zone/reapers-march",
  mapPositions: [
    {
      mapFolder: "reapersmarch",
      mapTile: "reapersmarch_base",
      mapX: 0.361,
      mapY: 0.409,
      placeKinds: [2],
    },
    { mapFolder: "reapersmarch", mapTile: "thibautscairn_base", mapX: 0.778, mapY: 0.666 },
  ],
} as const satisfies TemperWorldSkyshard

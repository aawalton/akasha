import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const reapersMarch68516 = {
  id: "01a0d5d9-d4ab-7e58-9770-fb81d85e61ce",
  type: "page-type/temper-world-skyshard",
  slug: "reapers-march-685-16",
  title: "Reaper's March skyshard 16 of achievement 685",
  esoAchievementId: 685,
  shardNumber: 16,
  worldZone: "temper-world-zone/reapers-march",
  mapPositions: [
    {
      mapFolder: "reapersmarch",
      mapTile: "reapersmarch_base",
      mapX: 0.282,
      mapY: 0.163,
      placeKinds: [3],
    },
    { mapFolder: "reapersmarch", mapTile: "thevilemansefirstfloor_base", mapX: 0.4, mapY: 0.42 },
    { mapFolder: "reapersmarch", mapTile: "thevilemansesecondfloor_base", mapX: 0.65, mapY: 0.33 },
  ],
} as const satisfies TemperWorldSkyshard

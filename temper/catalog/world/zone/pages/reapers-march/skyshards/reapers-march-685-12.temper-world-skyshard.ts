import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const reapersMarch68512 = {
  id: "01a0d5d9-d4aa-7de8-942f-6eee25fd5251",
  type: "page-type/temper-world-skyshard",
  slug: "reapers-march-685-12",
  title: "Reaper's March skyshard 12 of achievement 685",
  esoAchievementId: 685,
  shardNumber: 12,
  worldZone: "temper-world-zone/reapers-march",
  mapPositions: [
    {
      mapFolder: "reapersmarch",
      mapTile: "reapersmarch_base",
      mapX: 0.505,
      mapY: 0.755,
      placeKinds: [2],
    },
    { mapFolder: "reapersmarch", mapTile: "weepingwindcave_base", mapX: 0.376, mapY: 0.8308 },
  ],
} as const satisfies TemperWorldSkyshard

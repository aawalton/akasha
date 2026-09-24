import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const reapersMarch6857 = {
  id: "01a0d5d9-d4ab-783f-940c-1f31af23493a",
  type: "page-type/temper-world-skyshard",
  slug: "reapers-march-685-7",
  title: "Reaper's March skyshard 7 of achievement 685",
  esoAchievementId: 685,
  shardNumber: 7,
  worldZone: "temper-world-zone/reapers-march",
  mapPositions: [
    { mapFolder: "reapersmarch", mapTile: "dune_base", mapX: 0.587, mapY: 0.3386 },
    {
      mapFolder: "reapersmarch",
      mapTile: "reapersmarch_base",
      mapX: 0.78,
      mapY: 0.3495,
      placeKinds: [1],
    },
  ],
} as const satisfies TemperWorldSkyshard

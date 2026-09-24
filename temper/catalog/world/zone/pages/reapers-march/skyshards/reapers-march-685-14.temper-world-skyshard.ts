import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const reapersMarch68514 = {
  id: "01a0d5d9-d4aa-76b0-88ca-afaac360ac4b",
  type: "page-type/temper-world-skyshard",
  slug: "reapers-march-685-14",
  title: "Reaper's March skyshard 14 of achievement 685",
  esoAchievementId: 685,
  shardNumber: 14,
  worldZone: "temper-world-zone/reapers-march",
  mapPositions: [
    { mapFolder: "reapersmarch", mapTile: "fardirsfolly_base", mapX: 0.332, mapY: 0.402 },
    {
      mapFolder: "reapersmarch",
      mapTile: "reapersmarch_base",
      mapX: 0.753,
      mapY: 0.128,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

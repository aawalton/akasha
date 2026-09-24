import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const reapersMarch68513 = {
  id: "01a0d5d9-d4aa-78eb-93c3-84308a708d76",
  type: "page-type/temper-world-skyshard",
  slug: "reapers-march-685-13",
  title: "Reaper's March skyshard 13 of achievement 685",
  esoAchievementId: 685,
  shardNumber: 13,
  worldZone: "temper-world-zone/reapers-march",
  mapPositions: [
    { mapFolder: "reapersmarch", mapTile: "clawsstrike_base", mapX: 0.116, mapY: 0.395 },
    {
      mapFolder: "reapersmarch",
      mapTile: "reapersmarch_base",
      mapX: 0.239,
      mapY: 0.607,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

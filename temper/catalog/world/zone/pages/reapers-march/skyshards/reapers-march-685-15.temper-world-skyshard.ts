import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const reapersMarch68515 = {
  id: "01a0d5d9-d4ab-749c-909c-0ed33dc0b483",
  type: "page-type/temper-world-skyshard",
  slug: "reapers-march-685-15",
  title: "Reaper's March skyshard 15 of achievement 685",
  esoAchievementId: 685,
  shardNumber: 15,
  worldZone: "temper-world-zone/reapers-march",
  mapPositions: [
    { mapFolder: "reapersmarch", mapTile: "jodeslight_base", mapX: 0.1511, mapY: 0.2623 },
    {
      mapFolder: "reapersmarch",
      mapTile: "reapersmarch_base",
      mapX: 0.633,
      mapY: 0.395,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

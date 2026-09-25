import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const highIsle327013 = {
  id: "01a0d5de-f9bf-7993-871f-87bd17c30a62",
  type: "page-type/temper-world-skyshard",
  slug: "high-isle-3270-13",
  title: "High Isle skyshard 13 of achievement 3270",
  esoAchievementId: 3270,
  shardNumber: 13,
  worldZone: "temper-world-zone/high-isle",
  mapPositions: [
    {
      mapFolder: "systres",
      mapTile: "u34_breakwatercave_base",
      mapX: 0.5170603394,
      mapY: 0.1951006054,
      placeKinds: [2],
    },
    {
      mapFolder: "systres",
      mapTile: "u34_systreszone_base",
      mapX: 0.3301258087,
      mapY: 0.9128304123,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

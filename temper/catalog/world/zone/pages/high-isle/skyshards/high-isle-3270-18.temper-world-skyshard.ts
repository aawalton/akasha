import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const highIsle327018 = {
  id: "01a0d5de-f9bf-7c8e-b8f2-11c38a6b5e6b",
  type: "page-type/temper-world-skyshard",
  slug: "high-isle-3270-18",
  title: "High Isle skyshard 18 of achievement 3270",
  esoAchievementId: 3270,
  shardNumber: 18,
  worldZone: "temper-world-zone/high-isle",
  mapPositions: [
    {
      mapFolder: "systres",
      mapTile: "u34_systreszone_base",
      mapX: 0.5994069576,
      mapY: 0.3531643152,
      placeKinds: [2],
    },
    {
      mapFolder: "systres",
      mapTile: "u34_whalefall_cay_base",
      mapX: 0.472682625,
      mapY: 0.5890116691,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

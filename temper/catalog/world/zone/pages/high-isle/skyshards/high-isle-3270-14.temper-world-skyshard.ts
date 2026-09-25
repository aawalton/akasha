import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const highIsle327014 = {
  id: "01a0d5de-f9bf-7136-9819-080e2c22c8f4",
  type: "page-type/temper-world-skyshard",
  slug: "high-isle-3270-14",
  title: "High Isle skyshard 14 of achievement 3270",
  esoAchievementId: 3270,
  shardNumber: 14,
  worldZone: "temper-world-zone/high-isle",
  mapPositions: [
    {
      mapFolder: "systres",
      mapTile: "u34_hauntedsepulcherext_base",
      mapX: 0.4835341274,
      mapY: 0.9269076585,
      placeKinds: [2],
    },
    {
      mapFolder: "systres",
      mapTile: "u34_systreszone_base",
      mapX: 0.2124494165,
      mapY: 0.4482330381,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

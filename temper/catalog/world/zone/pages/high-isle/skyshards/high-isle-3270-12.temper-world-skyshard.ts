import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const highIsle327012 = {
  id: "01a0d5de-f9bf-7962-b54d-9e58209f66a3",
  type: "page-type/temper-world-skyshard",
  slug: "high-isle-3270-12",
  title: "High Isle skyshard 12 of achievement 3270",
  esoAchievementId: 3270,
  shardNumber: 12,
  worldZone: "temper-world-zone/high-isle",
  mapPositions: [
    {
      mapFolder: "systres",
      mapTile: "u34_crimsoncoin_ext_base",
      mapX: 0.7741302847,
      mapY: 0.5128171443,
      placeKinds: [3],
    },
    {
      mapFolder: "systres",
      mapTile: "u34_systreszone_base",
      mapX: 0.6196997761,
      mapY: 0.6886463165,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard

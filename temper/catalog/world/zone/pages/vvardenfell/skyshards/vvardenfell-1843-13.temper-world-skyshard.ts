import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const vvardenfell184313 = {
  id: "01a0d5e1-c15e-73af-a80e-38098504c897",
  type: "page-type/temper-world-skyshard",
  slug: "vvardenfell-1843-13",
  title: "Vvardenfell skyshard 13 of achievement 1843",
  esoAchievementId: 1843,
  shardNumber: 13,
  worldZone: "temper-world-zone/vvardenfell",
  mapPositions: [
    {
      mapFolder: "vvardenfell",
      mapTile: "khartagpoint_base",
      mapX: 0.6086,
      mapY: 0.4617,
      placeKinds: [2],
    },
    {
      mapFolder: "vvardenfell",
      mapTile: "vvardenfell_base",
      mapX: 0.2455,
      mapY: 0.4994,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

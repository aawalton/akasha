import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const vvardenfell184314 = {
  id: "01a0d5e1-c15e-79f5-9ef2-86e73a5072c5",
  type: "page-type/temper-world-skyshard",
  slug: "vvardenfell-1843-14",
  title: "Vvardenfell skyshard 14 of achievement 1843",
  esoAchievementId: 1843,
  shardNumber: 14,
  worldZone: "temper-world-zone/vvardenfell",
  mapPositions: [
    {
      mapFolder: "vvardenfell",
      mapTile: "ashalmawia02_base",
      mapX: 0.3366,
      mapY: 0.9318,
      placeKinds: [2],
    },
    {
      mapFolder: "vvardenfell",
      mapTile: "ashalmawia03_base",
      mapX: 0.3366,
      mapY: 0.9318,
      placeKinds: [2],
    },
    {
      mapFolder: "vvardenfell",
      mapTile: "vvardenfell_base",
      mapX: 0.2322,
      mapY: 0.2715,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

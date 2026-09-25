import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const vvardenfell184315 = {
  id: "01a0d5e1-c15e-736c-896d-629af5c1fc93",
  type: "page-type/temper-world-skyshard",
  slug: "vvardenfell-1843-15",
  title: "Vvardenfell skyshard 15 of achievement 1843",
  esoAchievementId: 1843,
  shardNumber: 15,
  worldZone: "temper-world-zone/vvardenfell",
  mapPositions: [
    {
      mapFolder: "vvardenfell",
      mapTile: "vvardenfell_base",
      mapX: 0.3585,
      mapY: 0.7512,
      placeKinds: [2],
    },
    {
      mapFolder: "vvardenfell",
      mapTile: "zainsipilu_base",
      mapX: 0.7783,
      mapY: 0.2551,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

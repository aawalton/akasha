import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const vvardenfell184317 = {
  id: "01a0d5e1-c15e-73f3-8836-e703b2b90574",
  type: "page-type/temper-world-skyshard",
  slug: "vvardenfell-1843-17",
  title: "Vvardenfell skyshard 17 of achievement 1843",
  esoAchievementId: 1843,
  shardNumber: 17,
  worldZone: "temper-world-zone/vvardenfell",
  mapPositions: [
    {
      mapFolder: "vvardenfell",
      mapTile: "pulklower_base",
      mapX: 0.4776,
      mapY: 0.3667,
      placeKinds: [2],
    },
    {
      mapFolder: "vvardenfell",
      mapTile: "pulkupper_base",
      mapX: 0.4776,
      mapY: 0.3667,
      placeKinds: [2],
    },
    {
      mapFolder: "vvardenfell",
      mapTile: "vvardenfell_base",
      mapX: 0.6679,
      mapY: 0.4229,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard

import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const vvardenfell18432 = {
  id: "01a0d5e1-c15e-7231-9240-6b72ef3e668f",
  type: "page-type/temper-world-skyshard",
  slug: "vvardenfell-1843-2",
  title: "Vvardenfell skyshard 2 of achievement 1843",
  esoAchievementId: 1843,
  shardNumber: 2,
  worldZone: "temper-world-zone/vvardenfell",
  mapPositions: [
    { mapFolder: "vvardenfell", mapTile: "vvardenfell_base", mapX: 0.819, mapY: 0.4051 },
  ],
} as const satisfies TemperWorldSkyshard

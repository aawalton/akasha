import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const vvardenfell18437 = {
  id: "01a0d5e1-c15e-7862-b9f2-554260d6046b",
  type: "page-type/temper-world-skyshard",
  slug: "vvardenfell-1843-7",
  title: "Vvardenfell skyshard 7 of achievement 1843",
  esoAchievementId: 1843,
  shardNumber: 7,
  worldZone: "temper-world-zone/vvardenfell",
  mapPositions: [
    { mapFolder: "vvardenfell", mapTile: "vvardenfell_base", mapX: 0.4928, mapY: 0.7084 },
  ],
} as const satisfies TemperWorldSkyshard

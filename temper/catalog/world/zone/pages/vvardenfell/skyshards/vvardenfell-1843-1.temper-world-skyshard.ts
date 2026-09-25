import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const vvardenfell18431 = {
  id: "01a0d5e1-c15c-7614-b58d-b4a364f6bbec",
  type: "page-type/temper-world-skyshard",
  slug: "vvardenfell-1843-1",
  title: "Vvardenfell skyshard 1 of achievement 1843",
  esoAchievementId: 1843,
  shardNumber: 1,
  worldZone: "temper-world-zone/vvardenfell",
  mapPositions: [
    { mapFolder: "vvardenfell", mapTile: "vvardenfell_base", mapX: 0.7606, mapY: 0.6868 },
  ],
} as const satisfies TemperWorldSkyshard

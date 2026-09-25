import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const vvardenfell18433 = {
  id: "01a0d5e1-c15e-7be3-9ad3-a54b6f612ac7",
  type: "page-type/temper-world-skyshard",
  slug: "vvardenfell-1843-3",
  title: "Vvardenfell skyshard 3 of achievement 1843",
  esoAchievementId: 1843,
  shardNumber: 3,
  worldZone: "temper-world-zone/vvardenfell",
  mapPositions: [
    { mapFolder: "vvardenfell", mapTile: "vvardenfell_base", mapX: 0.6524, mapY: 0.5556 },
  ],
} as const satisfies TemperWorldSkyshard

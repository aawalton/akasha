import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const vvardenfell18435 = {
  id: "01a0d5e1-c15e-711b-aca6-c24b812b40e1",
  type: "page-type/temper-world-skyshard",
  slug: "vvardenfell-1843-5",
  title: "Vvardenfell skyshard 5 of achievement 1843",
  esoAchievementId: 1843,
  shardNumber: 5,
  worldZone: "temper-world-zone/vvardenfell",
  mapPositions: [
    { mapFolder: "vvardenfell", mapTile: "vvardenfell_base", mapX: 0.769, mapY: 0.8349 },
  ],
} as const satisfies TemperWorldSkyshard

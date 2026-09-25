import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const vvardenfell18434 = {
  id: "01a0d5e1-c15e-7024-ac8b-0679acc39111",
  type: "page-type/temper-world-skyshard",
  slug: "vvardenfell-1843-4",
  title: "Vvardenfell skyshard 4 of achievement 1843",
  esoAchievementId: 1843,
  shardNumber: 4,
  worldZone: "temper-world-zone/vvardenfell",
  mapPositions: [
    { mapFolder: "vvardenfell", mapTile: "vvardenfell_base", mapX: 0.7793, mapY: 0.3663 },
  ],
} as const satisfies TemperWorldSkyshard

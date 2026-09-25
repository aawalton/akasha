import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const deshaan54712 = {
  id: "01a0d5de-8464-7f27-b8d4-b297527cdd4d",
  type: "page-type/temper-world-skyshard",
  slug: "deshaan-547-12",
  title: "Deshaan skyshard 12 of achievement 547",
  esoAchievementId: 547,
  shardNumber: 12,
  worldZone: "temper-world-zone/deshaan",
  mapPositions: [
    { mapFolder: "deshaan", mapTile: "deshaan_base", mapX: 0.2372, mapY: 0.4607, placeKinds: [2] },
    { mapFolder: "deshaan", mapTile: "kwamacolony_base", mapX: 0.5273, mapY: 0.7025 },
  ],
} as const satisfies TemperWorldSkyshard

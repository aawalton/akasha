import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const deshaan54710 = {
  id: "01a0d5de-8464-762e-b591-4782a368d2d0",
  type: "page-type/temper-world-skyshard",
  slug: "deshaan-547-10",
  title: "Deshaan skyshard 10 of achievement 547",
  esoAchievementId: 547,
  shardNumber: 10,
  worldZone: "temper-world-zone/deshaan",
  mapPositions: [
    { mapFolder: "deshaan", mapTile: "deshaan_base", mapX: 0.2012, mapY: 0.4485, placeKinds: [3] },
    { mapFolder: "deshaan", mapTile: "forgottencrypts_base", mapX: 0.5902, mapY: 0.3052 },
  ],
} as const satisfies TemperWorldSkyshard

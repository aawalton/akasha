import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const deshaan5474 = {
  id: "01a0d5de-8464-7696-b7c4-23f174d0ad83",
  type: "page-type/temper-world-skyshard",
  slug: "deshaan-547-4",
  title: "Deshaan skyshard 4 of achievement 547",
  esoAchievementId: 547,
  shardNumber: 4,
  worldZone: "temper-world-zone/deshaan",
  mapPositions: [
    { mapFolder: "deshaan", mapTile: "deshaan_base", mapX: 0.4181, mapY: 0.4808, placeKinds: [1] },
    { mapFolder: "deshaan", mapTile: "mournhold_base", mapX: 0.377, mapY: 0.3403 },
  ],
} as const satisfies TemperWorldSkyshard
